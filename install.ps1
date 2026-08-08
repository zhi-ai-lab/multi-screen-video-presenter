#requires -Version 5.1
<#
.SYNOPSIS
    FrameSync installer (Windows) — interactive, or non-interactive via flags.
.DESCRIPTION
    It downloads nginx if it's missing, serves this project on a port, and
    shares a video folder at /videos/. Everything defaults to a location inside
    the project, so you normally don't pass any paths.

    Interactive:      powershell -ExecutionPolicy Bypass -File .\install.ps1
    Non-interactive:  powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes -Port 8081

    Defaults: -SiteRoot = project folder, -VideoRoot = project\local\videos,
              -NginxDir = project\nginx (downloaded if missing), -Port = 8081.
    Anything generated lives under local/ (git-ignored).
#>
[CmdletBinding()]
param(
    [switch]$Yes,                 # run non-interactively with the defaults/flags below
    [int]$Port = 0,               # default 8081
    [string]$SiteRoot,            # default: the project folder (has index.html)
    [string]$VideoRoot,           # default: project\local\videos
    [string]$NginxDir,            # default: project\nginx (downloaded if missing)
    [ValidateSet('en','zh')][string]$Lang = 'en',
    [switch]$NoStart,             # configure only; don't start nginx
    [switch]$AutoStart,           # also register a boot-on-start task (needs admin)
    [switch]$Help
)

$ErrorActionPreference = "Stop"
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch {}

$NginxVersion = "1.31.3"   # mainline; see https://nginx.org/en/download.html
$ProjectDir   = $PSScriptRoot

$Usage = @"
FrameSync installer (Windows)

  Interactive:      powershell -ExecutionPolicy Bypass -File .\install.ps1
  Non-interactive:  powershell -ExecutionPolicy Bypass -File .\install.ps1 -Yes -Port 8081

  Everything defaults to a location inside the project; nginx is downloaded if
  missing. Optional overrides:
    -Port <n>         Listen port (default 8081)
    -SiteRoot <dir>   Folder to serve      (default: the project folder)
    -VideoRoot <dir>  Folder to share      (default: project\local\videos)
    -NginxDir <dir>   Where nginx lives    (default: project\nginx)
    -Lang en|zh       Message language (default en)
    -AutoStart        Register a boot-on-start task (needs admin)
    -NoStart          Configure only; do not start nginx
    -Yes              Run without prompts, using defaults + any flags above
    -Help             Show this help
"@
if ($Help) { Write-Host $Usage; exit 0 }

$Strings = @{
    en = @{
        askZh    = "Continue in English? Press Enter for English, or type z for 中文: "
        title    = "FrameSync installer"
        plan     = "This will download nginx if needed, serve {0} on port {1}, and share videos from {2}."
        proceed  = "Proceed? [Y/n]: "
        cancelled= "Cancelled."
        dlGet    = "Downloading nginx {0} ..."
        dlDone   = "nginx is ready."
        writing  = "Writing config ..."
        testing  = "Checking the config ..."
        testBad  = "nginx rejected the config. See the message above."
        started  = "nginx is running."
        bootNeedAdmin = "Boot-on-start needs an Administrator PowerShell. Skipping — re-run with -AutoStart from an admin shell."
        bootDone = "Registered the 'Nginx Auto Start' scheduled task."
        videoTip = "Put videos to share over the LAN in:"
        openAt   = "Open the presenter at:"
        lanHint  = "On the same network, other screens can use:"
        done     = "Done."
    }
    zh = @{
        askZh    = "已切换为中文界面。按回车继续。"
        title    = "FrameSync 安装程序"
        plan     = "这将在需要时下载 nginx，把 {0} 以端口 {1} 提供服务，并共享 {2} 中的视频。"
        proceed  = "是否继续？[Y/n]："
        cancelled= "已取消。"
        dlGet    = "正在下载 nginx {0} ..."
        dlDone   = "nginx 已就绪。"
        writing  = "正在写入配置 ..."
        testing  = "正在检查配置 ..."
        testBad  = "nginx 拒绝了该配置，请看上方信息。"
        started  = "nginx 正在运行。"
        bootNeedAdmin = "开机自启需要「以管理员身份运行」的 PowerShell。已跳过——请在管理员终端中带 -AutoStart 重新运行。"
        bootDone = "已注册计划任务「Nginx Auto Start」。"
        videoTip = "把要在局域网共享的视频放到："
        openAt   = "在此打开演示台："
        lanHint  = "同一网络下，其他屏幕可访问："
        done     = "完成。"
    }
}

function Ok($m)   { Write-Host $m -ForegroundColor Green }
function Info($m) { Write-Host $m -ForegroundColor Cyan }
function Fail($m) { Write-Host $m -ForegroundColor Red }
function Slash($p){ return ($p -replace '\\','/') }

function Get-Nginx($dir, $version) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
    $zip = Join-Path $env:TEMP "nginx-$version.zip"
    Invoke-WebRequest -Uri "https://nginx.org/download/nginx-$version.zip" -OutFile $zip
    $tmp = Join-Path $env:TEMP "nginx-extract-$version"
    if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
    Expand-Archive -Path $zip -DestinationPath $tmp -Force
    Copy-Item -Path (Join-Path $tmp "nginx-$version\*") -Destination $dir -Recurse -Force
    Remove-Item $zip -Force
}

# ---- resolve settings (defaults live inside the project) --------------------
if ($Port -le 0) { $Port = 8081 }
if (-not $SiteRoot)  { $SiteRoot  = $ProjectDir }
if (-not $VideoRoot) { $VideoRoot = Join-Path $ProjectDir "local\videos" }
if (-not $NginxDir)  { $NginxDir  = Join-Path $ProjectDir "nginx" }
$nginxExe = Join-Path $NginxDir "nginx.exe"

# ---- language + confirmation ------------------------------------------------
if ($Yes) {
    $lang = $Lang
    $S = $Strings[$lang]
} else {
    $pick = Read-Host ($Strings.en.askZh)
    $lang = if ($pick -match '^[zZ]') { "zh" } else { "en" }
    $S = $Strings[$lang]
    if ($lang -eq "zh") { Write-Host $S.askZh -ForegroundColor Cyan }
    Write-Host ""
    Write-Host "== $($S.title) ==" -ForegroundColor Magenta
    Write-Host ($S.plan -f $SiteRoot, $Port, $VideoRoot) -ForegroundColor White
    $go = Read-Host $S.proceed
    if ($go -match '^[nN]') { Write-Host $S.cancelled -ForegroundColor Yellow; exit 0 }
}

# ---- ensure nginx (download if missing) -------------------------------------
if (-not (Test-Path $nginxExe)) {
    Info ($S.dlGet -f $NginxVersion)
    Get-Nginx $NginxDir $NginxVersion
    if (-not (Test-Path $nginxExe)) { Fail "nginx.exe still not found at $nginxExe"; exit 1 }
    Ok $S.dlDone
}

# ---- runtime dirs + video dir -----------------------------------------------
$runtime = Join-Path $ProjectDir "local\nginx-runtime"
$logDir  = Join-Path $runtime "logs"
$tmpDir  = Join-Path $runtime "temp"
foreach ($d in @($logDir, (Join-Path $tmpDir "client_body"), (Join-Path $tmpDir "proxy"), (Join-Path $tmpDir "fastcgi"), (Join-Path $tmpDir "uwsgi"), (Join-Path $tmpDir "scgi"), $VideoRoot)) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
}

# ---- render + test config ---------------------------------------------------
Info $S.writing
$conf = Get-Content -Raw (Join-Path $ProjectDir "nginx.conf.template")
$conf = $conf.Replace("{{PORT}}",       "$Port")
$conf = $conf.Replace("{{SITE_ROOT}}",  (Slash $SiteRoot))
$conf = $conf.Replace("{{VIDEO_ROOT}}", (Slash $VideoRoot))
$conf = $conf.Replace("{{LOG_DIR}}",    (Slash $logDir))
$conf = $conf.Replace("{{TEMP_DIR}}",   (Slash $tmpDir))
$confPath = Join-Path $runtime "nginx.conf"
# Write UTF-8 WITHOUT a BOM — nginx rejects a BOM at the start of its config.
[System.IO.File]::WriteAllText($confPath, $conf, (New-Object System.Text.UTF8Encoding($false)))

Info $S.testing
& $nginxExe -p $runtime -c $confPath -t
if ($LASTEXITCODE -ne 0) { Fail $S.testBad; exit 1 }

# ---- start ------------------------------------------------------------------
if (-not $NoStart) {
    Get-Process -Name nginx -ErrorAction SilentlyContinue | Stop-Process -Force
    Start-Sleep -Seconds 1
    Start-Process -FilePath $nginxExe -WorkingDirectory $NginxDir -ArgumentList @("-p", $runtime, "-c", $confPath) -NoNewWindow
    Start-Sleep -Seconds 1
    Ok $S.started
}

# ---- boot-on-start (only with -AutoStart) -----------------------------------
if ($AutoStart) {
    $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    if (-not $isAdmin) {
        Write-Host $S.bootNeedAdmin -ForegroundColor Yellow
    } else {
        $action    = New-ScheduledTaskAction -Execute $nginxExe -Argument "-p `"$runtime`" -c `"$confPath`"" -WorkingDirectory $NginxDir
        $trigger   = New-ScheduledTaskTrigger -AtStartup
        $principal = New-ScheduledTaskPrincipal -UserId "NT AUTHORITY\SYSTEM" -LogonType ServiceAccount -RunLevel Highest
        $settings  = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)
        Register-ScheduledTask -TaskName "Nginx Auto Start" -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Description "FrameSync — start nginx on boot" -Force | Out-Null
        Ok $S.bootDone
    }
}

# ---- summary ----------------------------------------------------------------
$lan = (Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } |
        Select-Object -First 1 -ExpandProperty IPAddress)
Write-Host ""
Ok $S.done
Write-Host "$($S.videoTip) $VideoRoot" -ForegroundColor White
Write-Host "$($S.openAt) http://localhost:$Port/" -ForegroundColor White
if ($lan) { Write-Host "$($S.lanHint) http://$lan`:$Port/" -ForegroundColor White }
Write-Host ""
