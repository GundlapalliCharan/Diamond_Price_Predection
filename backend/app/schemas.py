from pydantic import BaseModel, Field
from typing import Literal, Optional

# Valid categorical feature values based on the dataset
CutType = Literal["Fair", "Good", "Very Good", "Premium", "Ideal"]
ColorType = Literal["D", "E", "F", "G", "H", "I", "J"]
ClarityType = Literal["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1"]

class DiamondInput(BaseModel):
    carat: float = Field(..., gt=0.0, le=10.0, description="Weight of the diamond in carats (e.g. 0.70)")
    cut: CutType = Field(..., description="Quality of the cut: Fair, Good, Very Good, Premium, Ideal")
    color: ColorType = Field(..., description="Diamond color from J (worst) to D (best)")
    clarity: ClarityType = Field(..., description="Clarity rating: I1, SI2, SI1, VS2, VS1, VVS2, VVS1, IF")
    depth: float = Field(..., gt=40.0, le=80.0, description="Total depth percentage: 40.0 - 80.0")
    table: float = Field(..., gt=40.0, le=95.0, description="Width of top of diamond relative to widest point: 40.0 - 95.0")
    x: float = Field(..., gt=0.0, le=20.0, description="Length in mm")
    y: float = Field(..., gt=0.0, le=20.0, description="Width in mm")
    z: float = Field(..., gt=0.0, le=20.0, description="Depth in mm")
    ensemble_weight_ann: Optional[float] = Field(
        0.60,
        ge=0.0,
        le=1.0,
        description="Weight assigned to ANN in the ensemble prediction (default: 0.60)"
    )

    class Config:
        json_schema_extra = {
            "example": {
                "carat": 0.70,
                "cut": "Ideal",
                "color": "E",
                "clarity": "VS1",
                "depth": 61.5,
                "table": 55.0,
                "x": 5.70,
                "y": 5.72,
                "z": 3.51,
                "ensemble_weight_ann": 0.60
            }
        }

class PredictionResponse(BaseModel):
    random_forest_prediction: float = Field(..., description="Predicted diamond price in USD by Random Forest")
    ann_prediction: float = Field(..., description="Predicted diamond price in USD by ANN")
    ensemble_prediction: float = Field(..., description="Combined ensemble predicted price in USD")
    currency: str = "USD"
    ensemble_weight_ann: float = 0.60
    ensemble_weight_rf: float = 0.40
    models_status: dict

class ModelMetrics(BaseModel):
    r2_score: float
    mae: float
    rmse: float

class PerformanceMetricsResponse(BaseModel):
    random_forest: ModelMetrics
    ann: ModelMetrics
    notes: str
