#!/usr/bin/env bash
# =============================================================================
#  FrameSync — installer (macOS / Linux) — interactive, or non-interactive.
#  FrameSync — 安装程序（macOS / Linux）——交互式，或非交互式。
#
#  It installs nginx if it's missing (brew / apt / dnf / yum, else the official
#  source tarball), serves this project on a port, and shares a video folder at
#  /videos/. Everything defaults to a location inside the project.
#
#  Interactive:      bash install.sh
#  Non-interactive:  bash install.sh --yes --port 8081
#
#  Defaults: --site = project folder, --video = project/local/videos,
#            --port = 8081. Anything generated lives under local/ (git-ignored).
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NGINX_VERSION="1.31.3"   # mainline; see https://nginx.org/en/download.html

usage() {
  cat <<'EOF'
FrameSync installer (macOS / Linux)

  Interactive:      bash install.sh
  Non-interactive:  bash install.sh --yes --port 8081

  Everything defaults to a location inside the project; nginx is installed if
  missing. Optional overrides:
    --port  <n>       Listen port (default 8081)
    --site  <dir>     Folder to serve   (default: the project folder)
    --video <dir>     Folder to share   (default: project/local/videos)
    --nginx <path>    nginx binary      (default: found on PATH / installed)
    --lang  en|zh     Message language (default en)
    --no-start        Configure only; do not start nginx
    --yes, -y         Run without prompts, using defaults + any options above
    -h, --help        Show this help
EOF
}

# ---- defaults + arg parsing --------------------------------------------------
ASSUME_YES=0
SITE_ROOT=""
VIDEO_ROOT=""
NGINX_ARG=""
PORT=""
LANG_ARG="en"
NO_START=0

while [ $# -gt 0 ]; do
  case "$1" in
    --yes|-y) ASSUME_YES=1 ;;
    --site)   SITE_ROOT="${2:-}";  shift ;;
    --site=*) SITE_ROOT="${1#*=}" ;;
    --video)   VIDEO_ROOT="${2:-}"; shift ;;
    --video=*) VIDEO_ROOT="${1#*=}" ;;
    --nginx)   NGINX_ARG="${2:-}";  shift ;;
    --nginx=*) NGINX_ARG="${1#*=}" ;;
    --port)   PORT="${2:-}";        shift ;;
    --port=*) PORT="${1#*=}" ;;
    --lang)   LANG_ARG="${2:-}";    shift ;;
    --lang=*) LANG_ARG="${1#*=}" ;;
    --no-start) NO_START=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 2 ;;
  esac
  shift
done

# ---- defaults inside the project --------------------------------------------
[ -n "$PORT" ]       || PORT="8081"
[ -n "$SITE_ROOT" ]  || SITE_ROOT="$SCRIPT_DIR"
[ -n "$VIDEO_ROOT" ] || VIDEO_ROOT="$SCRIPT_DIR/local/videos"

# ---- bilingual helpers -------------------------------------------------------
LANG_CHOICE="en"
say() { if [ "$LANG_CHOICE" = "zh" ]; then printf '%s\n' "$2"; else printf '%s\n' "$1"; fi; }

resolve_nginx() {
  if [ -n "$NGINX_ARG" ]; then
    if command -v "$NGINX_ARG" >/dev/null 2>&1; then command -v "$NGINX_ARG"; return; fi
    [ -x "$NGINX_ARG" ] && { printf '%s' "$NGINX_ARG"; return; }
    printf ''; return
  fi
  command -v nginx 2>/dev/null || printf ''
}

install_nginx() {
  local os; os="$(uname -s)"
  if [ "$os" = "Darwin" ] && command -v brew >/dev/null 2>&1; then
    brew install nginx
  elif command -v apt-get >/dev/null 2>&1; then
    sudo apt-get update && sudo apt-get install -y nginx
  elif command -v dnf >/dev/null 2>&1; then
    sudo dnf install -y nginx
  elif command -v yum >/dev/null 2>&1; then
    sudo yum install -y nginx
  else
    # No package manager — fetch the official source so the user can build it.
    local src="$SCRIPT_DIR/local/nginx-src"
    mkdir -p "$src"
    say "No package manager found. Downloading the official nginx source ..." \
        "未找到包管理器。正在下载 nginx 官方源码 ..."
    if command -v curl >/dev/null 2>&1; then
      curl -fsSL "https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz" -o "$src/nginx-$NGINX_VERSION.tar.gz"
    else
      wget -O "$src/nginx-$NGINX_VERSION.tar.gz" "https://nginx.org/download/nginx-$NGINX_VERSION.tar.gz"
    fi
    say "Saved to $src . Build it (./configure && make && make install), then re-run with --nginx <path>." \
        "已保存到 $src 。请自行编译（./configure && make && make install），然后带 --nginx <路径> 重新运行。"
    exit 1
  fi
}

# ---- language + confirmation ------------------------------------------------
if [ "$ASSUME_YES" -eq 1 ]; then
  LANG_CHOICE="$LANG_ARG"
else
  read -r -p "Continue in English? Press Enter for English, or type z for 中文: " pick
  case "$pick" in z*|Z*) LANG_CHOICE="zh"; echo "已切换为中文界面。" ;; esac
  echo
  say "== FrameSync installer ==" "== FrameSync 安装程序 =="
  say "This will install nginx if needed, serve $SITE_ROOT on port $PORT, and share videos from $VIDEO_ROOT." \
      "这将在需要时安装 nginx，把 $SITE_ROOT 以端口 $PORT 提供服务，并共享 $VIDEO_ROOT 中的视频。"
  read -r -p "$([ "$LANG_CHOICE" = zh ] && echo '是否继续？[Y/n]：' || echo 'Proceed? [Y/n]: ')" go
  case "$go" in n*|N*) say "Cancelled." "已取消。"; exit 0 ;; esac
fi

# ---- ensure nginx ------------------------------------------------------------
NGINX_BIN="$(resolve_nginx)"
if [ -z "$NGINX_BIN" ]; then
  say "nginx not found — installing it ..." "未找到 nginx —— 正在安装 ..."
  install_nginx
  NGINX_BIN="$(resolve_nginx)"
  [ -n "$NGINX_BIN" ] || { say "nginx still not found. Exiting." "仍未找到 nginx，退出。"; exit 1; }
fi

# ---- runtime dirs + video dir -----------------------------------------------
RUNTIME="$SCRIPT_DIR/local/nginx-runtime"
LOG_DIR="$RUNTIME/logs"
TEMP_DIR="$RUNTIME/temp"
mkdir -p "$LOG_DIR" "$TEMP_DIR"/{client_body,proxy,fastcgi,uwsgi,scgi} "$VIDEO_ROOT"

# ---- render + test config ----------------------------------------------------
say "Writing config ..." "正在写入配置 ..."
conf="$(cat "$SCRIPT_DIR/nginx.conf.template")"
conf="${conf//\{\{PORT\}\}/$PORT}"
conf="${conf//\{\{SITE_ROOT\}\}/$SITE_ROOT}"
conf="${conf//\{\{VIDEO_ROOT\}\}/$VIDEO_ROOT}"
conf="${conf//\{\{LOG_DIR\}\}/$LOG_DIR}"
conf="${conf//\{\{TEMP_DIR\}\}/$TEMP_DIR}"
CONF="$RUNTIME/nginx.conf"
printf '%s\n' "$conf" > "$CONF"

say "Checking the config ..." "正在检查配置 ..."
"$NGINX_BIN" -p "$RUNTIME" -c "$CONF" -t

# ---- start -------------------------------------------------------------------
if [ "$NO_START" -eq 0 ]; then
  "$NGINX_BIN" -p "$RUNTIME" -c "$CONF" -s stop >/dev/null 2>&1 || true
  "$NGINX_BIN" -p "$RUNTIME" -c "$CONF"
  say "nginx is running." "nginx 正在运行。"
fi

# ---- summary -----------------------------------------------------------------
LAN=""
case "$(uname -s)" in
  Linux)  command -v hostname >/dev/null 2>&1 && LAN="$(hostname -I 2>/dev/null | awk '{print $1}' || true)" ;;
  Darwin) LAN="$(ipconfig getifaddr en0 2>/dev/null || true)"; [ -n "$LAN" ] || LAN="$(ipconfig getifaddr en1 2>/dev/null || true)" ;;
esac
# keep only a valid-looking IPv4, otherwise drop it
case "$LAN" in [0-9]*.[0-9]*.[0-9]*.[0-9]*) : ;; *) LAN="" ;; esac
echo
say "Done." "完成。"
say "Put videos to share over the LAN in: $VIDEO_ROOT" "把要在局域网共享的视频放到：$VIDEO_ROOT"
say "Open the presenter at: http://localhost:$PORT/" "在此打开演示台：http://localhost:$PORT/"
[ -n "$LAN" ] && say "On the same network, other screens can use: http://$LAN:$PORT/" "同一网络下，其他屏幕可访问：http://$LAN:$PORT/"
echo
