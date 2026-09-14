/* ============================================================
   Tejidos Conectados — Lógica de interfaz
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "tejidos-conectados-lang";
  let currentLang = localStorage.getItem(STORAGE_KEY) || "es";
  const activeFilters = { type: new Set(), region: new Set() };

  const speechLangMap = { es: "es-PE", qu: "es-PE", ay: "es-PE" };

  /* ---------------- Traducción de la interfaz ---------------- */

  function applyTranslations() {
    const dict = TRANSLATIONS[currentLang];
    document.documentElement.lang = currentLang === "es" ? "es" : "es";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
    document.getElementById("currentLangLabel").textContent = dict.langName;
    renderFilters();
    renderProducts();
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
      const name = p.name[currentLang] || p.name.es;
      const region = REGION_LABELS[currentLang][p.region];
      const waMsg = encodeURIComponent(`Hola ${p.seller}, me interesa tu producto "${name}" que vi en Tejidos Conectados.`);
      return `
        <article class="product-card">
          <div class="product-card__img-wrap">
            <img src="${p.image}" alt="${name}" loading="lazy">
          </div>
          <div class="product-card__body">
            <p class="product-card__name">
              ${name}
              <button class="speaker-btn" data-speak-text="${name}" aria-label="${dict.audio_playing}">🔊</button>
            </p>
            <p class="product-card__price">S/ ${p.price.toFixed(2)}</p>
            <p class="product-card__meta">🏘️ ${region} · ${p.seller}</p>
            <div class="product-card__actions">
              <a class="action-btn action-btn--call" href="tel:${p.phone}">☎️ ${dict.btn_call}</a>
              <a class="action-btn action-btn--whatsapp" href="https://wa.me/${p.phone.replace("+", "")}?text=${waMsg}" target="_blank" rel="noopener">💬 ${dict.btn_whatsapp}</a>
            </div>
          </div>
        </article>`;
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

  /* ---------------- Inicio ---------------- */

  applyTranslations();
})();
