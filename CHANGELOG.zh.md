# 更新日志

FrameSync 的所有重要变更都记录于此。

格式遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

[English](CHANGELOG.md) · 简体中文

## [1.0.0] - 2026-08-08

FrameSync 的首个公开版本——一台本地优先的多屏 MP4 演示台。

### 新增

**演示台**

- 多区块播放——添加、复制、移除相互独立的视频面板，每个面板都有各自的状态、时长、分辨率与文件大小显示。
- 统一控制台——播放、暂停、停止、循环一次作用于所有区块（借助 `Promise.allSettled`，某处被拦截的自动播放绝不会卡住其余部分）；键盘 <kbd>Space</kbd>（播放/暂停）、<kbd>R</kbd>（重置）、<kbd>L</kbd>（循环）。
- 驱动所有面板的主音量。
- 拖放或浏览选择 `.mp4`，通过 object URL 在本地读取——无任何上传；非 MP4 及无法解码的文件会在对应区块中报告。
- 14 款配色主题（7 浅、7 深）与 简体中文 / English 界面切换——两者都通过 `localStorage` 记住。

**服务与工具**

- 交互式与一行命令安装脚本——`install.ps1`（Windows）与 `install.sh`（macOS/Linux）——在缺少 nginx 时自动安装（Windows：通过 TLS 1.2 下载 1.31.3 版本；macOS/Linux：`brew`/`apt`/`dnf`/`yum`，否则获取官方源码），随后生成 nginx 配置并启动。路径默认指向项目内部（站点 = 项目文件夹，视频 = `local/videos`）；端口默认 8081；未提供任何位置时只需一个 Yes/No 确认。
- `install.cmd`——Windows 启动器，用 `-ExecutionPolicy Bypass` 运行 `install.ps1`（可双击，参数透传）。
- `nginx.conf.template`——一份自包含的配置模板，供安装脚本填充（也可手动填写）；用于提供演示台，并暴露 `/videos/` 局域网下载索引。
- 常见的静态站点结构（`assets/scripts/`、`assets/styles/`）；文件夹级 `.gitignore`，含私有的 `local/`（存放共享视频与生成的 nginx 运行时）。
- 双语 `README` / `CHANGELOG`、MIT `LICENSE`，以及 GitHub Pages 在线演示。

[1.0.0]: https://github.com/zhi-ai-lab/multi-screen-video-presenter/releases/tag/v1.0.0
