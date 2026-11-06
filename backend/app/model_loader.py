import os
import pickle
import logging
from pathlib import Path
from typing import Optional, Dict, Any

logger = logging.getLogger(__name__)

# Base paths
BASE_DIR = Path(__file__).resolve().parent.parent
MODELS_DIR = BASE_DIR / "models"
RF_MODEL_PATH = MODELS_DIR / "diamond_random_forest.pkl"
ANN_MODEL_PATH = MODELS_DIR / "diamond_ann.pkl"

class ModelManager:
    """Manages loading, storing, and accessing the trained Random Forest and ANN models."""
    def __init__(self):
        self.rf_model = None
        self.ann_model = None
        self.ann_scaler = None
        self.ann_feature_columns = None
        self.ann_best_params = None
        self.is_rf_loaded: bool = False
        self.is_ann_loaded: bool = False

    def load_models(self) -> Dict[str, Any]:
        """Loads both Random Forest and ANN model artifacts from the models directory."""
        status = {
            "rf_loaded": False,
            "ann_loaded": False,
            "models_dir": str(MODELS_DIR),
            "rf_path": str(RF_MODEL_PATH),
            "ann_path": str(ANN_MODEL_PATH),
            "messages": []
        }

        # 1. Load Random Forest model
        if RF_MODEL_PATH.exists():
            try:
                with open(RF_MODEL_PATH, "rb") as file:
                    self.rf_model = pickle.load(file)
                self.is_rf_loaded = True
                status["rf_loaded"] = True
                logger.info("Successfully loaded Random Forest pipeline from %s", RF_MODEL_PATH)
            except Exception as e:
                logger.error("Failed to load Random Forest model: %s", e)
                status["messages"].append(f"RF load error: {str(e)}")
        else:
            msg = f"Random Forest model file not found at: {RF_MODEL_PATH}"
            logger.warning(msg)
            status["messages"].append(msg)

        # 2. Load ANN model
        if ANN_MODEL_PATH.exists():
            try:
                import tensorflow as tf
                with open(ANN_MODEL_PATH, "rb") as file:
                    ann_data = pickle.load(file)

                # Reconstruct Keras model
                self.ann_model = tf.keras.models.model_from_json(ann_data["architecture"])
                self.ann_model.set_weights(ann_data["weights"])
                self.ann_scaler = ann_data["scaler"]
                self.ann_feature_columns = ann_data["feature_columns"]
                self.ann_best_params = ann_data.get("best_params", {})

                self.is_ann_loaded = True
                status["ann_loaded"] = True
                logger.info("Successfully loaded ANN model, scaler, and features from %s", ANN_MODEL_PATH)
            except Exception as e:
                logger.error("Failed to load ANN model: %s", e)
                status["messages"].append(f"ANN load error: {str(e)}")
        else:
            msg = f"ANN model file not found at: {ANN_MODEL_PATH}"
            logger.warning(msg)
            status["messages"].append(msg)

        return status

# Singleton instance
model_manager = ModelManager()
