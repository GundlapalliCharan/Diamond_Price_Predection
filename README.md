# Diamond Price Prediction

A Machine Learning project for predicting diamond prices based on gemological attributes and geometric measurements using pre-trained regression models.

---

## 📌 Project Overview

This project provides an end-to-end diamond valuation system. It takes 9 physical and quality attributes of a diamond and estimates its market price in USD using two distinct machine learning models:
1. **Random Forest Regressor**
2. **Artificial Neural Network (ANN)**
3. **Combined Ensemble Prediction** (Weighted logarithmic consensus)

---

## 📊 Dataset

- **Source**: [Kaggle - Diamonds Dataset](https://www.kaggle.com/datasets/shivam2503/diamonds)
- **Size**: Approximately 53,775 cleaned diamond records.
- **Target Variable**: `price` (Price in USD, transformed using $\ln(\text{price})$ during model training).
- **Features (9 attributes)**:
  - `carat`: Weight of the diamond (0.1 - 10.0 ct).
  - `cut`: Quality rating (`Fair`, `Good`, `Very Good`, `Premium`, `Ideal`).
  - `color`: Color grade from `J` (worst / faint tint) to `D` (best / colorless).
  - `clarity`: Clarity rating (`I1`, `SI2`, `SI1`, `VS2`, `VS1`, `VVS2`, `VVS1`, `IF`).
  - `depth`: Total depth percentage ($40.0 - 80.0\%$).
  - `table`: Width of the top table relative to the widest point ($40.0 - 95.0\%$).
  - `x`: Length in mm.
  - `y`: Width in mm.
  - `z`: Depth in mm.

---

## 📓 Analysis & Model Training Notebook

The complete data preprocessing, exploratory data analysis (EDA), feature engineering, hyperparameter tuning, and model evaluation workflows are documented in:

- **`Diamond_Price_Predection.ipynb`**

### Training Details:
- **Dataset Split**: 64% Training, 16% Validation, 20% Testing.
- **Target Transformation**: The target variable was transformed via natural logarithm $y = \ln(\text{price})$. Model predictions are converted back to USD using $\exp(\hat{y})$.
- **Random Forest**:
  - Implemented with scikit-learn `RandomForestRegressor`.
  - Feature processing built inside a `ColumnTransformer` with `OneHotEncoder(drop='first', handle_unknown='ignore')`.
  - Hyperparameters tuned with `RandomizedSearchCV`.
- **Artificial Neural Network (ANN)**:
  - Implemented using TensorFlow/Keras.
  - Categoricals encoded using `pd.get_dummies(drop_first=True)` aligned to training columns.
  - Feature normalization using `StandardScaler`.
  - Hyperparameter optimization conducted with Optuna and EarlyStopping.

---

## 📈 Model Performance Benchmark

Evaluated on the 20% holdout test dataset with predictions converted back to USD:

| Metric | Random Forest | Artificial Neural Network (ANN) |
|---|---:|---:|
| **R² Score** | `0.970881` | `0.973891` |
| **MAE** | `$310.16` | `$340.31` |
| **RMSE** | `$678.36` | `$642.34` |

- **ANN** achieved the higher $R^2$ score and lower RMSE.
- **Random Forest** achieved the lower Mean Absolute Error (MAE).
- **Combined Ensemble**: Blends predictions in logarithmic space:
  $$\ln(\text{price}_{\text{ensemble}}) = 0.60 \cdot \ln(\text{price}_{\text{ann}}) + 0.40 \cdot \ln(\text{price}_{\text{rf}})$$
  $$\text{price} = \exp(\ln(\text{price}_{\text{ensemble}}))$$

---

## 📁 Model Artifacts

Trained model files are stored in `backend/models/`:

- `backend/models/diamond_random_forest.pkl`: Full trained scikit-learn pipeline (model + preprocessor).
- `backend/models/diamond_ann.pkl`: Dictionary containing the Keras model architecture (JSON), weights, fitted `StandardScaler`, and feature column signatures.

---

## 🏗️ Project Architecture

```
Diamond_Predection/
│
├── Diamond_Price_Predection.ipynb     # Jupyter Notebook for EDA & model training
│
├── backend/
│   ├── app/
│   │   ├── main.py                    # FastAPI application & endpoints
│   │   ├── model_loader.py            # Artifact loader for RF & Keras ANN
│   │   ├── preprocessing.py           # Feature transformations & scaling
│   │   ├── prediction.py              # Inference & ensemble consensus logic
│   │   └── schemas.py                 # Pydantic validation schemas
│   ├── models/
│   │   ├── diamond_random_forest.pkl  # Trained Random Forest pipeline
│   │   └── diamond_ann.pkl            # Trained ANN model & scaler
│   ├── requirements.txt               # Backend dependencies
│   └── run.py                         # Backend entry point
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                    # Application dashboard
│   │   ├── main.jsx                   # Entry point
│   │   ├── services/api.js            # REST client for backend API
│   │   └── constants/diamondData.js   # Dataset feature categories & presets
│   ├── package.json
│   └── vite.config.js
│
├── start.bat                          # 1-Click launcher (Windows)
├── start.ps1                          # PowerShell startup script
├── .gitignore
└── README.md
```

---

## 🚀 Running the Project Locally

### Prerequisites
- Python 3.10+
- Node.js 18+

### Quick Start
Run the launcher script:
```powershell
.\start.ps1
```
*(or double-click `start.bat`)*

---

### Manual Setup

#### 1. Backend (FastAPI)
```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python run.py
```
- API Endpoint: **http://127.0.0.1:8000**
- Swagger Documentation: **http://127.0.0.1:8000/docs**

#### 2. Frontend (React)
```powershell
cd frontend
npm install
npm run dev
```
- Application: **http://localhost:5173**
