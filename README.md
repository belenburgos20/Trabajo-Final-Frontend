# Proyecto Final - Frontend

**Oleohidráulica Guardese**

Este repo es la parte **Frontend** del proyecto final de la Tecnicatura en Programación.  
Está hecho con **React + TypeScript + Vite**, y se conecta a una API en Node.js (cuando esté lista).  
Por ahora usamos mocks locales.

---

## Estructura

---

src/
├─ assets/ -> img, iconos, logos
├─ components/ -> componentes reutilizables (Header, Footer, ProtectedRoute, etc.)
├─ context/ -> estado global (AppContext), autenticación (AuthContext) y carrito (CartContext)
├─ layouts/ -> PublicLayout (Header + Outlet + Footer)
├─ mocks/ -> datos temporales (productos.json, presupuestos.json, clientes.json)
├─ pages/ -> vistas principales
│ ├─ General/ -> al público (Home, Login, Register, Contact)
│ ├─ Clientes/ -> portal cliente (Carrito, Perfil, Presupuestos, Productos)
│ └─ Admin/ -> portal administrador (Dashboard, Clientes, Presupuestos, Productos)
├─ services/ -> consumo de API (api.ts con fallback a mocks)
├─ App.tsx -> rutas principales
└─ main.tsx -> punto de entrada

---

## Correr el proyecto

---

1- Clonar el repo:

- git clone https://github.com/belenburgos20/Trabajo-Final-Frontend
- cd Trabajo-Final-Frontend
  2- Instalar las dependencias
- npm install
  3- Correr el proyecto
- npm run dev
  4- Abrir en el navegador
- http://localhost:5173

## Flujo de trabajo

---

Usamos una sola rama principal (dev) y cada uno trabaja en su rama aparte.
Cuando terminemos una parte estable, hacemos merge a dev.

---

## Configuración del proyecto (paso a paso)

---

1. Requisitos

- Node.js 20.19+ o 22.12+ (requerido por Vite 7)
- npm 10+
- Git

2. Instalación

- git clone (link del repo)
- cd del repo
- npm install

3. Variables de entorno

- Crear un archivo .env en la raíz (al mismo nivel que package.json)
- Contenido mínimo:

```
VITE_API_URL=http://localhost:3000/api
```

- Sugerido agregar .env.example al repo con la misma clave.

4. Scripts disponibles

- npm run dev # Dev server en http://localhost:5173
- npm run build # Build de producción (dist/)
- npm run preview # Previa del build
- npm run lint # Revisa errores de lint
- npm run lint:fix # Intenta corregirlos

5. Husky y pre-commit

- Ya configurado en package.json. Si .husky está vacío:
  - npm run prepare
  - npx husky add .husky/pre-commit "npx lint-staged"
- Probar: git add . && git commit -m "test" (debería ejecutar lint-staged)

6. Estructura de rutas y layouts

- Implementado PublicLayout para rutas públicas (renderiza Header, Outlet y Footer).
- Rutas públicas (dentro de PublicLayout):
  - index -> Home
  - contact, login, register
- Portal Clientes:
  - /cliente/carrito, /cliente/perfil, /cliente/presupuestos, /cliente/productos
- Portal Administrador (protegido con ProtectedRoute):
  - /admin, /admin/clientes, /admin/presupuestos, /admin/productos
- NotFound y wildcard `*` implementados.

7. Contextos de la app

- Auth: `src/context/AuthContext.tsx` (user, login, logout)
- Cart: `src/context/CartContext.tsx` (cartItems, addToCart, removeFromCart, updateQty, clearCart, total)
- App: `src/context/AppProvider.tsx` (estado general)
- Uso en `main.tsx`:

```tsx
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { AppProvider } from './context/AppProvider';

<AuthProvider>
  <CartProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </CartProvider>
</AuthProvider>;
```

8. Servicios/API

- Archivo base: `src/services/api.ts`
- Lee `VITE_API_URL` desde `.env`.
- Helpers: `apiGet`, `apiPost`.
- Fallback automático a mocks cuando la API no está disponible.
- Endpoints con fallback: `/productos`, `/presupuestos`, `/clientes`.

9. Mocks de datos

- Ubicación: `src/mocks/`
- Archivos: `productos.json`, `presupuestos.json`, `clientes.json`
- Uso: desarrollo local mientras el backend no está listo. No se deployan a producción.

10. Build y Deploy

- Build local: npm run build (genera dist/)
- Previsualizar: npm run preview
- Deploy estático (ej: Netlify/Vercel): apuntar a la carpeta dist
- Recordá configurar la variable VITE_API_URL en el entorno del deploy

11. Troubleshooting

- Node incompatible: Vite 7 requiere Node 20.19+ o 22.12+. Actualizá Node si ves errores de engine.
- Husky no corre en commit:
  - Verificá `.husky/pre-commit` y `git config core.hooksPath`
  - En Windows, usar Git Bash para los comandos de Husky
  - Reinstalar: `npm run prepare`
- 404 al refrescar rutas en producción (SPA): configurá rewrites a `index.html` en tu hosting.

## Estado actual

- Ruteo con `react-router-dom` + PublicLayout.
- Rutas Admin protegidas con `ProtectedRoute` y `AuthContext`.
- Contextos creados: `AuthContext` y `CartContext` + `AppProvider`.
- Servicio `api.ts` con `VITE_API_URL` y fallback a mocks (`productos`, `presupuestos`, `clientes`).
- Página 404 (NotFound) y wildcard `*` implementados.

## Cómo probar

1. Requisitos: Node 20.19+ o 22.12+.
2. Variables: `.env` con `VITE_API_URL=http://localhost:3000/api` (hay `.env.example`).
3. Instalar y correr:
   - `npm install`
   - `npm run dev` → http://localhost:5173/
4. Pruebas rápidas:
   - Home: login de ejemplo y agregar producto al carrito (usa contextos).
   - Admin: visitar `/admin` sin login redirige a `/login`; tras loguear, accedés al dashboard y vistas `/admin/*`.
   - Clientes: `/cliente/productos`, `/cliente/clientes`, `/cliente/presupuestos` cargan datos desde mocks.

## Notas

- Los archivos de componentes y páginas usan .tsx (TypeScript).
- Los mocks (`productos.json`, `presupuestos.json`, `clientes.json`) son solo para pruebas locales.
