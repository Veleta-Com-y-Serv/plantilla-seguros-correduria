// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico: servicio, cifra, sector, paso del proceso o compromiso. */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; destacado?: boolean; duracion?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión de un cliente. `nota` (de 1 a 5, como texto) pinta las estrellas. */
export interface Testimonio { texto: string; autor: string; cargo?: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Ramo de seguro (sección `ramos`): hogar, coche, vida, salud, empresa… */
export interface Ramo { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
/** Artículo del blog (sección `noticias`). Sin `url`, la ficha no enlaza. */
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string; imagen?: string; categoria?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  /** Palabras del título que se resaltan (tienen que estar tal cual dentro del título). */
  resalte?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  /** Frase grande de la sección `cita` y quién la firma. */
  declaracion?: string;
  autor?: string;
  nota?: string;
  boton?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  ramos: Ramo[];
  /** Opciones del desplegable «¿Qué quieres asegurar?» (sección `presupuesto`), separadas por «;». */
  opciones?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));
const objetos = <T,>(v: unknown, clave: string): T[] =>
  lista<Crudo>(v).filter((e) => typeof e === 'object' && texto(e[clave]).trim()) as T[];
/** Botón solo si tiene destino (los vacíos no se pintan). */
const enlace = (v: unknown): Enlace | undefined => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url).trim() ? { texto: texto(e.texto) || 'Saber más', url: texto(e.url) } : undefined;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    cta: enlace(s.cta),
    cta_secundario: enlace(s.cta_secundario),
    items: objetos<Item>(s.items, 'titulo'),
    personas: objetos<Persona>(s.personas, 'nombre'),
    testimonios: objetos<Testimonio>(s.testimonios, 'texto'),
    galeria: lista<unknown>(s.galeria).map(texto).filter((r) => r.trim()),
    horario: lista<Horario>(s.horario),
    preguntas: objetos<Pregunta>(s.preguntas, 'pregunta'),
    proyectos: objetos<Proyecto>(s.proyectos, 'titulo'),
    noticias: objetos<Noticia>(s.noticias, 'titulo'),
    ramos: objetos<Ramo>(s.ramos, 'titulo'),
    opciones: texto(s.opciones),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#0c2340', acento: '#12b886', fondo: '#ffffff', texto: '#0f1d2e', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'LocalBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? String(t).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Enlace a otra web? (se abre en otra pestaña). */
export const externo = (url?: string) => !!url && /^https?:\/\//i.test(url);
/** Número de estrellas (0-5) a partir de la nota de una opinión («5», «4,5»…). */
export const estrellas = (nota?: unknown) => {
  const n = Math.round(parseFloat(texto(nota).replace(',', '.')));
  return Number.isFinite(n) ? Math.max(0, Math.min(5, n)) : 0;
};
/** Iniciales de un nombre («Marta Ferrer · Horno Ferrer» → «MF»). */
/** Lista a partir de una cadena con «;» o comas («Hogar; Coche» → [Hogar, Coche]). */
export const separar = (t?: unknown) => texto(t).split(/[;,]/).map((x) => x.trim()).filter(Boolean);
export const iniciales = (nombre?: string) =>
  texto(nombre).split(/[·|,(]/)[0].trim().split(/\s+/).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('');
