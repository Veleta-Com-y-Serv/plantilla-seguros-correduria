# Plantilla «Seguros y correduría» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **confiable**.
Todo en castellano de España, frases cortas, sin jerga de seguros innecesaria. Diseño y concepto en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa (también la lista propia `ramos` y el campo `opciones`); no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…) y Tailwind los expone como `bg-primario`, `text-acento`… En `src/styles/global.css` salen los derivados: `--c-oscuro` (marino profundo), `--c-claro` (niebla), `--c-acento-texto` (esmeralda oscurecido para texto sobre claro) y `--c-sobre-oscuro`.
- **Tipografías y aspecto general**: `src/styles/global.css` (bandas `.banda--marino|abismo|blanca|niebla|esmeralda`, antetítulos, botones píldora `.btn`/`.btn-sec`/`.btn-blanco`, `.foto-esquina` para la esquina curva de las fotos, cabecera `.cabecera--poliza` y pie `.pie--poliza`). Fuentes del sistema: no añadas fuentes externas.
- **Resalte**: `secciones.<id>.resalte` son unas palabras del título (tal cual) que salen en esmeralda. Lo pinta `src/components/ui/Resalte.astro`; si las palabras no están en el título, no pasa nada.
- **Imágenes**: en `public/`. Las fotos de partida van en `public/fotos/` (se generan a partir de `fotos.json`); las de relleno, en `public/placeholders/`. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`).
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = escudo con check + nombre.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`. Todas son bandas a todo el ancho de la ventana.
- `hero` → `hero.astro`: partida, foto a sangre a la derecha; `nota` = sello sobre la foto; `items` (titulo, icono) = barra de confianza esmeralda (hasta cuatro).
- `ramos` → `ramos.astro`: mosaico de fotos a borde completo; `ramos` (titulo, texto, icono, imagen, url).
- `ventajas` → `ventajas.astro`: 50/50 con foto al borde izquierdo; `items` (titulo, texto, icono), `cta`.
- `aseguradoras` → `aseguradoras.astro`: rejilla de nombres con filetes; `items` (titulo, texto). Solo nombres, nunca logotipos de terceros.
- `proceso` → `proceso.astro`: pasos sobre una vía esmeralda; `items` (titulo, texto, icono, duracion).
- `cifras` → `cifras.astro`: banda esmeralda; `items` (titulo = cifra como texto, texto = etiqueta). Sin cifras no se pinta.
- `opiniones` → `opiniones.astro`: `testimonios` (texto, autor, cargo, nota «1»-«5»).
- `preguntas` → `preguntas.astro`: acordeón `details/summary`; sin preguntas no se pinta.
- `presupuesto` → `presupuesto.astro`: formulario de comparativa; `opciones` («Hogar; Coche…»; si está vacío, salen los títulos de `ramos`), `items` (garantías), `boton`, `nota`, `cta`, `imagen`.
- `contacto` → `contacto.astro`: datos de `contacto`, botones y foto; el formulario sale aquí solo si `presupuesto` no está activa.
- `texto` → `texto.astro`: diseño genérico para apartados nuevos (`tipo: texto`).

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o «: » dentro de `{ … }`, ponlo entre comillas. Listas planas (nada de listas dentro de un elemento), 24 elementos como mucho, precios y cifras como cadena.
4. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, con bandas (`<section class="banda banda--blanca">`); enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
5. **Sección nueva**: crea `src/components/secciones/<id>.astro` (copia la estructura de una existente: `seccion(id)`, `Seccion` con `banda=`, `Titular`) y añade `secciones.<id>` en `site.yaml`. `src/pages/index.astro` la recoge sola; no lo toques.
6. **No tocar** `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base, salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
7. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral (`.contenedor`), bandas a todo el ancho, sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
8. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.
9. Seguros: no prometas coberturas, precios ni plazos que el cliente no haya dicho; no pongas nombres ni logotipos de aseguradoras reales salvo que el cliente lo pida expresamente.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.ramos.ramos` → `/seguros/<slug>/` (seguro).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio, duración…) salen en la tabla de datos de la ficha.
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/seguros/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio/producto con precio si lo hay).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "servicios; planes" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/servicios/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
