/* ============================================================
   Tejidos Conectados — Librería de íconos (SVG en línea)
   Íconos vectoriales de trazo simple, se colorean con currentColor
   para adaptarse a cualquier fondo o paleta.
   ============================================================ */

const ICONS = {
  logo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>`,

  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.8 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.8-3.8-9s1.3-6.4 3.8-9Z"/></svg>`,

  help: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.3 9a2.8 2.8 0 0 1 5.4.9c0 1.9-2.7 2.1-2.7 4"/><circle cx="12" cy="17" r="0.3" fill="currentColor"/></svg>`,

  volume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19 6a8.5 8.5 0 0 1 0 12"/></svg>`,

  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5-11-6.5Z"/></svg>`,

  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`,

  smartphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>`,

  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5h3.4l1.6 4.4-2.2 1.9a12.5 12.5 0 0 0 6.9 6.9l1.9-2.2 4.4 1.6v3.4a1.5 1.5 0 0 1-1.6 1.5A17.5 17.5 0 0 1 3 5.1a1.5 1.5 0 0 1 1.5-1.6Z"/></svg>`,

  truck: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1.5" y="7" width="13" height="10"/><path d="M14.5 10h4l3.5 3.5V17h-7.5"/><circle cx="6" cy="18.5" r="1.7"/><circle cx="17.5" cy="18.5" r="1.7"/></svg>`,

  chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.6A7.9 7.9 0 0 1 4 12Z"/></svg>`,

  mapPin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.6 7-11.5a7 7 0 0 0-14 0C5 14.4 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,

  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.7"/><path d="m21 16-5.5-5.5L4 21"/></svg>`,

  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5.5" width="14" height="13" rx="2"/><path d="M16.5 10.5 21 7.5v9l-4.5-3Z"/></svg>`,

  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4"/><path d="m7 8.5 5-5 5 5"/><path d="M4.5 15.5v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3"/></svg>`,

  pencil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 4.5 4 4L8 20H4v-4L15.5 4.5Z"/></svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5l14 14M19 5 5 19"/></svg>`,

  reset: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.6 6.1"/><path d="M3.5 17.5v-5h5"/></svg>`,

  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5.5 5.5L20 6.5"/></svg>`,

  quote: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 6c-3 1-5 3.6-5 7.2 0 2.6 1.7 4.3 3.8 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3.1.2-1.8 1.5-3.3 3.2-4.1L9.5 6Zm9 0c-3 1-5 3.6-5 7.2 0 2.6 1.7 4.3 3.8 4.3 1.9 0 3.3-1.4 3.3-3.2 0-1.7-1.2-3-2.8-3.1.2-1.8 1.5-3.3 3.2-4.1L18.5 6Z"/></svg>`,

  layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>`,

  type: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5h14M12 5.5V19"/><path d="M9 19h6"/></svg>`,
};

/* Inserta el SVG correspondiente en cada elemento con [data-icon] */
function paintIcons(root) {
  (root || document).querySelectorAll("[data-icon]").forEach((el) => {
    const name = el.getAttribute("data-icon");
    if (ICONS[name] && !el.dataset.iconPainted) {
      el.innerHTML = ICONS[name];
      el.dataset.iconPainted = "1";
    }
  });
}
