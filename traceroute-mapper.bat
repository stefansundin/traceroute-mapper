@echo off
setlocal EnableDelayedExpansion

for /f "tokens=*" %%i in (' "tracert %*" ') do set X=!X!%%0A%%i
start "link" "http://stefansundin.github.io/traceroute-mapper/?trace=!X!"
