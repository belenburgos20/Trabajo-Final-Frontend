import type { Producto } from '../types/Producto';

const IMAGES_BASE = '/assets/images';

const IMAGEN_POR_CATEGORIA: Record<number, string> = {
  1: `${IMAGES_BASE}/manguera-reforzada.jpg`, // Mangueras
  2: `${IMAGES_BASE}/Terminales.jpg`, // Terminales
  3: `${IMAGES_BASE}/Conectores.jpg`, // Conectores
  4: `${IMAGES_BASE}/TEE.jpg`, // TEEs
  5: `${IMAGES_BASE}/O'rings.jpg`, // O-rings
  6: `${IMAGES_BASE}/WIPER.jpg`, // Wipers
};

const IMAGEN_DEFAULT = `${IMAGES_BASE}/bombas-hidraulicas.jpg`;

export function getProductImageUrl(producto: Producto): string {
  const img = producto.imagen?.trim();
  if (img) {
    if (img.startsWith('http') || img.startsWith('/')) return img;
    const base = img.startsWith('assets/') ? '' : IMAGES_BASE;
    return base ? `${base}/${img}` : `/${img}`;
  }
  return IMAGEN_POR_CATEGORIA[producto.idCategoria] ?? IMAGEN_DEFAULT;
}
