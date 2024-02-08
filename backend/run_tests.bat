@echo off
REM 
set APP_PATH=%cd%/backend

REM 
if defined PYTHONPATH (
    set PYTHONPATH=%PYTHONPATH%;%APP_PATH%
) else (
    set PYTHONPATH=%APP_PATH%
)

python -m pytest tests/ -p no:cacheprovider -v