import pandas as pd
import numpy as np
from typing import Tuple, Any
from .schemas import DiamondInput

def create_input_dataframe(data: DiamondInput) -> pd.DataFrame:
    """Converts the DiamondInput Pydantic model into a 1-row Pandas DataFrame with original column names."""
    return pd.DataFrame([{
        "carat": float(data.carat),
        "cut": str(data.cut),
        "color": str(data.color),
        "clarity": str(data.clarity),
        "depth": float(data.depth),
        "table": float(data.table),
        "x": float(data.x),
        "y": float(data.y),
        "z": float(data.z)
    }])

def preprocess_for_ann(input_df: pd.DataFrame, ann_feature_columns: list, ann_scaler: Any) -> np.ndarray:
    """
    Applies the exact ANN training preprocessing workflow:
    1. Apply pd.get_dummies(drop_first=True, dtype=float)
    2. Reindex with ann_feature_columns and fill missing with 0
    3. Apply saved StandardScaler
    """
    # 1. One-hot encoding
    input_encoded = pd.get_dummies(
        input_df,
        drop_first=True,
        dtype=float
    )

    # 2. Match training columns
    input_encoded = input_encoded.reindex(
        columns=ann_feature_columns,
        fill_value=0.0
    )

    # 3. Scaling
    input_scaled = ann_scaler.transform(input_encoded)

    return input_scaled
