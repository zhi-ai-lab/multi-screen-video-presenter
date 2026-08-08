@echo off
REM FrameSync installer launcher (Windows).
REM Runs install.ps1 with -ExecutionPolicy Bypass so you don't hit the
REM "running scripts is disabled on this system" error. Args pass through,
REM e.g.  install.cmd -Yes -Port 8081
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install.ps1" %*
REM Pause only for a no-arg (double-click / interactive) run, so the window
REM stays open long enough to read the URL. Skipped when args are given.
if "%~1"=="" pause
