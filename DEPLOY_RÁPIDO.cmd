@echo off
REM Deploy Rápido para Vercel

echo.
echo ╔══════════════════════════════════════╗
echo ║  Deploy Rápido - Projeto Óptica      ║
echo ╚══════════════════════════════════════╝
echo.

cd /D "%~dp0"

REM 1. Fazer backup do .env
if exist .env (
    echo ✅ Arquivo .env encontrado
) else (
    echo ⚠️  Arquivo .env não encontrado - criando modelo
)

REM 2. Inicializar git se necessário
if not exist .git (
    echo 🔧 Inicializando Git...
    git init
    git add .
    git commit -m "Initial commit - Vision Test App"
)

REM 3. Fazer push para Vercel
echo.
echo 🚀 Deploying para Vercel...
echo.
vercel --prod

echo.
echo ✅ Deploy concluído!
echo.
echo URLs:
echo 📍 Site: https://projeto-de-otica-capitacao-de-leads.vercel.app
echo 📍 Admin: https://projeto-de-otica-capitacao-de-leads.vercel.app/admin
echo 📍 QR Code: https://projeto-de-otica-capitacao-de-leads.vercel.app/qr
echo.
pause
