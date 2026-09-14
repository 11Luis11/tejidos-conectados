# Tejidos Conectados — Mercado Virtual Andino

Sitio web mobile-first, multiidioma (Español / Quechua / Aymara) para conectar artesanos andinos con compradores, sin pasarela de pago: el contacto es directo por llamada o WhatsApp.

## Estructura de archivos

```
tejidos-conectados/
├── index.html          ← página principal (todo el contenido y secciones)
├── css/
│   └── styles.css      ← estilos, paleta de colores y diseño responsive
├── js/
│   ├── translations.js ← textos en Español, Quechua y Aymara
│   ├── products.js     ← catálogo de productos de ejemplo (reemplázalo por tu BD)
│   └── main.js         ← interactividad: idiomas, audio, filtros, modales
└── assets/             ← aquí van tus imágenes/videos propios
```

Es un sitio 100% estático (HTML/CSS/JS puro), sin dependencias ni instalación de paquetes — funciona con solo abrir `index.html`.

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

## Qué falta personalizar antes de publicar

- **Video introductorio**: agrega tu archivo `.mp4` en `assets/` y descoméntalo en `index.html` (`<source src="assets/video-intro.mp4">`).
- **Productos reales**: edita `js/products.js` — cada producto tiene nombre en los 3 idiomas, precio, tipo, región, vendedor, teléfono e imagen.
- **Números de WhatsApp/teléfono**: reemplaza `+51999999999` en `index.html` (footer, botón flotante y modal de vendedor) por tus números reales.
- **Textos en Quechua y Aymara**: las traducciones incluidas son un punto de partida; te recomendamos que un hablante nativo las revise antes de publicar.
- **Lector de voz**: usa la API `SpeechSynthesis` del navegador (no requiere configuración adicional), pero su cobertura de quechua/aymara depende de las voces instaladas en el dispositivo del usuario — para mayor calidad, puedes reemplazarlo más adelante por audios grabados.

## Notas técnicas

- Diseño mobile-first, botones ≥44px, tipografía ≥16px, alto contraste (checklist de accesibilidad del brief).
- Sin pasarela de pago: cada producto tiene botones directos de **Llamar** y **WhatsApp**.
- El idioma elegido se guarda en el navegador (`localStorage`) para la próxima visita.
- Imágenes de ejemplo cargadas desde Unsplash — reemplázalas por fotos reales de los productos.
