(() => {
  "use strict";

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

  let nextSectionId = 1;
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

  const updateSessionState = (state, message) => {
    sessionState.className = `session-state is-${state}`;
    sessionStateLabel.textContent = message;
  };

  const updateCount = () => {
    const count = sections.size;
    sectionCount.textContent = formatNumber(count);
  };

  const updateIndexes = () => {
    [...sectionList.querySelectorAll(".player-card")].forEach((card, index) => {
      const label = formatNumber(index + 1);
      card.querySelector(".section-number").textContent = label;
      card.querySelector("h3").textContent = `Playing section ${label}`;
      card.querySelector(".remove-section").disabled = sectionList.children.length === 1;
    });
    updateCount();
  };

  const setCardStatus = (section, status, label) => {
    section.status.className = `card-status ${status}`;
    section.status.querySelector(".status-label").textContent = label;
  };

  const getLoadedCount = () => [...sections.values()].filter((section) => section.file).length;

  const updatePlaybackStatuses = () => {
    const loadedCount = getLoadedCount();
    const videos = getVideoElements();
    if (videos.some((video) => !video.paused && !video.ended)) {
      updateSessionState("playing", `Playing ${loadedCount} of ${sections.size} sections`);
    } else if (videos.some((video) => video.currentTime > 0 && video.paused)) {
      updateSessionState("paused", "Playback paused");
    } else if (loadedCount > 0) {
      updateSessionState("ready", `${loadedCount} section${loadedCount === 1 ? "" : "s"} loaded`);
    } else {
      updateSessionState("idle", "Add a local MP4 to begin");
    }
  };

  const bindVideoEvents = (section) => {
    section.video.addEventListener("play", () => {
      setCardStatus(section, "is-playing", "Playing");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("pause", () => {
      if (section.file && !section.video.ended) setCardStatus(section, "is-paused", "Paused");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("ended", () => {
      setCardStatus(section, "is-ready", "Ended");
      updatePlaybackStatuses();
    });

    section.video.addEventListener("timeupdate", () => {
      section.time.textContent = formatTime(section.video.currentTime);
    });

    section.video.addEventListener("loadedmetadata", () => {
      const duration = formatTime(section.video.duration);
      section.meta.textContent = `${duration} · ${Math.round(section.video.videoWidth)} × ${Math.round(section.video.videoHeight)}`;
    });

    section.video.addEventListener("error", () => {
      setCardStatus(section, "is-error", "File error");
      section.meta.textContent = "This file could not be played in the browser";
      updateSessionState("idle", "Check the selected MP4 file");
    });
  };

  const loadFile = (section, file) => {
    if (!file) return;
    if (file.type && file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
      setCardStatus(section, "is-error", "MP4 only");
      section.meta.textContent = "Please choose a file with the .mp4 extension";
      return;
    }

    if (section.objectUrl) URL.revokeObjectURL(section.objectUrl);
    section.file = file;
    section.objectUrl = URL.createObjectURL(file);
    section.video.src = section.objectUrl;
    section.video.volume = Number(masterVolume.value) / 100;
    section.video.load();
    section.stage.classList.add("has-video");
    section.name.textContent = file.name;
    section.meta.textContent = `${(file.size / (1024 * 1024)).toFixed(1)} MB · reading metadata…`;
    setCardStatus(section, "is-ready", "Ready");
    updatePlaybackStatuses();
  };

  const duplicateSection = (sourceSection) => {
    const duplicate = createSection(sourceSection?.file || null);
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
      video: card.querySelector("video"),
      stage: card.querySelector(".video-stage"),
      name: card.querySelector(".file-name"),
      meta: card.querySelector(".file-meta"),
      time: card.querySelector(".video-time"),
      status: card.querySelector(".card-status"),
    };

    card.dataset.sectionId = id;
    sectionList.appendChild(card);
    sections.set(id, section);
    bindVideoEvents(section);

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

  const playAll = async () => {
    const videos = getVideoElements().filter((video) => video.src);
    if (!videos.length) {
      updateSessionState("idle", "Add a local MP4 to begin");
      return;
    }
    const results = await Promise.allSettled(videos.map((video) => video.play()));
    if (results.some((result) => result.status === "rejected")) {
      updateSessionState("idle", "Playback was blocked — press Play again");
    } else {
      updateSessionState("playing", `Playing ${videos.length} of ${sections.size} sections`);
    }
  };

  const pauseAll = () => {
    getVideoElements().forEach((video) => video.pause());
    updateSessionState("paused", "Playback paused");
  };

  const stopAll = () => {
    getVideoElements().forEach((video) => {
      video.pause();
      try { video.currentTime = 0; } catch (error) { /* metadata may not be ready yet */ }
    });
    sections.forEach((section) => {
      section.time.textContent = "00:00";
      if (section.file) setCardStatus(section, "is-ready", "Ready");
    });
    updateSessionState("ready", getLoadedCount() ? "Ready to present" : "Add a local MP4 to begin");
  };

  addSectionButton.addEventListener("click", () => duplicateSection([...sections.values()].at(-1)));
  playAllButton.addEventListener("click", playAll);
  pauseAllButton.addEventListener("click", pauseAll);
  stopAllButton.addEventListener("click", stopAll);
  masterVolume.addEventListener("input", (event) => setVolume(event.target.value));

  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea, select, button")) return;
    if (event.code === "Space") {
      event.preventDefault();
      const isPlaying = getVideoElements().some((video) => !video.paused && !video.ended);
      if (isPlaying) pauseAll(); else playAll();
    }
    if (event.key.toLowerCase() === "r") stopAll();
  });

  window.addEventListener("beforeunload", () => {
    sections.forEach((section) => {
      if (section.objectUrl) URL.revokeObjectURL(section.objectUrl);
    });
  });

  setVolume(masterVolume.value);
  createSection();
})();
