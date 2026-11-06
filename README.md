# Diamond Price Prediction – Adaptive Liquid Glass UI

An AI-driven diamond price prediction web application designed with an **Adaptive Liquid Glass (iOS Glassmorphism)** user interface that automatically harmonizes with your **Browser / System Theme** (Light & Dark mode).

---

## 💎 Features

- **Automatic Browser Theme Synchronization**:
  - Automatically detects your OS / browser theme preference (`prefers-color-scheme`).
  - **Dark Mode (Black & White)**: Pitch obsidian background (`#000000`), frosted dark liquid glass (`backdrop-blur-32px`), specular white edge reflections, and platinum/crystal diamond facets.
  - **Light Mode (White & Black)**: Snow porcelain canvas (`#f8fafc`), ultra-clean translucent liquid glass, deep obsidian typography, and high-clarity crystal diamond facets.
  - **Quick Toggle in Dynamic Island**: Tap the theme pill in the top status bar to cycle between **Auto (System sync)**, **Dark**, or **Light**.
- **Interactive 3D Faceted Liquid Glass Diamond**:
  - Centerpiece faceted gem visualizer that adapts its reflections, geometry, and caustics dynamically based on dark/light mode and user selections.
- **3 Distinct Predictions (One-Page Dashboard)**:
  1. **Random Forest Regressor** (MAE: $310.16, R²: 0.970881)
  2. **Artificial Neural Network (ANN)** (RMSE: $642.34, R²: 0.973891)
  3. **Combined Ensemble Prediction** (Hero consensus card with logarithmic space blending)
- **Model Agreement Analysis**: Live variance delta and convergence gauge comparing the agreement between both models.
- **Quick Presets**: 1-click test configurations (Standard Engagement, Luxury Solitaire, Budget Round).

---

## 📁 Model Files

Both pre-trained model files are placed in:

```
d:\Diamond_Predection\backend\models\
│
├── diamond_random_forest.pkl    (Scikit-Learn 1.6.1 Pipeline)
└── diamond_ann.pkl              (Keras ANN Architecture & Optuna Weights)
```

---

## ⚡ Quick Start

### Option 1: 1-Click Launch
Double-click `start.bat` in the root folder or execute in PowerShell:
```powershell
.\start.ps1
```

### Option 2: Manual Start

#### 1. Start the FastAPI Backend
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python run.py
```
> Running at **http://127.0.0.1:8000** (Swagger API Docs at **http://127.0.0.1:8000/docs**)

#### 2. Start the React Frontend
```powershell
cd frontend
npm run dev
```
> Running at **http://localhost:5173**

---

## 🔬 Benchmark Performance (Test Dataset Holdout)

| Metric | Random Forest | ANN (Neural Net) |
|---|---:|---:|
| **R² Score** | `0.970881` | `0.973891` |
| **MAE** | `$310.16` | `$340.31` |
| **RMSE** | `$678.36` | `$642.34` |
