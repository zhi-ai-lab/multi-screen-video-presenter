# Changelog

All notable changes to FrameSync are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

English · [简体中文](CHANGELOG.zh.md)

## [Unreleased]

### Added

- **Installers** — `install.ps1` (Windows) and `install.sh` (macOS/Linux), each with an interactive mode and a one-line non-interactive mode. They pick language (English by default, offer 中文), **auto-install nginx when it's missing** (Windows: download the 1.31.3 build; macOS/Linux: `brew`/`apt`/`dnf`/`yum`, else fetch the official source), then write the config and start nginx. Paths default to inside the project (site = the project folder, video = `local/videos`), port defaults to **8081**, so with no locations given the installer just asks a single Yes/No. Non-interactive: `install.ps1 -Yes -Port 8081` / `install.sh --yes --port 8081`; optional `-SiteRoot/-VideoRoot/-NginxDir/-AutoStart` (Windows) and `--site/--video/--nginx` (Unix); `-Help`/`--help` for the list.
- **`install.cmd`** — a Windows launcher that runs `install.ps1` with `-ExecutionPolicy Bypass` (double-click friendly; args pass through), so users don't hit the "running scripts is disabled" error.
- **`nginx.conf.template`** — a single, self-contained config the installers fill in (or you fill in by hand); serves the presenter and exposes a `/videos/` download index.
- Bilingual project documentation: `README.md` / `README.zh.md` and `CHANGELOG.md` / `CHANGELOG.zh.md`, rewritten around a one-paragraph overview plus step-by-step deployment.
- README "Start, stop, restart" section with per-platform commands (Windows and macOS/Linux) and after-reboot guidance.
- README "Uninstall" section: stop nginx, remove the boot-on-start task, delete the folder, and (macOS/Linux) remove the package-managed nginx and its port-80 system service.
- `local/` folder for private, machine-specific files (git-ignored), including the runtime config and logs generated under `local/nginx-runtime/`.

### Changed

- Restructured the repository into a conventional static-site layout: scripts moved to `assets/scripts/`, styles to `assets/styles/`, and `index.html` updated to match.
- `.gitignore` now ignores at the folder level only — no per-file patterns. A private `local/` folder joins the already-ignored `nginx/`, keeping machine-specific files (and their names) out of version control.

### Fixed

- `install.ps1` now forces TLS 1.2 before downloading nginx, so the fetch from `https://nginx.org` works on a stock Windows PowerShell 5.1 (which otherwise negotiates an old protocol and fails).
- `install.ps1` verifies nginx actually stayed up after starting and points at `error.log` (e.g. port already in use) instead of always reporting success.

### Removed

- The standalone `Start-Nginx.ps1` and `Install-Nginx-AutoStart.ps1` scripts — superseded by `install.ps1`, which folds in configuring, starting, and boot-on-start.

## [1.0.0] - 2026-08-08

The first complete release of FrameSync — a local-first, multi-screen MP4 presenter.

### Added

- **Multi-section playback** — add, duplicate, and remove independent video panels, each with its own status, duration, resolution, and file-size readout.
- **Unified control deck** — Play, Pause, and Stop act on every section at once via `Promise.allSettled`, so a single blocked autoplay never stalls the rest.
- **Loop and master volume** — session-wide loop toggle and one volume fader driving all panels.
- **Keyboard transport** — <kbd>Space</kbd> (play / pause), <kbd>R</kbd> (reset), and <kbd>L</kbd> (loop).
- **File loading** — drag-and-drop or browse for `.mp4` files, read locally through object URLs with no uploads; non-MP4 and undecodable files are reported per section.
- **14 color themes** — seven light and seven dark, remembered across sessions in `localStorage`.
- **Bilingual UI** — instant switching between 简体中文 and English, with the choice persisted.
- **Nginx serving helpers** for reaching the presenter over a LAN on Windows.

[Unreleased]: https://github.com/jasonshen/multi-screen-video-presenter/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/jasonshen/multi-screen-video-presenter/releases/tag/v1.0.0
