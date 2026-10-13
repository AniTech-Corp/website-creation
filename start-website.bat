@echo off
title COMPUTE WEB - Local Dev Server
echo ========================================================
echo   Launching COMPUTE WEB (website-creation) on port 3000
echo ========================================================
cd /d "%~dp0"
npx -y serve . -l 3000
pause
