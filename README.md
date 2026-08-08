<div align="center">

# FrameSync

**A multi-screen MP4 presenter that runs entirely in your browser.**

English · [简体中文](README.zh.md) · [Changelog](CHANGELOG.md)

</div>

Load local MP4s into separate playing sections and drive every screen from one control deck — play, pause, loop, and level them together with a keyboard or a click. Nothing is uploaded: each file is read straight from disk in the browser, so your videos and their file names never leave the machine. It's a single static page, so you can open it directly on one computer, or serve the folder with nginx to reach the presenter (and share videos) from every screen on your LAN.

- **Multi-section playback** — add, duplicate, and remove independent video panels.
- **One control deck** — Play / Pause / Stop / Loop act on every section at once; <kbd>Space</kbd> play·pause, <kbd>R</kbd> reset, <kbd>L</kbd> loop.
- **Drag, drop, or browse** `.mp4` files; per-section duration, resolution, and size.
- **14 color themes** (7 light · 7 dark) and a **中文 / English** toggle — both remembered.

---

## Run it on one computer

Open the page — no install, no server:

```bash
start index.html      # Windows
# open index.html     # macOS
# xdg-open index.html # Linux
```

Add a section, choose an `.mp4`, press <kbd>Space</kbd>. (Over `file://` some browsers won't persist your theme/language — serve the folder if you want those to stick.)

## Serve it on your LAN

To reach the presenter from other screens on the same network, serve it with [nginx](https://nginx.org/). The installer is the easy path: it **downloads nginx if it's missing**, serves this project on port **8081**, and shares a video folder at `/videos/`. Everything it generates lives under `local/` (git-ignored).

### Option A — installer (recommended)

Clone the repo, then run the installer for your OS. It asks your language first (English by default; type `z` for 中文), then a single **Yes** to proceed with the defaults.

```powershell
# Windows — double-click install.cmd, or run it in a terminal:
.\install.cmd
```

```bash
# macOS / Linux
bash install.sh
```

**One-line, no prompts** — copy, change the port if you like, and run:

```powershell
# Windows
.\install.cmd -Yes -Port 8081
```

```bash
# macOS / Linux
bash install.sh --yes --port 8081
```

> Windows blocks running `.ps1` files directly (the "running scripts is disabled" error). `install.cmd` just launches `install.ps1` with `-ExecutionPolicy Bypass`; if you'd rather call it yourself, use `powershell -ExecutionPolicy Bypass -File .\install.ps1`.

Then open the URL it prints (default <http://localhost:8081/>). To share videos over the LAN, drop `.mp4` files into `local/videos/` — they show up at `http://<host>:8081/videos/`.

On Windows the installer downloads the nginx **1.31.3** Windows build. On macOS/Linux it installs nginx with `brew` / `apt` / `dnf` / `yum`. Optional overrides (rarely needed): `-SiteRoot` `-VideoRoot` `-NginxDir` `-AutoStart` on Windows, `--site` `--video` `--nginx` on macOS/Linux — run with `-Help` / `--help` for the full list.

> **Site folder vs. video folder.** The *site folder* is what nginx serves at `/` — this project, with `index.html` and `assets/`; that's the presenter itself. The *video folder* is a separate directory served at `/videos/` as a browsable download list, so other machines can pull the raw `.mp4` files. The presenter works without it; it's just a convenience.

### Option B — set up nginx by hand

1. **Get nginx.** Windows: download the Windows build from <https://nginx.org/en/download.html> (e.g. *nginx/Windows-1.31.3*). macOS: `brew install nginx`. Linux: your distro's package, or the source tarball <https://nginx.org/download/nginx-1.31.3.tar.gz>.
2. **Put it in place (Windows).** Unzip the download and copy its contents into this project's `nginx/` folder, so `nginx/nginx.exe` exists.
3. **Make the config.** Copy [`nginx.conf.template`](nginx.conf.template) and replace every `{{...}}` token — the port, the folder to serve (`{{SITE_ROOT}}`), the log/temp dirs, and `{{VIDEO_ROOT}}` (the folder of videos to share). Use forward slashes, even on Windows.
4. **Start it**, pointing nginx at your filled-in config:
   ```bash
   nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf
   ```

### Start, stop, restart

Run these from the project root. Re-running the installer (`-Yes` / `--yes`) reconfigures **and restarts**; the raw `nginx` commands act on the config the installer already generated under `local/nginx-runtime/`. On Windows the binary is `nginx\nginx.exe`; on macOS/Linux it's `nginx` on your PATH.

**Windows**

```powershell
.\install.cmd -Yes                                                                  # start / restart (fresh config)
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf             # start with existing config
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf -s reload   # reload after editing config
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf -s stop     # stop
```

**macOS / Linux**

```bash
bash install.sh --yes                                                        # start / restart (fresh config)
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf           # start with existing config
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf -s reload # reload after editing config
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf -s stop   # stop
```

**To restart:** either re-run the installer, or `stop` then `start`. If you only changed the config, `-s reload` applies it with no downtime.

**After a reboot:** nginx does **not** come back on its own unless you enabled boot-on-start (Windows: `.\install.cmd -Yes -AutoStart` from an Administrator terminal, which runs nginx as SYSTEM). Otherwise just run the start command above again. If you enabled auto-start, run `stop` from an Administrator terminal too, since the server runs as SYSTEM.

## Project structure

```
multi-screen-video-presenter/
├── index.html            # the whole UI (+ a <template> for one section)
├── assets/
│   ├── scripts/app.js    # playback engine, i18n, theming, section logic
│   └── styles/styles.css # design system: themes, layout, components
├── install.cmd           # Windows launcher (runs install.ps1, no exec-policy fuss)
├── install.ps1           # interactive / one-line installer — Windows
├── install.sh            # interactive / one-line installer — macOS / Linux
├── nginx.conf.template   # config the installers fill in
├── README.md · README.zh.md · CHANGELOG.md · CHANGELOG.zh.md
├── local/   # git-ignored — private: videos, shortcuts, generated nginx runtime
└── nginx/   # git-ignored — the nginx release (downloaded, not source)
```

`.gitignore` works at the folder level only. `local/` holds anything machine-specific or private — your shared videos (`local/videos/`) and the config and logs the installer generates under `local/nginx-runtime/` — so those paths and file names stay out of version control. `nginx/` is the downloaded binary release, not project source.

## License

No license file yet — all rights reserved by default until one is added.
