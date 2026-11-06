import numpy as np
from fastapi import HTTPException
from .schemas import DiamondInput, PredictionResponse
from .model_loader import model_manager
from .preprocessing import create_input_dataframe, preprocess_for_ann

def predict_diamond_prices(data: DiamondInput) -> PredictionResponse:
    """
    Executes inference using:
    1. Random Forest Regressor
    2. Artificial Neural Network (ANN)
    3. Combined Ensemble Prediction (in log space)
    """
    rf_loaded = model_manager.is_rf_loaded
    ann_loaded = model_manager.is_ann_loaded

    if not rf_loaded and not ann_loaded:
        raise HTTPException(
            status_code=503,
            detail=(
                "Models not loaded. Please upload 'diamond_random_forest.pkl' and "
                "'diamond_ann.pkl' into the 'backend/models/' directory."
            )
        )

    input_df = create_input_dataframe(data)
    rf_price: float = 0.0
    rf_log: float = 0.0
    ann_price: float = 0.0
    ann_log: float = 0.0

    # 1. Random Forest Prediction
    if rf_loaded:
        try:
            rf_log_pred = model_manager.rf_model.predict(input_df)
            # Support scalar or 1D array
            rf_log = float(np.ravel(rf_log_pred)[0])
            rf_price = float(np.exp(rf_log))
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error during Random Forest inference: {str(e)}"
            )

    # 2. ANN Prediction
    if ann_loaded:
        try:
            input_scaled = preprocess_for_ann(
                input_df=input_df,
                ann_feature_columns=model_manager.ann_feature_columns,
                ann_scaler=model_manager.ann_scaler
            )
            ann_log_pred = model_manager.ann_model.predict(input_scaled, verbose=0)
            ann_log = float(np.ravel(ann_log_pred)[0])
            ann_price = float(np.exp(ann_log))
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error during ANN inference: {str(e)}"
            )

    # 3. Ensemble Prediction (Log-Space Average)
    w_ann = data.ensemble_weight_ann if data.ensemble_weight_ann is not None else 0.60
    w_rf = 1.0 - w_ann

    if rf_loaded and ann_loaded:
        ensemble_log = (w_ann * ann_log) + (w_rf * rf_log)
        ensemble_price = float(np.exp(ensemble_log))
    elif ann_loaded:
        ensemble_price = ann_price
    else:
        ensemble_price = rf_price

    return PredictionResponse(
        random_forest_prediction=round(rf_price, 2),
        ann_prediction=round(ann_price, 2),
        ensemble_prediction=round(ensemble_price, 2),
        currency="USD",
        ensemble_weight_ann=round(w_ann, 2),
        ensemble_weight_rf=round(w_rf, 2),
        models_status={
            "random_forest_loaded": rf_loaded,
            "ann_loaded": ann_loaded
        }
    )
