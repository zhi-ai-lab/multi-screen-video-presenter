<div align="center">

# FrameSync

**一台完全在浏览器中运行的多屏 MP4 演示台。**

[English](README.md) · 简体中文 · [更新日志](CHANGELOG.zh.md)

**[▶ 在线演示](https://zhi-ai-lab.github.io/multi-screen-video-presenter/)**

</div>

将本地 MP4 载入不同的播放区块，用一个控制台驱动每一块屏幕——用键盘或鼠标一起播放、暂停、循环、调节音量。任何内容都不会被上传：每个文件都在浏览器中直接从磁盘读取，视频及其文件名始终不离开这台机器。它是一个静态页面，因此既可以在单机上直接打开，也可以用 nginx 提供服务，让局域网内的每块屏幕都能访问演示台（并共享视频）。

- **多区块播放**——添加、复制、移除相互独立的视频面板。
- **一个控制台**——播放 / 暂停 / 停止 / 循环一次作用于所有区块；<kbd>Space</kbd> 播放·暂停，<kbd>R</kbd> 重置，<kbd>L</kbd> 循环。
- **拖入、放下或浏览**选择 `.mp4`；每个区块显示时长、分辨率与大小。
- **14 款配色主题**（7 浅 · 7 深）与 **中文 / English** 切换——两者都会被记住。

---

## 在单机上运行

直接打开页面——无需安装、无需服务器：

```bash
start index.html      # Windows
# open index.html     # macOS
# xdg-open index.html # Linux
```

添加一个区块，选择一个 `.mp4`，按下 <kbd>Space</kbd>。（通过 `file://` 打开时，部分浏览器不会保存你的主题 / 语言——如需保留请把文件夹提供出去。）

## 在局域网中提供服务

要让同一网络下的其他屏幕访问演示台，用 [nginx](https://nginx.org/) 提供服务。安装脚本是最省事的方式：它会**在缺少 nginx 时自动下载**，把本项目以端口 **8081** 提供服务，并在 `/videos/` 共享一个视频文件夹。它生成的一切都放在 `local/`（已被 git 忽略）之下。

### 方式 A —— 安装脚本（推荐）

克隆仓库，运行对应系统的安装脚本。它会先询问界面语言（默认英文；输入 `z` 切换中文），然后只需一个 **Yes** 即以默认设置继续。

```powershell
# Windows —— 双击 install.cmd，或在终端中运行：
.\install.cmd
```

```bash
# macOS / Linux
bash install.sh
```

**一行命令、无需交互**——复制，按需修改端口，运行即可：

```powershell
# Windows
.\install.cmd -Yes -Port 8081
```

```bash
# macOS / Linux
bash install.sh --yes --port 8081
```

> Windows 默认禁止直接运行 `.ps1` 文件（即“running scripts is disabled”错误）。`install.cmd` 只是用 `-ExecutionPolicy Bypass` 启动 `install.ps1`；若想自己调用，可用 `powershell -ExecutionPolicy Bypass -File .\install.ps1`。

随后打开它打印出的地址（默认 <http://localhost:8081/>）。要在局域网共享视频，把 `.mp4` 放进 `local/videos/`——它们会出现在 `http://<主机>:8081/videos/`。

在 Windows 上，安装脚本会下载 nginx **1.31.3** 的 Windows 版本；在 macOS/Linux 上，用 `brew` / `apt` / `dnf` / `yum` 安装 nginx。可选覆盖项（通常无需）：Windows 上 `-SiteRoot` `-VideoRoot` `-NginxDir` `-AutoStart`，macOS/Linux 上 `--site` `--video` `--nginx`——用 `-Help` / `--help` 查看完整列表。

> **站点文件夹 vs 视频文件夹。** *站点文件夹*是 nginx 在 `/` 处提供的内容——即本项目，含 `index.html` 与 `assets/`，也就是演示台本身。*视频文件夹*是另一个在 `/videos/` 处以可浏览下载列表形式提供的目录，让其他机器可以拉取原始 `.mp4` 文件。没有它演示台照常工作；它只是一个便利功能。

### 方式 B —— 手动配置 nginx

1. **获取 nginx。** Windows：从 <https://nginx.org/en/download.html> 下载 Windows 版本（例如 *nginx/Windows-1.31.3*）。macOS：`brew install nginx`。Linux：使用发行版软件包，或源码包 <https://nginx.org/download/nginx-1.31.3.tar.gz>。
2. **放到位（Windows）。** 解压下载文件，把其中内容拷贝进本项目的 `nginx/` 文件夹，使 `nginx/nginx.exe` 存在。
3. **生成配置。** 复制 [`nginx.conf.template`](nginx.conf.template)，把每个 `{{...}}` 占位符替换成真实值——端口、要提供服务的文件夹（`{{SITE_ROOT}}`）、日志/临时目录，以及 `{{VIDEO_ROOT}}`（要共享的视频所在文件夹）。即使在 Windows 上也用正斜杠。
4. **启动**，让 nginx 指向你填好的配置：
   ```bash
   nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf
   ```

### 启动、停止、重启

以下命令请在项目根目录下运行。重新运行安装脚本（`-Yes` / `--yes`）会重新配置**并重启**；而原生 `nginx` 命令则作用于安装脚本已在 `local/nginx-runtime/` 下生成的配置。Windows 上二进制是 `nginx\nginx.exe`，macOS/Linux 上是 PATH 中的 `nginx`。

**Windows**

```powershell
.\install.cmd -Yes                                                                  # 启动 / 重启（重新生成配置）
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf             # 用现有配置启动
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf -s reload   # 修改配置后重载
nginx\nginx.exe -p local\nginx-runtime -c local\nginx-runtime\nginx.conf -s stop     # 停止
```

**macOS / Linux**

```bash
bash install.sh --yes                                                        # 启动 / 重启（重新生成配置）
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf           # 用现有配置启动
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf -s reload # 修改配置后重载
nginx -p ./local/nginx-runtime -c ./local/nginx-runtime/nginx.conf -s stop   # 停止
```

**重启：** 要么重新运行安装脚本，要么先 `stop` 再 `start`。若只改了配置，用 `-s reload` 即可无中断生效。

**重启电脑之后：** 除非你启用了开机自启（Windows：在管理员终端运行 `.\install.cmd -Yes -AutoStart`，nginx 将以 SYSTEM 身份运行），否则 nginx 不会自行恢复——重新运行上面的启动命令即可。若启用了自启，停止时也请在管理员终端中执行，因为服务以 SYSTEM 身份运行。

## 卸载

默认情况下不会安装任何系统级内容——应用、nginx 二进制（Windows 上）以及安装脚本生成的一切，都在项目文件夹内。要干净地移除：

1. **停止 nginx**（见*启动、停止、重启*）。Windows 上，nginx 退出前文件夹会一直被占用。
2. **移除开机自启**（若你启用了 `-AutoStart`，Windows，管理员）：
   ```powershell
   schtasks /Delete /TN "Nginx Auto Start" /F
   ```
3. **删除项目文件夹**——这会移除应用、`nginx/` 以及 `local/` 下的一切。
4. **若安装脚本通过包管理器安装了 nginx**（macOS/Linux），且你不想保留，请单独移除——注意该软件包还会在 80 端口启动一个*系统级* nginx：
   ```bash
   sudo systemctl disable --now nginx   # Linux：停止系统服务
   sudo apt-get remove --purge nginx nginx-common   # Debian/Ubuntu
   # brew services stop nginx && brew uninstall nginx   # macOS
   ```
5. **防火墙（Windows）：** 若你曾允许 nginx 通过 Windows Defender 防火墙，不再需要时可删除该入站规则。

## 项目结构

```
multi-screen-video-presenter/
├── index.html            # 全部界面（含单个区块用的 <template>）
├── assets/
│   ├── scripts/app.js    # 播放引擎、国际化、主题、区块逻辑
│   └── styles/styles.css # 设计系统：主题、布局、组件
├── install.cmd           # Windows 启动器（调用 install.ps1，免去执行策略问题）
├── install.ps1           # 交互式 / 一行命令安装脚本 —— Windows
├── install.sh            # 交互式 / 一行命令安装脚本 —— macOS / Linux
├── nginx.conf.template   # 安装脚本据以填充的配置模板
├── README.md · README.zh.md · CHANGELOG.md · CHANGELOG.zh.md
├── local/   # 已被 git 忽略 —— 私有：视频、快捷方式、生成的 nginx 运行时
└── nginx/   # 已被 git 忽略 —— nginx 发行版（下载而来，非源码）
```

`.gitignore` 只在文件夹层级生效。`local/` 存放任何机器专属或私有的东西——你共享的视频（`local/videos/`）以及安装脚本在 `local/nginx-runtime/` 下生成的配置与日志——因此这些路径和文件名都留在版本控制之外。`nginx/` 是下载来的二进制发行版，而非项目源码。

## 许可协议

基于 [MIT 许可证](LICENSE) 发布 —— © 2026 Zhi AI Lab。
