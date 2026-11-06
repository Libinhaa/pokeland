@echo off
title PokéLand Playtest Server
cd /d "%~dp0"
echo ============================================================
echo   Iniciando Servidor de Playtest do PokeLand...
echo ============================================================
start "" "http://localhost:8080"
python server.py
pause
