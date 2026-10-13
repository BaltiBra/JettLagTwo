# JettLag Comics

Sitio estático de JettLag Comics (Pehuajó): comics, mangas y merchandising.
HTML, CSS y JavaScript puros, sin frameworks ni build. Se publica en Vercel:
https://jett-lag-two.vercel.app

## Estructura

```
index.html              Inicio: novedades, flyers e Instagram
pages/
  mangas.html           Listado de mangas
  comics.html           Tapas de comics
  merchadasing.html     Remeras, figuras y accesorios
  contacto.html         Horarios, formulario (WhatsApp) y mapa
css/
  styles.css            Única hoja de estilos (colores y espaciados en :root)
js/
  main.js               Menú para celular
  novedades.js          Lista de novedades del inicio
  instagram-lazy.js     Carga Instagram recién al llegar a esa sección
  contacto.js           Envía el formulario de contacto por WhatsApp
images/                 Imágenes optimizadas (og-jettlag.jpg es la vista previa para redes)
icon.png                Logo y favicon
vercel.json             Caché de imágenes en Vercel
.vercelignore           Archivos que no se suben (por ejemplo _todelete)
robots.txt, sitemap.xml Para buscadores
```

## Cómo verlo

Abrí `index.html` con doble clic o con Live Server de VS Code. No hace falta instalar nada.

## Tareas comunes

**Agregar o cambiar una novedad:** editá el array `NOVEDADES` en `js/novedades.js`.
Cada novedad lleva título, autor, tomo, descripción, precio, fecha, imagen y alt.
Las imágenes nuevas conviene subirlas a `images/` en 300×300 px.

**Cambiar el número de WhatsApp:** está en `WHATSAPP_NUMERO`, al principio de
`js/novedades.js` y de `js/contacto.js` (formato `549` + característica + número),
y en el `action` del formulario en `pages/contacto.html`.

**Cambiar colores o tipografía:** variables `--jl-*` dentro de `:root` en `css/styles.css`
(sección 3).

**Agregar un producto de merchandising:** copiá un bloque `<article class="item-container">`
en `pages/merchadasing.html` y cambiá imagen, título, descripción y precio.

**Al cambiar textos de una página:** actualizá también su `<title>`, la
`meta description` y las etiquetas `og:` del `<head>`.

## Créditos

- Base de Bootstrap 5.2.0 (MIT), recortada dentro de `css/styles.css`.
- Íconos de Font Awesome Free 6.2.1 (CC BY 4.0), copiados como SVG en el HTML.
- Tipografía Poppins (Google Fonts, SIL Open Font License).
