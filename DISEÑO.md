# Seguros y correduría: brief de diseño

Plantilla `seguros-correduria` creada el 02/11/2026 a partir de `agencia-marketing` con `php artisan plantillas:nueva`
y rediseñada entera (de la base solo queda la estructura técnica). Este fichero se queda en el repo: es lo que lee
quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: corredurías, agencias y agentes de seguros, mediadores y asesores financieros (`sectores`: seguros,
  correduria, agente-seguros, mediador, financiero). Su cliente es una familia, un autónomo o una pyme que paga
  demasiado o no sabe qué cubre su póliza, y entra a ver si puede fiarse: qué seguros hay, por qué un corredor, con
  qué compañías trabaja, cómo es el proceso y qué pasa cuando hay un siniestro.
- **Qué tiene que conseguir la web**: que pidan la comparativa (botón «Pide tu comparativa» en cabecera, portada,
  ramos y formulario de presupuesto con el ramo) o que llamen (teléfono en la franja de la cabecera, botón redondo
  en móvil, presupuesto, contacto y pie).
- **Tono y estilo** (`estilo: confiable`): serio pero cercano, claro, sin letra pequeña. Referencia que sí:
  losmartesnohayluna.com (bandas a sangre, cifras grandes). Que no: la caja centrada estrecha con tarjetas blancas;
  el morado + lima y las tarjetas de cristal de `agencia-marketing`; el aire de banco frío.
- **Paleta de ejemplo**: primario `#0c2340` (azul marino), acento `#12b886` (verde esmeralda), fondo `#ffffff`
  (blanco), texto `#0f1d2e`. Derivados en `global.css` con `color-mix`: `--c-oscuro` (marino profundo: franja de la
  cabecera, aseguradoras, presupuesto y pie), `--c-claro` (niebla: blanco azulado de «por qué nosotros» y del
  formulario), `--c-acento-texto` (esmeralda oscurecido para texto sobre claro, que el puro no llega a AA) y
  `--c-sobre-oscuro`. El esmeralda puro solo va como fondo (botones, barra de confianza, cifras) o como texto sobre
  marino.
- **Tipografía**: del sistema. Títulos en serifa firme (Charter, Sitka, Cambria, Georgia; 700, interletrado
  −0,022 em) que da el tono de «papel de póliza»; texto en palo seco del sistema. Resalte (`resalte`) sin cursiva: en
  esmeralda sobre marino y en esmeralda oscuro con subrayado fino sobre blanco. Antetítulos en mayúsculas espaciadas
  (0,22 em) con un cuadradito esmeralda delante y un filete detrás. Botones píldora con flecha.
- **Motivos**: el escudo con el check (marca sin logo, favicon, marca de agua gigante en bandas marino, monograma de
  las aseguradoras e iconos de «por qué nosotros») y la «esquina de póliza»: las fotos a sangre tienen **una sola
  esquina curva y grande** (`.foto-esquina`, `--esquina`).
- **Ritmo de bandas** (todas de borde a borde; contenido a 90 rem como mucho, 16 px de margen en móvil):
  1. `hero` — partido 50/50 a sangre: marino con el título en serifa de hasta 6,5 rem (2,6 en móvil), texto y dos
     botones; foto hasta el borde derecho con la esquina curva abajo a la izquierda y un sello blanco (`nota`).
     Debajo, la **barra de confianza** esmeralda a todo el ancho (`items`: titulo + icono, 2 columnas en móvil, 4
     en escritorio, con filetes).
  2. `ramos` — blanca: cabecera partida y un mosaico de fotos de borde a borde sin márgenes (6 columnas que reparten
     3+3 / 2+2+2 según cuántos haya), cada ramo con velo marino, icono en círculo esmeralda, título y enlace.
  3. `ventajas` — niebla, 50/50 a sangre: foto al borde izquierdo (esquina curva abajo a la derecha); texto y
     ventajas en dos columnas con icono en escudo.
  4. `aseguradoras` — marino profundo: rejilla de «sellos» de texto con filetes (monograma en escudo esmeralda,
     nombre en serifa, ramos en pequeño). Nombres, nunca logotipos.
  5. `proceso` — blanca: titular centrado y tres pasos sobre una vía esmeralda (círculo marino con anillo, «Paso N
     · plazo»); en móvil, vía vertical a la izquierda.
  6. `cifras` — esmeralda: cifras enormes en serifa marino con filetes (2 columnas en móvil, 4 en escritorio).
  7. `opiniones` — marino: opiniones en columnas separadas por filetes (sin tarjetas), comillas esmeralda, texto en
     serifa, iniciales y estrellas.
  8. `preguntas` — blanca: titular fijo a la izquierda; acordeón numerado con cuadrado marino «+» que se vuelve
     esmeralda.
  9. `presupuesto` — partido a sangre: marino profundo (foto muy tenue de fondo) con garantías, teléfono y WhatsApp;
     niebla con el formulario y el desplegable «¿Qué quieres asegurar?» (`opciones` o, si no hay, los ramos).
  10. `contacto` — blanca, 50/50 a sangre: teléfono enorme, datos, botones de llamar, WhatsApp y cómo llegar; foto al
      borde derecho con la esquina curva arriba a la izquierda. Si no hay `presupuesto` activo, el formulario va aquí.
  Pie marino profundo: nombre grande, teléfono en esmeralda y botón; cuatro columnas y línea legal.
- **Cabecera**: `sticky`, a todo el ancho. En escritorio, franja fina marino profundo con horario, email y teléfono;
  debajo, barra blanca con escudo + nombre, menú con subrayado esmeralda al pasar y botón píldora. En móvil, botón
  redondo de llamar y menú `details/summary`.
- **Fotos** (`fotos.json`, 9): casa con coche delante al atardecer (portada), salón (hogar), coche en carretera
  costera (coche), mesa familiar con manos sin caras (vida), consulta vacía (salud), comercio antes de abrir
  (empresa), la oficina de la correduría (por qué nosotros), mesa con documentos sin texto y llaves (presupuesto) y
  una calle del centro de Huelva (contacto). Sin texto legible, sin logotipos, sin personas reconocibles.
- **Qué no hacer**: volver a la columna estrecha o a las tarjetas blancas sobre gris; poner el esmeralda puro como
  texto sobre blanco; meter precios, cifras o nombres de compañías reales en los componentes (todo sale de
  `site.yaml`; las aseguradoras del ejemplo son inventadas).

## Páginas propias (fichas)
Con la misma piel que la portada: cabecera y pie de la plantilla, migas (Inicio › Sección › Elemento), hero con la foto del
elemento (sin foto, su icono), `detalle` en párrafos, tabla de datos, caja de contacto, galería (`imagenes`) y otros elementos
de la misma lista.
