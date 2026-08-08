# ========== 请先修改这一行路径 ==========
$nginxPath = "E:\AIGC\mp4-player\nginx"   # 改成你 Nginx 实际解压的目录（不要带结尾的 \）
# ======================================

$nginxExe = Join-Path $nginxPath "nginx.exe"

# 检查路径是否存在
if (-not (Test-Path $nginxExe)) {
    Write-Error "找不到 nginx.exe，请检查路径：$nginxExe"
    pause
    return
}

# 创建任务组件
$action = New-ScheduledTaskAction -Execute $nginxExe -WorkingDirectory $nginxPath
$trigger = New-ScheduledTaskTrigger -AtStartup
$principal = New-ScheduledTaskPrincipal -UserId "NT AUTHORITY\SYSTEM" -LogonType ServiceAccount -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1)

# 注册任务（如果已存在会强制覆盖）
Register-ScheduledTask `
    -TaskName "Nginx Auto Start" `
    -Action $action `
    -Trigger $trigger `
    -Principal $principal `
    -Settings $settings `
    -Description "开机自动启动 Nginx 局域网文件下载服务器" `
    -Force

Write-Host "`n任务已成功创建！" -ForegroundColor Green
Write-Host "任务名称：Nginx Auto Start"
Write-Host "重启电脑后即可自动启动 Nginx。"
Write-Host "`n按任意键退出..." -ForegroundColor Yellow
pause