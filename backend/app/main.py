from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from .schemas import DiamondInput, PredictionResponse, PerformanceMetricsResponse, ModelMetrics
from .model_loader import model_manager
from .prediction import predict_diamond_prices

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("diamond_api")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: attempt to load saved model artifacts
    logger.info("Initializing models on application startup...")
    status = model_manager.load_models()
    logger.info("Model load status: %s", status)
    yield
    # Shutdown logic if needed
    logger.info("Shutting down Diamond Price Prediction API...")

app = FastAPI(
    title="Diamond Price Prediction API",
    description="Machine Learning REST API for predicting diamond prices using Random Forest and Artificial Neural Network (ANN).",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Diamond Price Prediction API is operational.",
        "docs": "/docs",
        "models_status": {
            "random_forest_loaded": model_manager.is_rf_loaded,
            "ann_loaded": model_manager.is_ann_loaded
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "random_forest_loaded": model_manager.is_rf_loaded,
        "ann_loaded": model_manager.is_ann_loaded,
        "models_directory": str(model_manager.MODELS_DIR) if hasattr(model_manager, "MODELS_DIR") else "backend/models"
    }

@app.post("/reload-models")
def reload_models():
    """Endpoint to trigger reloading models after files are uploaded to backend/models/."""
    status = model_manager.load_models()
    return {
        "message": "Models reload attempted.",
        "status": status
    }

@app.get("/metrics", response_model=PerformanceMetricsResponse)
def get_metrics():
    """Returns the official test dataset evaluation metrics from model training."""
    return PerformanceMetricsResponse(
        random_forest=ModelMetrics(
            r2_score=0.970881,
            mae=310.16,
            rmse=678.36
        ),
        ann=ModelMetrics(
            r2_score=0.973891,
            mae=340.31,
            rmse=642.34
        ),
        notes="Evaluated on 20% test data with predictions converted back into USD. ANN achieved superior R² and RMSE, while Random Forest achieved lower MAE."
    )

@app.post("/predict", response_model=PredictionResponse)
def predict(input_data: DiamondInput):
    """
    Accepts diamond features and returns predictions from:
    1. Random Forest Regressor
    2. Artificial Neural Network (ANN)
    3. Combined Ensemble Prediction
    """
    return predict_diamond_prices(input_data)
