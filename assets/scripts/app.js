(() => {
  "use strict";

  /* ------------------------------------------------------------------ */
  /*  Internationalization                                              */
  /* ------------------------------------------------------------------ */
  const I18N = {
    zh: {
      brandType: "MP4 演示台",
      localSession: "本地会话",
      topbarNote: "无需上传 · 在浏览器中播放",
      eyebrow: "播放工作区",
      h1a: "多屏",
      h1b: "演示台",
      introCopy: "将本地 MP4 载入不同的播放区块，再用一个简洁的控制台统一操控每一块屏幕。",
      sessionModeLabel: "会话模式",
      sessionModeText: "同步播放",
      sessionControl: "会话控制",
      deckTitle: "全部播放区块",
      btnPlay: "播放",
      btnPause: "暂停",
      btnStop: "停止",
      btnLoop: "循环",
      masterVolume: "主音量",
      shortcuts: "快捷键",
      scPlayPause: "播放 / 暂停",
      scReset: "重置",
      scLoop: "循环",
      playingSections: "播放区块",
      sectionsHeading: "你的演示画布",
      addSection: "复制区块",
      footerLocal: "所有内容仅保留在此浏览器标签页中。",
      cardKicker: "播放区块",
      emptyTitle: "选择一个 MP4 文件",
      emptyHint: "拖入文件，或从电脑中浏览",
      browseFiles: "浏览文件",
      localMp4: "本地 MP4",
      changeFile: "更换文件",
      sectionName: "播放区块 {n}",
      duplicateTitle: "复制此区块",
      removeTitle: "移除此区块",
      fileNone: "未选择文件",
      metaWaiting: "等待本地视频",
      metaReading: "{size} MB · 正在读取元数据…",
      metaCantPlay: "此文件无法在浏览器中播放",
      metaMp4Only: "请选择扩展名为 .mp4 的文件",
      statReady: "就绪",
      statPlaying: "播放中",
      statPaused: "已暂停",
      statEnded: "已结束",
      statError: "文件错误",
      statMp4Only: "仅限 MP4",
      ssReadyPresent: "准备演示",
      ssAddToBegin: "添加一个本地 MP4 开始",
      ssPlaying: "正在播放 {m} 个区块中的 {n} 个",
      ssPaused: "已暂停播放",
      ssLoadedOne: "已载入 1 个区块",
      ssLoadedMany: "已载入 {n} 个区块",
      ssBlocked: "播放被拦截 —— 请再次点击播放",
      ssCheckFile: "请检查所选的 MP4 文件",
      theme: "主题",
      themePickTitle: "选择配色主题",
      themePickHint: "多款浅色与深色主题，随时切换",
      lightModes: "浅色模式",
      darkModes: "深色模式",
      themeLatte: "拿铁",
      themeLatteDesc: "暖咖啡棕",
      themeRice: "宣纸",
      themeRiceDesc: "颊红粉 · 秋波蓝",
      themeSunny: "晴空奶油",
      themeSunnyDesc: "奶油白 · 番茄红",
      themeBlush: "粉黛青芜",
      themeBlushDesc: "樱花粉 · 松烟绿",
      themeTaro: "芋泥奶咖",
      themeTaroDesc: "雾紫 · 焦糖棕",
      themeNeon: "元气撞色",
      themeNeonDesc: "霓虹紫 · 琉璃蓝",
      themeSpring: "春野新芽",
      themeSpringDesc: "薄荷 · 苍绿",
      themeLime: "午夜青柠",
      themeLimeDesc: "藏蓝 · 莱姆绿",
      themeKlein: "克莱因蓝",
      themeKleinDesc: "电光蓝 · 爱马仕橙",
      themeScheele: "舍勒绿",
      themeScheeleDesc: "墨黑 · 舍勒绿",
      themeHermes: "爱马仕橙",
      themeHermesDesc: "墨黑 · 爱马仕橙",
      themePrada: "普拉达蓝",
      themePradaDesc: "墨黑 · 普拉达蓝",
      themePeacock: "孔雀蓝",
      themePeacockDesc: "墨黑 · 孔雀蓝",
      themeGucci: "古驰绿",
      themeGucciDesc: "深绿 · 杏红",
      tipTitle: "全新配色主题",
      tipText: "这里可以挑选多款浅色与深色主题，选择会被自动记住。",
      tipGotIt: "知道了",
    },
    en: {
      brandType: "MP4 presenter",
      localSession: "Local session",
      topbarNote: "No uploads · plays in your browser",
      eyebrow: "Playback workspace",
      h1a: "Multi-screen",
      h1b: "presenter.",
      introCopy: "Load local MP4s into separate playing sections, then run every screen from one simple control deck.",
      sessionModeLabel: "SESSION MODE",
      sessionModeText: "Synchronized playback",
      sessionControl: "SESSION CONTROL",
      deckTitle: "All playing sections",
      btnPlay: "Play",
      btnPause: "Pause",
      btnStop: "Stop",
      btnLoop: "Loop",
      masterVolume: "MASTER VOLUME",
      shortcuts: "SHORTCUTS",
      scPlayPause: "play / pause",
      scReset: "reset",
      scLoop: "loop",
      playingSections: "PLAYING SECTIONS",
      sectionsHeading: "Your presentation canvas",
      addSection: "Duplicate section",
      footerLocal: "Everything stays local to this browser tab.",
      cardKicker: "PLAYING SECTION",
      emptyTitle: "Choose an MP4 file",
      emptyHint: "Drop a file here or browse your computer",
      browseFiles: "Browse files",
      localMp4: "LOCAL MP4",
      changeFile: "Change file",
      sectionName: "Playing section {n}",
      duplicateTitle: "Duplicate this section",
      removeTitle: "Remove this section",
      fileNone: "No file selected",
      metaWaiting: "Waiting for a local video",
      metaReading: "{size} MB · reading metadata…",
      metaCantPlay: "This file could not be played in the browser",
      metaMp4Only: "Please choose a file with the .mp4 extension",
      statReady: "Ready",
      statPlaying: "Playing",
      statPaused: "Paused",
      statEnded: "Ended",
      statError: "File error",
      statMp4Only: "MP4 only",
      ssReadyPresent: "Ready to present",
      ssAddToBegin: "Add a local MP4 to begin",
      ssPlaying: "Playing {n} of {m} sections",
      ssPaused: "Playback paused",
      ssLoadedOne: "1 section loaded",
      ssLoadedMany: "{n} sections loaded",
      ssBlocked: "Playback was blocked — press Play again",
      ssCheckFile: "Check the selected MP4 file",
      theme: "Theme",
      themePickTitle: "Choose a color theme",
      themePickHint: "Light & dark themes — switch anytime",
      lightModes: "Light modes",
      darkModes: "Dark modes",
      themeLatte: "Latte",
      themeLatteDesc: "Warm coffee",
      themeRice: "Rice Paper",
      themeRiceDesc: "Blush & sky",
      themeSunny: "Sunny Cream",
      themeSunnyDesc: "Cream & tomato red",
      themeBlush: "Blush Meadow",
      themeBlushDesc: "Sakura & pine green",
      themeTaro: "Taro Latte",
      themeTaroDesc: "Taro & caramel",
      themeNeon: "Neon Trio",
      themeNeonDesc: "Neon purple & blue",
      themeSpring: "Spring Field",
      themeSpringDesc: "Mint & forest green",
      themeLime: "Midnight Lime",
      themeLimeDesc: "Navy & lime",
      themeKlein: "Klein Blue",
      themeKleinDesc: "Electric blue & orange",
      themeScheele: "Scheele Green",
      themeScheeleDesc: "Ink black & green",
      themeHermes: "Hermès Orange",
      themeHermesDesc: "Ink black & orange",
      themePrada: "Prada Blue",
      themePradaDesc: "Ink black & blue",
      themePeacock: "Peacock",
      themePeacockDesc: "Ink black & teal",
      themeGucci: "Gucci Green",
      themeGucciDesc: "Deep green & apricot",
      tipTitle: "New: color themes",
      tipText: "Pick from a range of light and dark themes here — your choice is remembered.",
      tipGotIt: "Got it",
    },
  };

  const THEMES = {
    // light
    latte: { mode: "light", color: "#efe3d1", preview: "preview-latte" },
    ricepaper: { mode: "light", color: "#f0ece4", preview: "preview-ricepaper" },
    sunnycream: { mode: "light", color: "#fffdf0", preview: "preview-sunnycream" },
    blushmeadow: { mode: "light", color: "#fff3ef", preview: "preview-blushmeadow" },
    tarolatte: { mode: "light", color: "#f3ede6", preview: "preview-tarolatte" },
    neon: { mode: "light", color: "#f6f7fb", preview: "preview-neon" },
    springfield: { mode: "light", color: "#f0fae6", preview: "preview-springfield" },
    // dark
    lime: { mode: "dark", color: "#0c0f14", preview: "preview-lime" },
    klein: { mode: "dark", color: "#06080d", preview: "preview-klein" },
    scheele: { mode: "dark", color: "#070a06", preview: "preview-scheele" },
    hermes: { mode: "dark", color: "#0a0908", preview: "preview-hermes" },
    prada: { mode: "dark", color: "#06080b", preview: "preview-prada" },
    peacock: { mode: "dark", color: "#05090a", preview: "preview-peacock" },
    gucci: { mode: "dark", color: "#13271d", preview: "preview-gucci" },
  };
  const DEFAULT_THEME = "lime";

  const store = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* private mode / file:// */ }
    },
  };

  let lang = "zh";

  const t = (key, vars) => {
    let str = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
    if (vars) {
      for (const name in vars) {
        str = str.replace(new RegExp("\\{" + name + "\\}", "g"), vars[name]);
      }
    }
    return str;
  };

  const applyStaticText = (root) => {
    (root || document).querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
  };

  /* ------------------------------------------------------------------ */
  /*  Element references                                                */
  /* ------------------------------------------------------------------ */
  const sectionList = document.querySelector("#sections");
  const sectionTemplate = document.querySelector("#section-template");
  const sectionCount = document.querySelector("#section-count");
  const sessionState = document.querySelector("#session-state");
  const sessionStateLabel = document.querySelector("#session-state-label");
  const masterVolume = document.querySelector("#master-volume");
  const masterVolumeValue = document.querySelector("#master-volume-value");
  const addSectionButton = document.querySelector("#add-section");
  const playAllButton = document.querySelector("#play-all");
  const pauseAllButton = document.querySelector("#pause-all");
  const stopAllButton = document.querySelector("#stop-all");
  const loopAllButton = document.querySelector("#loop-all");
  const langToggle = document.querySelector("#lang-toggle");
  const themeTrigger = document.querySelector("#theme-trigger");
  const themePanel = document.querySelector("#theme-panel");
  const themeSwatch = document.querySelector("#theme-swatch");
  const themeOptions = [...document.querySelectorAll(".theme-option")];
  const themeTip = document.querySelector("#theme-tip");
  const themeTipDismiss = document.querySelector("#theme-tip-dismiss");

  let nextSectionId = 1;
  let loopEnabled = false;
  const sections = new Map();

  const formatNumber = (number) => String(number).padStart(2, "0");

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainder = totalSeconds % 60;
    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  };

  const getVideoElements = () => [...sectionList.querySelectorAll("video")];

  const updateSessionState = (state, key, vars) => {
    sessionState.className = `session-state is-${state}`;
    sessionState.dataset.stateKey = key;
    sessionState.dataset.stateVars = vars ? JSON.stringify(vars) : "";
    // Dynamic messages own this label now — drop the static i18n hook so a
    // later language switch re-renders via refreshSessionStateText instead.
    sessionStateLabel.removeAttribute("data-i18n");
    sessionStateLabel.textContent = t(key, vars);
  };

  const refreshSessionStateText = () => {
    const key = sessionState.dataset.stateKey;
    if (!key) return;
    let vars;
    try { vars = sessionState.dataset.stateVars ? JSON.parse(sessionState.dataset.stateVars) : undefined; } catch (e) { vars = undefined; }
    sessionStateLabel.textContent = t(key, vars);
  };

  const updateCount = () => {
    sectionCount.textContent = formatNumber(sections.size);
  };

  const updateIndexes = () => {
    [...sectionList.querySelectorAll(".player-card")].forEach((card, index) => {
      const label = formatNumber(index + 1);
      card.querySelector(".section-number").textContent = label;
      card.querySelector("h3").textContent = t("sectionName", { n: label });
      card.querySelector(".remove-section").disabled = sectionList.children.length === 1;
    });
    updateCount();
  };

  const setCardStatus = (section, status, key) => {
    section.statusClass = status;
    section.statusKey = key;
    section.status.className = `card-status ${status}`;
    section.status.querySelector(".status-label").textContent = t(key);
  };

  const renderMeta = (section) => {
    switch (section.metaState) {
      case "reading":
        section.meta.textContent = t("metaReading", { size: section.fileSizeMB });
        break;
      case "ready":
        section.meta.textContent = `${formatTime(section.durationSec)} · ${section.vw} × ${section.vh}`;
        break;
      case "cantPlay":
        section.meta.textContent = t("metaCantPlay");
        break;
      case "mp4Only":
        section.meta.textContent = t("metaMp4Only");
        break;
      default:
        section.meta.textContent = t("metaWaiting");
    }
  };

  const renderFileName = (section) => {
    section.name.textContent = section.file ? section.file.name : t("fileNone");
  };

  const refreshSectionText = (section) => {
    renderFileName(section);
    renderMeta(section);
    if (section.statusKey) {
      section.status.querySelector(".status-label").textContent = t(section.statusKey);
    }
    const dup = section.card.querySelector(".duplicate-section");
    const rem = section.card.querySelector(".remove-section");
    dup.title = t("duplicateTitle");
    dup.setAttribute("aria-label", t("duplicateTitle"));
    rem.title = t("removeTitle");
    rem.setAttribute("aria-label", t("removeTitle"));
  };

  const getLoadedCount = () => [...sections.values()].filter((section) => section.file).length;

  const updatePlaybackStatuses = () => {
    const loadedCount = getLoadedCount();
    const videos = getVideoElements();
    if (videos.some((video) => !video.paused && !video.ended)) {
      updateSessionState("playing", "ssPlaying", { n: loadedCount, m: sections.size });
    } else if (videos.some((video) => video.currentTime > 0 && video.paused)) {
      updateSessionState("paused", "ssPaused");
    } else if (loadedCount > 0) {
      updateSessionState("ready", loadedCount === 1 ? "ssLoadedOne" : "ssLoadedMany", { n: loadedCount });
    } else {
      updateSessionState("idle", "ssAddToBegin");
    }
  };

  const bindVideoEvents = (section) => {
    section.video.addEventListener("play", () => {
      setCardStatus(section, "is-playing", "statPlaying");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("pause", () => {
      if (section.file && !section.video.ended) setCardStatus(section, "is-paused", "statPaused");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("ended", () => {
      setCardStatus(section, "is-ready", "statEnded");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("timeupdate", () => {
      section.time.textContent = formatTime(section.video.currentTime);
    });

    section.video.addEventListener("loadedmetadata", () => {
      section.durationSec = section.video.duration;
      section.vw = Math.round(section.video.videoWidth);
      section.vh = Math.round(section.video.videoHeight);
      section.metaState = "ready";
      renderMeta(section);
    });

    section.video.addEventListener("error", () => {
      section.metaState = "cantPlay";
      setCardStatus(section, "is-error", "statError");
      renderMeta(section);
      updateSessionState("idle", "ssCheckFile");
    });
  };

  const loadFile = (section, file) => {
    if (!file) return;
    if (file.type && file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
      section.metaState = "mp4Only";
      setCardStatus(section, "is-error", "statMp4Only");
      renderMeta(section);
      return;
    }

    if (section.objectUrl) URL.revokeObjectURL(section.objectUrl);
    section.file = file;
    section.objectUrl = URL.createObjectURL(file);
    section.video.src = section.objectUrl;
    section.video.loop = loopEnabled;
    section.video.volume = Number(masterVolume.value) / 100;
    section.video.load();
    section.stage.classList.add("has-video");
    section.fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    section.metaState = "reading";
    renderFileName(section);
    renderMeta(section);
    setCardStatus(section, "is-ready", "statReady");
    updatePlaybackStatuses();
  };

  const duplicateSection = (sourceSection) => {
    const duplicate = createSection(sourceSection && sourceSection.file ? sourceSection.file : null);
    duplicate.card.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const removeSection = (section) => {
    if (sections.size <= 1) return;
    if (section.objectUrl) URL.revokeObjectURL(section.objectUrl);
    section.video.pause();
    sections.delete(section.id);
    section.card.remove();
    updateIndexes();
    updatePlaybackStatuses();
  };

  function createSection(file = null) {
    const id = nextSectionId++;
    const card = sectionTemplate.content.firstElementChild.cloneNode(true);
    const section = {
      id,
      card,
      file: null,
      objectUrl: null,
      metaState: "empty",
      fileSizeMB: null,
      durationSec: null,
      vw: null,
      vh: null,
      statusClass: "status-ready",
      statusKey: "statReady",
      video: card.querySelector("video"),
      stage: card.querySelector(".video-stage"),
      name: card.querySelector(".file-name"),
      meta: card.querySelector(".file-meta"),
      time: card.querySelector(".video-time"),
      status: card.querySelector(".card-status"),
    };

    card.dataset.sectionId = id;
    section.video.loop = loopEnabled;
    sectionList.appendChild(card);
    sections.set(id, section);
    bindVideoEvents(section);

    applyStaticText(card);
    setCardStatus(section, "is-ready", "statReady");
    refreshSectionText(section);

    card.querySelectorAll(".file-input").forEach((input) => {
      input.addEventListener("change", (event) => loadFile(section, event.target.files[0]));
    });
    card.querySelector(".duplicate-section").addEventListener("click", () => duplicateSection(section));
    card.querySelector(".remove-section").addEventListener("click", () => removeSection(section));

    [card.querySelector(".video-stage"), card.querySelector(".empty-stage")].forEach((dropTarget) => {
      dropTarget.addEventListener("dragover", (event) => {
        event.preventDefault();
        card.classList.add("is-dragging");
      });
      dropTarget.addEventListener("dragleave", () => card.classList.remove("is-dragging"));
      dropTarget.addEventListener("drop", (event) => {
        event.preventDefault();
        card.classList.remove("is-dragging");
        loadFile(section, event.dataTransfer.files[0]);
      });
    });

    updateIndexes();
    if (file) loadFile(section, file);
    return section;
  }

  const setVolume = (value) => {
    const volume = Number(value) / 100;
    getVideoElements().forEach((video) => { video.volume = volume; });
    masterVolumeValue.textContent = `${value}%`;
  };

  const setLoop = (enabled) => {
    loopEnabled = enabled;
    getVideoElements().forEach((video) => { video.loop = enabled; });
    loopAllButton.classList.toggle("is-active", enabled);
    loopAllButton.setAttribute("aria-checked", String(enabled));
  };

  const playAll = async () => {
    const videos = getVideoElements().filter((video) => video.src);
    if (!videos.length) {
      updateSessionState("idle", "ssAddToBegin");
      return;
    }
    const results = await Promise.allSettled(videos.map((video) => video.play()));
    if (results.some((result) => result.status === "rejected")) {
      updateSessionState("idle", "ssBlocked");
    } else {
      updateSessionState("playing", "ssPlaying", { n: videos.length, m: sections.size });
    }
  };

  const pauseAll = () => {
    getVideoElements().forEach((video) => video.pause());
    updateSessionState("paused", "ssPaused");
  };

  const stopAll = () => {
    getVideoElements().forEach((video) => {
      video.pause();
      try { video.currentTime = 0; } catch (error) { /* metadata may not be ready yet */ }
    });
    sections.forEach((section) => {
      section.time.textContent = "00:00";
      if (section.file) setCardStatus(section, "is-ready", "statReady");
    });
    updateSessionState("ready", getLoadedCount() ? "ssReadyPresent" : "ssAddToBegin");
  };

  /* ------------------------------------------------------------------ */
  /*  Theme + language switching                                        */
  /* ------------------------------------------------------------------ */
  const normalizeTheme = (value) => {
    if (THEMES[value]) return value;
    if (value === "light") return "latte"; // migrate previous stored values
    if (value === "dark") return "lime";
    return DEFAULT_THEME;
  };

  const setTheme = (value) => {
    const theme = normalizeTheme(value);
    const meta = THEMES[theme];
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector('meta[name="theme-color"]').setAttribute("content", meta.color);
    themeSwatch.className = `theme-swatch ${meta.preview}`;
    themeOptions.forEach((opt) => {
      const active = opt.dataset.themeValue === theme;
      opt.classList.toggle("is-active", active);
      opt.setAttribute("aria-checked", String(active));
    });
    store.set("fs-theme", theme);
  };

  const openThemePanel = () => {
    themePanel.hidden = false;
    themeTrigger.setAttribute("aria-expanded", "true");
    dismissTip();
    themeTrigger.classList.remove("is-fresh");
    document.addEventListener("mousedown", onOutsidePanel);
    document.addEventListener("keydown", onPanelKey);
  };

  const closeThemePanel = () => {
    themePanel.hidden = true;
    themeTrigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("mousedown", onOutsidePanel);
    document.removeEventListener("keydown", onPanelKey);
  };

  const toggleThemePanel = () => {
    if (themePanel.hidden) openThemePanel(); else closeThemePanel();
  };

  function onOutsidePanel(event) {
    if (!event.target.closest(".theme-menu")) closeThemePanel();
  }

  function onPanelKey(event) {
    if (event.key === "Escape") {
      closeThemePanel();
      themeTrigger.focus();
    }
  }

  function dismissTip() {
    if (!themeTip.hidden) themeTip.hidden = true;
    store.set("fs-theme-tip", "seen");
  }

  const setLanguage = (next) => {
    lang = next === "en" ? "en" : "zh";
    document.documentElement.lang = lang;
    applyStaticText(document);
    langToggle.querySelectorAll("[data-lang-opt]").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.langOpt === lang);
    });
    updateIndexes();
    sections.forEach(refreshSectionText);
    refreshSessionStateText();
    store.set("fs-lang", lang);
  };

  /* ------------------------------------------------------------------ */
  /*  Wiring                                                            */
  /* ------------------------------------------------------------------ */
  addSectionButton.addEventListener("click", () => duplicateSection([...sections.values()].at(-1)));
  playAllButton.addEventListener("click", playAll);
  pauseAllButton.addEventListener("click", pauseAll);
  stopAllButton.addEventListener("click", stopAll);
  loopAllButton.addEventListener("click", () => setLoop(!loopEnabled));
  masterVolume.addEventListener("input", (event) => setVolume(event.target.value));
  langToggle.addEventListener("click", () => setLanguage(lang === "zh" ? "en" : "zh"));
  themeTrigger.addEventListener("click", toggleThemePanel);
  themeOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      setTheme(opt.dataset.themeValue);
      closeThemePanel();
    });
  });
  themeTipDismiss.addEventListener("click", dismissTip);

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select, button")) return;
    if (event.code === "Space") {
      event.preventDefault();
      const isPlaying = getVideoElements().some((video) => !video.paused && !video.ended);
      if (isPlaying) pauseAll(); else playAll();
    }
    if (event.key.toLowerCase() === "r") stopAll();
    if (event.key.toLowerCase() === "l") setLoop(!loopEnabled);
  });

  window.addEventListener("beforeunload", () => {
    sections.forEach((section) => {
      if (section.objectUrl) URL.revokeObjectURL(section.objectUrl);
    });
  });

  /* ------------------------------------------------------------------ */
  /*  Init                                                              */
  /* ------------------------------------------------------------------ */
  setTheme(store.get("fs-theme"));
  setLanguage(store.get("fs-lang") === "en" ? "en" : "zh");
  setVolume(masterVolume.value);
  createSection();

  // First-time users: surface the new theme picker with a one-time hint.
  if (store.get("fs-theme-tip") !== "seen") {
    themeTip.hidden = false;
    themeTrigger.classList.add("is-fresh");
  }
})();
