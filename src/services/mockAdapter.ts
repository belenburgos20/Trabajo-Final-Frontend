import type { Producto, NuevoProducto, UpdateProducto } from '../types/Producto';
import type { Presupuesto, NuevoPresupuesto, UpdatePresupuesto } from '../types/Presupuesto';
import type { Cliente, NuevoCliente, UpdateCliente } from '../types/Cliente';

let productosCache: Producto[] | null = null;
let presupuestosCache: Presupuesto[] | null = null;
let clientesCache: Cliente[] | null = null;

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`No se pudo cargar el mock: ${path}`);
  return response.json();
}

async function loadProductos() {
  if (!productosCache) {
    const data = await fetchJson<Producto[]>('/mocks/productos.json');
    productosCache = data;
  }
  return productosCache;
}

async function loadPresupuestos() {
  if (!presupuestosCache) {
    const data = await fetchJson<Presupuesto[]>('/mocks/presupuestos.json');
    presupuestosCache = data;
  }
  return presupuestosCache;
}

async function loadClientes() {
  if (!clientesCache) {
    const data = await fetchJson<Cliente[]>('/mocks/clientes.json');
    clientesCache = data;
  }
  return clientesCache;
}

// Productos
export async function getProductosMock(): Promise<Producto[]> {
  return loadProductos();
}

export async function getProductoByCodigoMock(codigo: string): Promise<Producto | undefined> {
  const productos = await loadProductos();
  // soporte codigo o idProducto
  const codigoNum = Number(codigo);
  return productos.find((p) => p.idProducto === codigoNum || String((p as any).codigo) === codigo);
}

export async function getProductosPorCategoriaMock(idCategoria: string): Promise<Producto[]> {
  const productos = await loadProductos();
  const idNum = Number(idCategoria);
  return productos.filter((p) => p.idCategoria?.idCategoria === idNum);
}

export async function getProductoPorNombreMock(nombre: string): Promise<Producto[]> {
  const productos = await loadProductos();
  const n = nombre.toLowerCase();
  return productos.filter((p) => p.nombre.toLowerCase().includes(n));
}

export async function crearProductoMock(data: NuevoProducto): Promise<Producto> {
  const productos = await loadProductos();
  const newProducto: Producto = {
    idProducto: productos.length ? Math.max(...productos.map((p) => p.idProducto)) + 1 : 1,
    nombre: data.nombre,
    descripcion: data.descripcion || '',
    idCategoria: { idCategoria: data.idCategoria as any, nombre: 'Sin categoría' } as any,
    stock: data.stock || 0,
    precio: data.precio || 0,
    imagen: '',
  };
  productos.push(newProducto);
  return newProducto;
}

export async function actualizarProductoMock(codigo: string, data: UpdateProducto): Promise<Producto | null> {
  const productos = await loadProductos();
  const codigoNum = Number(codigo);
  const idx = productos.findIndex((p) => p.idProducto === codigoNum || String((p as any).codigo) === codigo);
  if (idx === -1) return null;
  const cur = productos[idx];
  const updated = { ...cur, ...data } as Producto;
  productos[idx] = updated;
  return updated;
}

export async function eliminarProductoMock(codigo: string): Promise<{ message: string }> {
  const productos = await loadProductos();
  const codigoNum = Number(codigo);
  const idx = productos.findIndex((p) => p.idProducto === codigoNum || String((p as any).codigo) === codigo);
  if (idx === -1) throw new Error('Producto no encontrado');
  productos.splice(idx, 1);
  return { message: 'Producto eliminado' };
}

// Presupuestos
export async function getPresupuestosMock(): Promise<Presupuesto[]> {
  return loadPresupuestos();
}

export async function getPresupuestoByIdMock(id: string): Promise<Presupuesto | undefined> {
  const presupuestos = await loadPresupuestos();
  const idNum = Number(id);
  return presupuestos.find((p) => p.idPresupuesto === idNum);
}

export async function getPresupuestosPorUsuarioMock(idUsuario: string): Promise<Presupuesto[]> {
  const presupuestos = await loadPresupuestos();
  const idNum = Number(idUsuario);
  return presupuestos.filter((p) => p.idUsuario === idNum);
}

export async function getPresupuestosPorFechaMock(fecha: string): Promise<Presupuesto[]> {
  const presupuestos = await loadPresupuestos();
  return presupuestos.filter((p) => p.fecha === fecha);
}

export async function getPresupuestosPorEstadoMock(estado: string): Promise<Presupuesto[]> {
  const presupuestos = await loadPresupuestos();
  return presupuestos.filter((p) => p.estado === estado);
}

export async function crearPresupuestoMock(data: NuevoPresupuesto): Promise<Presupuesto> {
  const presupuestos = await loadPresupuestos();
  const newPresupuesto: Presupuesto = {
    idPresupuesto: presupuestos.length ? Math.max(...presupuestos.map((p) => p.idPresupuesto)) + 1 : 1,
    idUsuario: data.idUsuario,
    fecha: data.fecha,
    detalle: data.detalle as any,
    montoTotal: (data.detalle as any[]).reduce((acc: number, d: any) => acc + d.precio * d.cantidad, 0),
    fechaEntrega: data.fechaEntrega,
    estado: data.estado,
  } as Presupuesto;
  presupuestos.push(newPresupuesto);
  return newPresupuesto;
}

export async function actualizarPresupuestoMock(id: string, data: UpdatePresupuesto): Promise<Presupuesto | null> {
  const presupuestos = await loadPresupuestos();
  const idNum = Number(id);
  const idx = presupuestos.findIndex((p) => p.idPresupuesto === idNum);
  if (idx === -1) return null;
  const cur = presupuestos[idx];
  const updated = { ...cur, ...data } as Presupuesto;
  presupuestos[idx] = updated;
  return updated;
}

export async function eliminarPresupuestoMock(id: string): Promise<{ message: string }> {
  const presupuestos = await loadPresupuestos();
  const idNum = Number(id);
  const idx = presupuestos.findIndex((p) => p.idPresupuesto === idNum);
  if (idx === -1) throw new Error('Presupuesto no encontrado');
  presupuestos.splice(idx, 1);
  return { message: 'Presupuesto eliminado' };
}

// Clientes
export async function getClienteByIdMock(id: number): Promise<Cliente | undefined> {
  const clientes = await loadClientes();
  return clientes.find((c) => c.id === id);
}

export async function crearClienteMock(data: NuevoCliente): Promise<Cliente> {
  const clientes = await loadClientes();
  const newCliente: Cliente = {
    id: clientes.length ? Math.max(...clientes.map((c) => c.id)) + 1 : 1,
    ...data,
  } as Cliente;
  clientes.push(newCliente);
  return newCliente;
}

export async function actualizarClienteMock(id: number, data: UpdateCliente): Promise<Cliente | null> {
  const clientes = await loadClientes();
  const idx = clientes.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const cur = clientes[idx];
  const updated = { ...cur, ...data } as Cliente;
  clientes[idx] = updated;
  return updated;
}

export async function listarClientesMock(): Promise<Cliente[]> {
  return loadClientes();
}
