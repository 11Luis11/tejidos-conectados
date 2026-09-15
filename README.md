# Tejidos Conectados — Mercado Virtual Andino

Sitio web mobile-first, multiidioma (Español / Quechua / Aymara) para conectar artesanos andinos con compradores, sin pasarela de pago: el contacto es directo por llamada o WhatsApp.

Incluye un **panel de edición en vivo** (botón "✏️ Editar sitio") para cambiar fondos, imágenes, video y textos sin tocar código.

## Estructura de archivos

```
tejidos-conectados/
├── index.html          ← página principal (todo el contenido y secciones)
├── css/
│   └── styles.css      ← estilos, paleta de colores, íconos y diseño responsive
├── js/
│   ├── translations.js ← textos y testimonios en Español, Quechua y Aymara
│   ├── products.js     ← catálogo de productos de ejemplo (reemplázalo por tu BD)
│   ├── icons.js        ← librería de íconos SVG usados en todo el sitio
│   ├── editor.js       ← panel de edición en vivo (fondos, imágenes, video, textos)
│   └── main.js         ← interactividad: idiomas, audio, filtros, modales
└── assets/             ← ilustraciones propias del sitio (fondos, video, productos)
```

Es un sitio 100% estático (HTML/CSS/JS puro), sin dependencias ni instalación de paquetes — funciona con solo abrir `index.html`.

## Sobre las imágenes

Los fondos de cada sección, la miniatura del video y las fotos de los 8 productos de ejemplo son **ilustraciones vectoriales (.svg) propias**, dibujadas en la carpeta `assets/`. Se eligió este camino en vez de fotos de stock para que el sitio se vea terminado y consistente desde el primer momento, sin depender de enlaces externos que puedan romperse. Reemplázalas cuando tengas fotos reales de los productos y las comunidades — el panel de edición (ver abajo) te deja probarlo al instante.

## ✏️ Panel de edición en vivo

Al abrir el sitio verás un botón flotante **"Editar sitio"** abajo a la izquierda. Al activarlo:

- **Fondos de sección**: botones "Cambiar fondo" sobre Portada, Cómo funciona, Quiénes somos y Contacto para subir tu propia foto.
- **Video de portada**: sube tu propio archivo de video (reemplaza el video de ejemplo) y cambia la miniatura que se ve antes de reproducirlo.
- **Fotos de productos**: pasa el mouse sobre la foto de cualquier producto y haz clic en el ícono de lápiz para cambiarla.
- **Textos**: con el modo edición activo, cualquier texto de la página queda resaltado; haz clic sobre él y escribe el tuyo directamente. Cambia de idioma (botón 🌐 arriba) para editar cada versión (Español / Quechua / Aymara) por separado.
- **Restablecer todo**: botón al final del panel para quitar todos los cambios y volver a los valores originales.

**Importante — dónde se guardan los cambios:** como el sitio es estático (sin servidor ni base de datos), estos cambios se guardan **en el navegador y dispositivo donde los hiciste** (imágenes y video en IndexedDB, textos en localStorage). Son perfectos para:
- Probar cómo se vería el sitio con tu contenido antes de decidir el diseño final.
- Usarlos en una demo o presentación desde tu propia laptop/celular.

Pero **no se comparten automáticamente con otros visitantes** de tu sitio publicado. Para que un cambio sea visible para todo el mundo, debes incorporarlo al código (ver la sección siguiente) y volver a publicar.

## Cómo abrirlo en Visual Studio / VS Code

1. Clona tu repositorio:
   ```
   git clone https://github.com/11Luis11/tejidos-conectados.git
   cd tejidos-conectados
   ```
2. Copia estos archivos dentro de la carpeta del repositorio (reemplazando lo que ya exista).
3. Ábrelo con `code .` o desde Visual Studio Code: **Archivo → Abrir carpeta**.
4. Instala la extensión **Live Server** (o similar) y haz clic en "Go Live" para verlo en el navegador con recarga automática.
5. Para publicarlo gratis, puedes activar **GitHub Pages** en la configuración del repositorio (Settings → Pages → rama `main`, carpeta `/root`).

## Qué falta personalizar antes de publicar (para que todos lo vean igual)

- **Video introductorio**: usa el panel de edición para previsualizarlo, y para que quede permanente agrega tu archivo `.mp4` en `assets/` y descoméntalo en `index.html` (`<source src="assets/video-intro.mp4">`).
- **Fondos de sección**: si te gusta un fondo que subiste con el panel, reemplaza la URL correspondiente en `index.html` (busca `section-bg-media`, hay una por sección) por tu imagen ya subida a `assets/`.
- **Productos reales**: edita `js/products.js` — cada producto tiene nombre en los 3 idiomas, precio, tipo, región, vendedor, teléfono e imagen.
- **Números de WhatsApp/teléfono**: reemplaza `+51999999999` en `index.html` (footer, botón flotante y modal de vendedor) por tus números reales.
- **Textos en Quechua y Aymara**: las traducciones incluidas (interfaz y testimonios) son un punto de partida; te recomendamos que un hablante nativo las revise antes de publicar.
- **Lector de voz**: usa la API `SpeechSynthesis` del navegador (no requiere configuración adicional), pero su cobertura de quechua/aymara depende de las voces instaladas en el dispositivo del usuario — para mayor calidad, puedes reemplazarlo más adelante por audios grabados.

## Notas técnicas

- Diseño mobile-first, botones ≥44px, tipografía ≥16px, alto contraste (checklist de accesibilidad del brief).
- Íconos vectoriales (SVG) en toda la interfaz en lugar de emojis, para verse igual en cualquier dispositivo.
- Sin pasarela de pago: cada producto tiene botones directos de **Llamar** y **WhatsApp**.
- El idioma elegido se guarda en el navegador (`localStorage`) para la próxima visita.
- Imágenes de ejemplo (productos y fondos) ilustradas a mano en formato SVG — reemplázalas por fotos reales cuando publiques.
- Tipografía: **Fraunces** (serif editorial, con eje óptico e itálica real) para títulos y citas, **Nunito Sans** para el resto — jerarquía de tamaños definida (`h1`/`h2`/`h3`) y un remate de "hilo tejido" (mismo motivo del logo) bajo cada título de sección.
