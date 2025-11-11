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
├─ components/ -> componentes reutilizables (Header, Footer, etc.)
├─ context/ -> manejo de estado global (AppContext)
├─ mocks/ -> datos temporaeles para desarrollo (productos.json, presupuestos.json)
├─ pages/ -> vistas principales
│ ├─ General/ -> al publico (Home, Login, Register, Contact)
│ ├─ Clientes/ -> portal cliente (Carrito, Perfil, Presupuestos, Productos)
│ └─ Admin/ -> portal administrador (Dashboard, Clientes, Presupuestos, Productos)
├─ services/-> consumir la API (api.ts)
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

## Notas

- Los archivos de componentes y páginas usan .tsx (porque el proyecto está en TypeScript).
- Los mocks (productos.json, presupuestos.json) están solo para pruebas locales.
