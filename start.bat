@echo off
title Diamond Price Prediction Launcher
echo ==========================================================
echo        Diamond Price Prediction - iOS Glass Edition
echo ==========================================================
echo.
echo Starting FastAPI Backend...
start "Diamond Backend" powershell -NoExit -Command "cd backend; .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo Starting React Frontend...
start "Diamond Frontend" powershell -NoExit -Command "cd frontend; npm run dev"

echo.
echo Servers started in separate windows!
echo Frontend: http://localhost:5173
echo Backend:  http://127.0.0.1:8000
echo.
pause

