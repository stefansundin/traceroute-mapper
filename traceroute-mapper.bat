@echo off
setlocal EnableDelayedExpansion

for /f "tokens=*" %%i in (' "tracert %*" ') do set X=!X!%%0A%%i
start "link" "https://passidel.github.io/traceroute-mapper/?trace=!X!"
