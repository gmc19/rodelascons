@echo off
echo ===== SECURE PRODUCTION DEPLOYMENT =====
echo.
echo This script will build and deploy a secure version of the site
echo with source maps disabled and protections against code exposure.
echo.

REM Ensure latest dependencies
echo Installing latest dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
  echo Error installing dependencies. Aborting.
  exit /b %ERRORLEVEL%
)

REM Clean previous builds
echo Cleaning previous builds...
if exist dist rmdir /s /q dist
if %ERRORLEVEL% NEQ 0 (
  echo Warning: Could not clean previous build.
)

REM Build secure production version
echo Building secure production version...
call npm run build:secure:win
if %ERRORLEVEL% NEQ 0 (
  echo Error during build. Aborting.
  exit /b %ERRORLEVEL%
)

REM Verify build has no source maps
echo Verifying no source maps in build...
findstr /s /m /c:".map" dist\*.js > nul
if %ERRORLEVEL% EQU 0 (
  echo WARNING: Source maps found in production build!
  echo This could expose your source code to the public.
  set /p continue=Continue anyway? (y/n): 
  if /i "%continue%" NEQ "y" (
    echo Deployment aborted.
    exit /b 1
  )
)

REM Deploy to Vercel
echo Deploying to Vercel...
call vercel --prod
if %ERRORLEVEL% NEQ 0 (
  echo Error during deployment. Please check the logs.
  exit /b %ERRORLEVEL%
)

echo.
echo ===== DEPLOYMENT COMPLETED SUCCESSFULLY =====
echo Visit your Vercel dashboard to verify the deployment.
echo. 