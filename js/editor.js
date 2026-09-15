/* ============================================================
   Tejidos Conectados — Panel de edición
   Guarda fondos, imágenes y video en IndexedDB (en este navegador)
   y los textos editados en localStorage. No requiere servidor.
   ============================================================ */

(function () {
  "use strict";

  const DB_NAME = "tejidos-conectados-media";
  const STORE = "media";
  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => { req.result.createObjectStore(STORE); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return dbPromise;
  }

  function mediaGet(key) {
    return openDB().then((db) => new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    }));
  }
  function mediaSet(key, blob) {
    return openDB().then((db) => new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    }));
  }
  function mediaDelete(key) {
    return openDB().then((db) => new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(key);
      tx.oncomplete = () => resolve();
    }));
  }
  function mediaKeys() {
    return openDB().then((db) => new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).getAllKeys();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    }));
  }
  function mediaClearAll() {
    return openDB().then((db) => new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
    }));
  }

  window.TC_MEDIA = {}; // key -> object URL (caché en memoria)

  async function loadMediaCache() {
    const keys = await mediaKeys();
    for (const key of keys) {
      const blob = await mediaGet(key);
      if (blob) window.TC_MEDIA[key] = URL.createObjectURL(blob);
    }
  }

  /* ---------------- Aplicar fondos e imágenes personalizadas ---------------- */

  function applyBackgrounds() {
    ["hero", "how", "about", "contact"].forEach((section) => {
      const url = window.TC_MEDIA["bg:" + section];
      const layer = document.getElementById(section + "BgImg");
      if (layer && url) layer.style.backgroundImage = `url("${url}")`;
      refreshResetButtons();
    });
  }

  function applyVideo() {
    const videoUrl = window.TC_MEDIA["video:intro"];
    const posterUrl = window.TC_MEDIA["video:poster"];
    const videoEl = document.getElementById("introVideo");
    const thumbImg = document.querySelector("#videoFrame .video-thumb");

    if (videoUrl && videoEl) {
      videoEl.querySelectorAll("source").forEach((s) => s.remove());
      const source = document.createElement("source");
      source.src = videoUrl;
      source.type = "video/mp4";
      videoEl.appendChild(source);
      videoEl.load();
    }
    if (posterUrl && thumbImg) thumbImg.src = posterUrl;
    refreshResetButtons();
  }

  function refreshResetButtons() {
    document.querySelectorAll("[data-media-reset]").forEach((btn) => {
      const key = btn.getAttribute("data-media-reset");
      btn.style.display = window.TC_MEDIA[key] ? "" : "none";
    });
  }

  /* ---------------- Modo edición ---------------- */

  const editToggleBtn = document.getElementById("editModeToggle");
  const editPanel = document.getElementById("editPanel");

  function setEditableTextState(on) {
    document.querySelectorAll("[data-i18n], [data-editable-text]").forEach((el) => {
      el.contentEditable = on ? "true" : "false";
      el.classList.toggle("tc-editable", on);
    });
  }
  window.TC_setEditableTextState = setEditableTextState;

  function setEditMode(on) {
    document.body.classList.toggle("edit-mode", on);
    editPanel.classList.toggle("open", on);
    if (editToggleBtn) editToggleBtn.setAttribute("aria-pressed", on ? "true" : "false");
    setEditableTextState(on);
    if (on) refreshResetButtons();
  }

  if (editToggleBtn) {
    editToggleBtn.addEventListener("click", () => {
      setEditMode(!document.body.classList.contains("edit-mode"));
    });
  }
  document.getElementById("editPanelClose")?.addEventListener("click", () => setEditMode(false));

  /* ---------------- Subida de imágenes (fondos, video-poster, productos) ---------------- */

  const imageInput = document.getElementById("mediaImageInput");
  let pendingImageKey = null;

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-media-pick]");
    if (!btn) return;
    pendingImageKey = btn.getAttribute("data-media-pick");
    imageInput.click();
  });

  imageInput?.addEventListener("change", async () => {
    const file = imageInput.files[0];
    imageInput.value = "";
    if (!file || !pendingImageKey) return;
    await mediaSet(pendingImageKey, file);
    if (window.TC_MEDIA[pendingImageKey]) URL.revokeObjectURL(window.TC_MEDIA[pendingImageKey]);
    window.TC_MEDIA[pendingImageKey] = URL.createObjectURL(file);

    if (pendingImageKey.startsWith("bg:")) applyBackgrounds();
    else if (pendingImageKey === "video:poster") applyVideo();
    else if (pendingImageKey.startsWith("image:product:")) window.TC?.renderProducts?.();

    refreshResetButtons();
    pendingImageKey = null;
  });

  /* ---------------- Subida de video ---------------- */

  const videoInput = document.getElementById("mediaVideoInput");
  function openVideoPicker() { videoInput.click(); }
  document.getElementById("videoUploadBtn")?.addEventListener("click", openVideoPicker);
  document.getElementById("videoUploadBtnPanel")?.addEventListener("click", openVideoPicker);

  videoInput?.addEventListener("change", async () => {
    const file = videoInput.files[0];
    videoInput.value = "";
    if (!file) return;
    await mediaSet("video:intro", file);
    if (window.TC_MEDIA["video:intro"]) URL.revokeObjectURL(window.TC_MEDIA["video:intro"]);
    window.TC_MEDIA["video:intro"] = URL.createObjectURL(file);
    applyVideo();
    refreshResetButtons();
  });

  /* ---------------- Quitar un elemento personalizado ---------------- */

  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-media-reset]");
    if (!btn) return;
    const key = btn.getAttribute("data-media-reset");
    await mediaDelete(key);
    delete window.TC_MEDIA[key];

    if (key.startsWith("bg:")) {
      const section = key.split(":")[1];
      const layer = document.getElementById(section + "BgImg");
      if (layer) {
        const def = layer.getAttribute("data-default-bg");
        layer.style.backgroundImage = def ? `url("${def}")` : "";
      }
    } else if (key === "video:intro") {
      document.querySelectorAll("#introVideo source").forEach((s) => s.remove());
      document.getElementById("introVideo")?.load();
    } else if (key === "video:poster") {
      const thumbImg = document.querySelector("#videoFrame .video-thumb");
      if (thumbImg) thumbImg.src = thumbImg.getAttribute("data-default-src") || thumbImg.src;
    } else if (key.startsWith("image:product:")) {
      window.TC?.renderProducts?.();
    }
    refreshResetButtons();
  });

  /* ---------------- Restablecer todo ---------------- */

  document.getElementById("resetAllBtn")?.addEventListener("click", async () => {
    const ok = confirm("¿Quitar todos los fondos, imágenes, video y textos personalizados guardados en este navegador?");
    if (!ok) return;
    await mediaClearAll();
    window.TC_clearTextOverrides?.();
    window.location.reload();
  });

  /* ---------------- Guardar textos editados ---------------- */

  document.addEventListener("blur", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (!document.body.classList.contains("edit-mode")) return;
    if (el.hasAttribute("data-i18n")) {
      const scope = el.dataset.i18nScope;
      if (scope) window.TC_setTextOverride?.(scope, el.textContent.trim());
    } else if (el.hasAttribute("data-editable-text")) {
      const scope = el.getAttribute("data-editable-text");
      window.TC_setTextOverride?.(scope, el.textContent.trim());
    }
  }, true);

  document.addEventListener("keydown", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (e.key === "Enter" && (el.hasAttribute("data-i18n") || el.hasAttribute("data-editable-text"))) {
      e.preventDefault();
      el.blur();
    }
  }, true);

  /* ---------------- Inicio ---------------- */

  document.addEventListener("DOMContentLoaded", async () => {
    if (typeof paintIcons === "function") paintIcons();
    await loadMediaCache();
    applyBackgrounds();
    applyVideo();
    window.TC?.renderProducts?.();
    if (typeof paintIcons === "function") paintIcons();
  });
})();
