# 更新日志

FrameSync 的所有重要变更都记录于此。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

[English](CHANGELOG.md) · 简体中文

## [未发布]

### 新增

- **安装脚本**——`install.ps1`（Windows）与 `install.sh`（macOS/Linux），均提供交互模式与一行命令的非交互模式。它们选择界面语言（默认英文，可切换中文），**在缺少 nginx 时自动安装**（Windows：下载 1.31.3 版本；macOS/Linux：`brew`/`apt`/`dnf`/`yum`，否则获取官方源码），随后写入配置并启动 nginx。路径默认指向项目内部（站点 = 项目文件夹，视频 = `local/videos`），端口默认 **8081**，因此在未提供任何位置时，安装脚本只需一个 Yes/No 确认。非交互：`install.ps1 -Yes -Port 8081` / `install.sh --yes --port 8081`；可选 `-SiteRoot/-VideoRoot/-NginxDir/-AutoStart`（Windows）与 `--site/--video/--nginx`（Unix）；`-Help`/`--help` 查看列表。
- **`install.cmd`**——Windows 启动器，用 `-ExecutionPolicy Bypass` 运行 `install.ps1`（可双击，参数透传），使用户不再遇到“running scripts is disabled”错误。
- **`nginx.conf.template`**——一份自包含的配置模板，供安装脚本填充（也可手动填写）；用于提供演示台，并暴露 `/videos/` 下载索引。
- 双语项目文档：`README.md` / `README.zh.md` 与 `CHANGELOG.md` / `CHANGELOG.zh.md`，围绕“一段话概述 + 分步部署”重写。
- README 新增“启动、停止、重启”一节，含各平台（Windows 与 macOS/Linux）命令及重启电脑后的说明。
- README 新增“卸载”一节：停止 nginx、移除开机自启任务、删除文件夹，以及（macOS/Linux）移除由包管理器安装的 nginx 及其 80 端口系统服务。
- 用于存放私有、机器专属文件的 `local/` 文件夹（已被 git 忽略），包括在 `local/nginx-runtime/` 下生成的运行时配置与日志。

### 变更

- 将仓库重构为常见的静态站点结构：脚本移至 `assets/scripts/`，样式移至 `assets/styles/`，并相应更新 `index.html`。
- `.gitignore` 现在只在文件夹层级忽略——不再使用单文件通配规则。新增一个私有的 `local/` 文件夹，与已被忽略的 `nginx/` 一同，把机器专属文件（及其名称）挡在版本控制之外。

### 修复

- `install.ps1` 在下载 nginx 前强制启用 TLS 1.2，使其在原生 Windows PowerShell 5.1 上也能从 `https://nginx.org` 正常下载（否则会协商到旧协议而失败）。
- `install.ps1` 在启动后会校验 nginx 是否真的保持运行，并指向 `error.log`（例如端口被占用），而非一律报告成功。

### 移除

- 独立的 `Start-Nginx.ps1` 与 `Install-Nginx-AutoStart.ps1` 脚本——已由 `install.ps1` 取代，后者一并完成配置、启动与开机自启。

## [1.0.0] - 2026-08-08

FrameSync 的首个完整版本——一台本地优先的多屏 MP4 演示台。

### 新增

- **多区块播放**——添加、复制、移除相互独立的视频面板，每个面板都有各自的状态、时长、分辨率与文件大小显示。
- **统一控制台**——播放、暂停、停止借助 `Promise.allSettled` 一次作用于所有区块，某处被拦截的自动播放绝不会卡住其余部分。
- **循环与主音量**——整场会话统一的循环开关，以及驱动所有面板的单个音量推子。
- **键盘操控**——<kbd>Space</kbd>（播放 / 暂停）、<kbd>R</kbd>（重置）、<kbd>L</kbd>（循环）。
- **文件载入**——拖放或浏览选择 `.mp4` 文件，通过 object URL 在本地读取，无任何上传；非 MP4 及无法解码的文件会在对应区块中报告。
- **14 款配色主题**——七款浅色、七款深色，通过 `localStorage` 跨会话记住。
- **双语界面**——在简体中文与 English 之间即时切换，选择会被保留。
- **nginx 服务脚本**——用于在 Windows 上通过局域网提供该文件夹。

[未发布]: https://github.com/zhi-ai-lab/multi-screen-video-presenter/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/zhi-ai-lab/multi-screen-video-presenter/releases/tag/v1.0.0
