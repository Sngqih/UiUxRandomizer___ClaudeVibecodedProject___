@echo off
title Theme Randomizer
rem Double-click to run Theme Randomizer. Close this window to stop it.
cd /d "%~dp0"

where npm >nul 2>nul || (
  echo Node.js is not installed. Get it from https://nodejs.org and try again.
  pause
  exit /b 1
)

if not exist node_modules (
  echo First run: installing packages...
  call npm install || (pause & exit /b 1)
)

echo Starting Theme Randomizer. Your browser will open; close this window to stop it.
call npm run dev -- --open
pause
