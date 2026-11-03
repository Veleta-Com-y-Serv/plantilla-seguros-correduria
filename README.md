# Plantilla NoExpertise · Seguros y correduría

Web de confianza para corredurías y agentes de seguros: bandas a todo el ancho que alternan azul marino, blanco,
niebla y verde esmeralda; portada partida con foto a sangre y barra de confianza; mosaico de ramos a borde completo,
aseguradoras, proceso comparar → contratar → siniestro, cifras y formulario de comparativa con el ramo.

- Sectores: seguros, correduria, agente-seguros, mediador, financiero. Estilo: confiable. Plan mínimo: presencia.
- Secciones: hero, ramos, ventajas, aseguradoras, proceso, cifras, opiniones, preguntas, presupuesto, contacto (y `texto` para apartados nuevos).
- Ejemplo: Ría Seguros, correduría ficticia de Huelva (las aseguradoras del ejemplo también son inventadas).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; fotos a generar en `fotos.json`; reglas para el agente en `CLAUDE.md`; concepto visual en `DISEÑO.md`.

## Campos propios (además del esquema común)

| Sección | Campos |
|---|---|
| todas | `resalte`: palabras del título que salen en esmeralda |
| `hero` | `nota` (sello sobre la foto); `items` (titulo, icono): barra de confianza, hasta cuatro |
| `ramos` | `ramos` (titulo, texto, icono, imagen, url): mosaico de fotos; `cta` |
| `ventajas` | `items` (titulo, texto, icono), `imagen`, `cta` |
| `aseguradoras` | `items` (titulo = compañía, texto = ramos) |
| `proceso` | `items` (titulo, texto, icono, duracion) |
| `cifras` | `items` (titulo = cifra como texto, texto = etiqueta) |
| `opiniones` | `testimonios` (texto, autor, cargo, nota) |
| `presupuesto` | `opciones` («Hogar; Coche…»: desplegable del formulario), `items` (titulo: garantías), `boton`, `nota`, `cta` (WhatsApp), `imagen` (fondo tenue) |
| `contacto` | `imagen`; `boton` (texto del botón si el formulario sale aquí, cuando no hay `presupuesto` activo) |

Iconos disponibles (`icono`): casa, coche, corazon, salud, maletin, escudo, balanza, salvavidas, documento, paraguas, euro, calendario, usuarios, check… (lista completa en `src/components/ui/Icono.astro`).

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) hechas para esta plantilla, sin licencias de terceros.

## Páginas propias
- Cada elemento de `secciones.ramos.ramos` con `detalle` tiene su página en `/seguros/<slug>/` (`src/pages/[coleccion]/[slug].astro`).
- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
