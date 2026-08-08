# Changelog

All notable changes to FrameSync are recorded here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

English · [简体中文](CHANGELOG.zh.md)

## [1.0.0] - 2026-08-08

First public release of FrameSync — a local-first, multi-screen MP4 presenter.

### Added

**Presenter**

- Multi-section playback — add, duplicate, and remove independent video panels, each with its own status, duration, resolution, and file-size readout.
- Unified control deck — Play, Pause, Stop, and Loop act on every section at once (via `Promise.allSettled`, so one blocked autoplay never stalls the rest); keyboard <kbd>Space</kbd> (play/pause), <kbd>R</kbd> (reset), <kbd>L</kbd> (loop).
- Master volume across all panels.
- Drag-and-drop or browse `.mp4`, read locally through object URLs — nothing is uploaded; non-MP4 and undecodable files are reported per section.
- 14 color themes (7 light, 7 dark) and a 简体中文 / English UI toggle — both remembered in `localStorage`.

**Serving & tooling**

- Interactive and one-line installers — `install.ps1` (Windows) and `install.sh` (macOS/Linux) — that auto-install nginx when it's missing (Windows: download the 1.31.3 build over TLS 1.2; macOS/Linux: `brew`/`apt`/`dnf`/`yum`, else the official source), render an nginx config, and start it. Paths default to inside the project (site = the project folder, video = `local/videos`); port defaults to 8081; with no locations given the installer just asks a single Yes/No.
- `install.cmd` — Windows launcher that runs `install.ps1` with `-ExecutionPolicy Bypass` (double-click friendly, args pass through).
- `nginx.conf.template` — a self-contained config the installers fill in (or you fill in by hand); serves the presenter and a `/videos/` LAN download index.
- Conventional static-site layout (`assets/scripts/`, `assets/styles/`); folder-level `.gitignore` with a private `local/` (holds shared videos and the generated nginx runtime).
- Bilingual `README` / `CHANGELOG`, MIT `LICENSE`, and a GitHub Pages demo.

[1.0.0]: https://github.com/zhi-ai-lab/multi-screen-video-presenter/releases/tag/v1.0.0
