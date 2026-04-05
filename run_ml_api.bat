@echo off
echo Starting ML API setup...

cd ml-api

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
if exist requirements-windows.txt (
    pip install -r requirements-windows.txt
) else (
    pip install -r requirements.txt
)

echo Starting ML API server...
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
