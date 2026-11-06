# Launch Diamond Price Prediction Application (FastAPI Backend + Vite Frontend)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "       Diamond Price Prediction - iOS Glass Edition       " -ForegroundColor White
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Start FastAPI Backend in background
Write-Host "`n[1/2] Starting FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload" -PassThru

# 2. Start React Frontend
Write-Host "[2/2] Starting React + Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "`nAll servers initiated!" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "Backend API: http://127.0.0.1:8000" -ForegroundColor White
Write-Host "API Docs (Swagger): http://127.0.0.1:8000/docs`n" -ForegroundColor White

