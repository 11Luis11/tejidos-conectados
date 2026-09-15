/* ============================================================
   Tejidos Conectados — Lógica de interfaz
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "tejidos-conectados-lang";
  const TEXT_OV_KEY = "tc_text_overrides";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "es";
  const activeFilters = { type: new Set(), region: new Set() };

  const speechLangMap = { es: "es-PE", qu: "es-PE", ay: "es-PE" };

  /* ---------------- Textos personalizados (localStorage) ---------------- */

  function loadTextOverrides() {
    try { return JSON.parse(localStorage.getItem(TEXT_OV_KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function getOverride(scope) {
    const ov = loadTextOverrides();
    return Object.prototype.hasOwnProperty.call(ov, scope) ? ov[scope] : null;
  }
  function setOverride(scope, value) {
    const ov = loadTextOverrides();
    ov[scope] = value;
    localStorage.setItem(TEXT_OV_KEY, JSON.stringify(ov));
  }
  function clearAllTextOverrides() {
    localStorage.removeItem(TEXT_OV_KEY);
  }
  window.TC_setTextOverride = setOverride;
  window.TC_clearTextOverrides = clearAllTextOverrides;

  /* ---------------- Traducción de la interfaz ---------------- */

  function applyTranslations() {
    const dict = TRANSLATIONS[currentLang];
    document.documentElement.lang = "es";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const scope = `i18n:${currentLang}:${key}`;
      el.dataset.i18nScope = scope;
      if (document.activeElement === el) return; // no pisar mientras se edita
      const custom = getOverride(scope);
      const text = custom != null ? custom : dict[key];
      if (text != null) el.textContent = text;
    });
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
    document.getElementById("currentLangLabel").textContent = dict.langName;
    renderFilters();
    renderProducts();
    renderTestimonials();
    if (typeof paintIcons === "function") paintIcons();
    if (window.TC_setEditableTextState && document.body.classList.contains("edit-mode")) {
      window.TC_setEditableTextState(true);
    }
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    closeLangPanel();
  }

  /* ---------------- Selector de idioma ---------------- */

  const langMenu = document.getElementById("langMenu");
  const langPanel = document.getElementById("langPanel");
  const langToggle = document.getElementById("langToggle");

  function openLangPanel() { langPanel.classList.add("open"); langToggle.setAttribute("aria-expanded", "true"); }
  function closeLangPanel() { langPanel.classList.remove("open"); langToggle.setAttribute("aria-expanded", "false"); }
  function toggleLangPanel() { langPanel.classList.contains("open") ? closeLangPanel() : openLangPanel(); }

  langToggle.addEventListener("click", (e) => { e.stopPropagation(); toggleLangPanel(); });
  document.querySelectorAll(".lang-option").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  document.addEventListener("click", (e) => {
    if (!langMenu.contains(e.target)) closeLangPanel();
  });

  /* ---------------- Lector de texto (altavoz) ---------------- */

  let currentUtterance = null;

  function speakText(text, btn) {
    if (!("speechSynthesis" in window)) {
      alert("Tu navegador no permite lectura en voz alta.");
      return;
    }
    window.speechSynthesis.cancel();
    document.querySelectorAll(".speaker-btn.playing").forEach((b) => b.classList.remove("playing"));

    currentUtterance = new SpeechSynthesisUtterance(text);
    currentUtterance.lang = speechLangMap[currentLang] || "es-PE";
    currentUtterance.rate = 0.95;
    btn.classList.add("playing");
    currentUtterance.onend = () => btn.classList.remove("playing");
    currentUtterance.onerror = () => btn.classList.remove("playing");
    window.speechSynthesis.speak(currentUtterance);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".speaker-btn");
    if (!btn) return;
    const targetSel = btn.getAttribute("data-speak-target");
    const text = targetSel ? document.querySelector(targetSel)?.textContent : btn.getAttribute("data-speak-text");
    if (text) speakText(text.trim(), btn);
  });

  /* ---------------- Video introductorio ---------------- */

  const playBtn = document.getElementById("playVideoBtn");
  const videoFrame = document.getElementById("videoFrame");
  const videoEl = document.getElementById("introVideo");

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      videoFrame.querySelector(".video-thumb").style.display = "none";
      playBtn.style.display = "none";
      videoEl.style.display = "block";
      videoEl.play().catch(() => {
        /* Si no hay archivo de video cargado aún, no interrumpe la demo */
      });
    });
  }

  /* ---------------- Filtros ---------------- */

  function renderFilters() {
    const dict = TRANSLATIONS[currentLang];
    const typeRow = document.getElementById("typeFilterRow");
    const regionRow = document.getElementById("regionFilterRow");

    typeRow.innerHTML = FILTER_TYPES.map((t) => chipHTML(t, "type", TYPE_LABELS[currentLang][t])).join("");
    regionRow.innerHTML = FILTER_REGIONS.map((r) => chipHTML(r, "region", REGION_LABELS[currentLang][r])).join("");

    document.getElementById("filtersTitle").textContent = dict.filters_title;
    document.getElementById("filterTypeLabel").textContent = dict.filter_type_label;
    document.getElementById("filterRegionLabel").textContent = dict.filter_region_label;

    typeRow.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", onChipClick));
    regionRow.querySelectorAll(".chip").forEach((chip) => chip.addEventListener("click", onChipClick));
  }

  function chipHTML(value, group, label) {
    const count = PRODUCTS.filter((p) => (group === "type" ? p.type === value : p.region === value)).length;
    const active = activeFilters[group].has(value);
    return `<button class="chip${active ? " active" : ""}" data-group="${group}" data-value="${value}">
      ${label} <span class="chip__count">(${count})</span>
    </button>`;
  }

  function onChipClick(e) {
    const chip = e.currentTarget;
    const group = chip.dataset.group;
    const value = chip.dataset.value;
    if (activeFilters[group].has(value)) activeFilters[group].delete(value);
    else activeFilters[group].add(value);
    renderFilters();
    renderProducts();
  }

  /* ---------------- Productos ---------------- */

  function filteredProducts() {
    return PRODUCTS.filter((p) => {
      const typeOk = activeFilters.type.size === 0 || activeFilters.type.has(p.type);
      const regionOk = activeFilters.region.size === 0 || activeFilters.region.has(p.region);
      return typeOk && regionOk;
    });
  }

  function renderProducts() {
    const dict = TRANSLATIONS[currentLang];
    const grid = document.getElementById("productGrid");
    const list = filteredProducts();

    document.getElementById("productsCount").textContent = `${list.length} ${dict.products_count_suffix}`;

    grid.innerHTML = list.map((p) => {
      const nameScope = `product:${p.id}:name:${currentLang}`;
      const name = getOverride(nameScope) ?? (p.name[currentLang] || p.name.es);
      const region = REGION_LABELS[currentLang][p.region];
      const imgKey = `image:product:${p.id}`;
      const customImg = (window.TC_MEDIA && window.TC_MEDIA[imgKey]) || null;
      const imgSrc = customImg || p.image;
      const waMsg = encodeURIComponent(`Hola ${p.seller}, me interesa tu producto "${name}" que vi en Tejidos Conectados.`);
      const hasIcons = typeof ICONS !== "undefined";
      const iconVolume = hasIcons ? ICONS.volume : "";
      const iconPin = hasIcons ? ICONS.mapPin : "";
      const iconPhone = hasIcons ? ICONS.phone : "";
      const iconChat = hasIcons ? ICONS.chat : "";
      const iconPencil = hasIcons ? ICONS.pencil : "";
      const iconReset = hasIcons ? ICONS.reset : "";
      return `
        <article class="product-card">
          <div class="product-card__img-wrap">
            <img src="${imgSrc}" alt="${name}" loading="lazy">
            <button class="img-edit-btn edit-mode-only" data-media-pick="${imgKey}" aria-label="Cambiar foto">${iconPencil}</button>
            <button class="img-reset-btn edit-mode-only" data-media-reset="${imgKey}" style="display:${customImg ? "" : "none"}" aria-label="Quitar foto propia">${iconReset}</button>
          </div>
          <div class="product-card__body">
            <p class="product-card__name">
              <span data-editable-text="${nameScope}">${name}</span>
              <button class="speaker-btn" data-speak-text="${name}" aria-label="${dict.audio_playing}">${iconVolume}</button>
            </p>
            <p class="product-card__price">S/ ${p.price.toFixed(2)}</p>
            <p class="product-card__meta">${iconPin} ${region} · ${p.seller}</p>
            <div class="product-card__actions">
              <a class="action-btn action-btn--call" href="tel:${p.phone}">${iconPhone} ${dict.btn_call}</a>
              <a class="action-btn action-btn--whatsapp" href="https://wa.me/${p.phone.replace("+", "")}?text=${waMsg}" target="_blank" rel="noopener">${iconChat} ${dict.btn_whatsapp}</a>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------------- Testimonios ---------------- */

  function renderTestimonials() {
    const grid = document.getElementById("testimonialsGrid");
    if (!grid || typeof TESTIMONIALS === "undefined") return;
    const iconQuote = typeof ICONS !== "undefined" ? ICONS.quote : "";
    grid.innerHTML = TESTIMONIALS.map((t) => {
      const quoteScope = `testimonial:${t.id}:quote:${currentLang}`;
      const quote = getOverride(quoteScope) ?? (t.quote[currentLang] || t.quote.es);
      const place = t.place[currentLang] || t.place.es;
      return `
        <div class="testimonial-card">
          <span class="testimonial-card__icon" aria-hidden="true">${iconQuote}</span>
          <p class="testimonial-card__quote" data-editable-text="${quoteScope}">${quote}</p>
          <p class="testimonial-card__name">${t.name} · ${place}</p>
        </div>`;
    }).join("");
  }

  /* ---------------- Botón flotante de ayuda ---------------- */

  const helpToggle = document.getElementById("helpFabToggle");
  const helpMenu = document.getElementById("helpFabMenu");

  helpToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    helpMenu.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (!helpMenu.contains(e.target) && e.target !== helpToggle) helpMenu.classList.remove("open");
  });

  /* ---------------- Modal "¿Eres vendedor?" ---------------- */

  const sellerModal = document.getElementById("sellerModal");
  document.getElementById("openSellerModal").addEventListener("click", () => sellerModal.classList.add("open"));
  document.getElementById("closeSellerModal").addEventListener("click", () => sellerModal.classList.remove("open"));
  sellerModal.addEventListener("click", (e) => { if (e.target === sellerModal) sellerModal.classList.remove("open"); });

  /* ---------------- Exponer funciones para el editor ---------------- */

  window.TC = { applyTranslations, renderProducts, renderTestimonials };

  /* ---------------- Inicio ---------------- */

  applyTranslations();
})();
