# ========== 请确认路径 ==========
$nginxPath = "E:\AIGC\mp4-player\nginx"
# ================================

$nginxExe = Join-Path $nginxPath "nginx.exe"

# 检查文件是否存在
if (-not (Test-Path $nginxExe)) {
    Write-Host "错误：找不到 nginx.exe" -ForegroundColor Red
    Write-Host "路径：$nginxExe" -ForegroundColor Yellow
    pause
    exit
}

Write-Host "正在检查并停止已有的 Nginx 进程..." -ForegroundColor Cyan

# 杀掉所有 nginx 进程
$existing = Get-Process -Name nginx -ErrorAction SilentlyContinue
if ($existing) {
    $existing | Stop-Process -Force
    Write-Host "已停止 $($existing.Count) 个 Nginx 进程" -ForegroundColor Yellow
    Start-Sleep -Seconds 1
} else {
    Write-Host "当前没有运行中的 Nginx 进程" -ForegroundColor Green
}

# 启动 Nginx（修复版）
Write-Host "正在启动 Nginx..." -ForegroundColor Cyan
Start-Process -FilePath $nginxExe -WorkingDirectory $nginxPath -NoNewWindow

Start-Sleep -Seconds 2

# 检查是否启动成功
$running = Get-Process -Name nginx -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "`nNginx 启动成功！" -ForegroundColor Green
    Write-Host "进程数量：$($running.Count)" -ForegroundColor Green
    Write-Host "请访问：http://127.0.0.1:8080/" -ForegroundColor Cyan
} else {
    Write-Host "`n启动失败！请查看 logs\error.log" -ForegroundColor Red
    Get-Content (Join-Path $nginxPath "logs\error.log") -Tail 10
}

Write-Host "`n按任意键退出..."
pause