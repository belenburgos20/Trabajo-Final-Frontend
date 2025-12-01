# Proyecto Final - Frontend

**Oleohidráulica Guardese** — Frontend del proyecto final de la Tecnicatura en Programación.

Descripción

Este repositorio contiene la aplicación frontend desarrollada con React, TypeScript y Vite. La aplicación ofrece dos ámbitos principales: una parte pública/general y áreas diferenciadas para clientes y administradores (gestión de productos, presupuestos, clientes y un carrito de compras). Actualmente la app trabaja con datos mock (archivos JSON locales) para facilitar el desarrollo; en un futuro próximo se conectará a un backend real.

Objetivos

- Construir una interfaz clara y accesible para clientes y administradores que permita gestionar productos, presupuestos y clientes.
- Entregar una base mantenible en React + TypeScript que permita agregar nuevas features y mejorar la UX de forma incremental para llegar a implementar en la entrega final.

Funcionalidad general

- Interfaz pública: páginas de inicio, contacto e autenticación (login/register).
- Portal cliente: ver productos, carrito, perfil y presupuestos.
- Portal administrador: panel de control con gestión de clientes, productos y presupuestos.

Estructura principal de carpetas

```
src/
├─ components/      # Componentes reutilizables (Header, Footer, Cards, Sidebar...)
├─ context/         # Contextos y providers para estado global
├─ hooks/           # Hooks personalizados
├─ layouts/         # Layouts por tipo de pantalla (Admin, Clientes, General)
├─ pages/           # Vistas/route-level pages (General, Clientes, Admin)
├─ services/        # Abstracción de llamadas a API y adaptadores (mock/real)
├─ mocks/           # Datos de prueba en JSON (productos, presupuestos, clientes)
├─ App.tsx          # Rutas y punto de composición de la app
└─ main.tsx         # Punto de entrada
```

Nota: también hay una carpeta `public/mocks` con copias de los mocks usadas en desarrollo local.

Flujo de trabajo y desarrollo por features

- Desarrollo por features: el trabajo se organiza en tareas/feature-branches. Cada tarea implementa una feature completa (por ejemplo: "autenticación", "portal-", "carrito y checkout", "panel admin"), incluyendo componentes, páginas y servicios necesarios. Las tareas se prueban en rama propia y, al estar estables, se hacen merge a la rama principal de desarrollo.

Mocks y futura conexión al backend

- Actualmente todas las llamadas de datos pueden apuntar a los mocks locales (archivos JSON en `src/mocks` y `public/mocks`).
- Próximamente se integrará un backend real: la capa de servicios (`src/services`) está diseñada para facilitar el cambio desde mocks a endpoints reales.

Cómo ejecutar el proyecto (local)

1. Clonar el repositorio:

```powershell
git clone https://github.com/belenburgos20/Trabajo-Final-Frontend
cd Trabajo-Final-Frontend
```

2. Instalar dependencias:

```powershell
npm install
```

3. Scripts disponibles:

```powershell
npm run dev      # inicia el servidor de desarrollo (Vite)
npm run build    # compila TypeScript y genera build de producción (tsc + vite build)
npm run preview  # sirve el build de producción localmente
npm run lint     # ejecuta ESLint
npm run lint:fix # ejecuta ESLint y corrige problemas automáticos
```

4. Abrir en el navegador:

```text
http://localhost:5173
```

Tecnologías y herramientas usadas

- React 19 + TypeScript
- Vite (bundler / dev server)
- React Router (enrutamiento)
- Axios (consumo HTTP)
- Bootstrap (estilos básicos)
- ESLint, Prettier (linting y formateo)
- Husky + lint-staged (ganchos pre-commit)

Manejo de tableros en Trello para la división de tareas. Cronograma/Sprint
- https://trello.com/b/MuVdiLr8/mi-tablero-de-trello

Consideraciones y limitaciones

- Datos: actualmente la aplicación usa mocks locales (`src/mocks` y `public/mocks`) para acelerar el desarrollo. Algunos flujos (p. ej. validaciones server-side, permisos y datos persistentes) dependen de la futura API.
- Funcionalidades pendientes: integración con autenticación real (tokens/sesiones), endpoints CRUD definitivos para productos/presupuestos, y pruebas end-to-end.
- Alcance actual: la app está pensada como prototipo funcional y base para desarrollo; no es una instalación productiva hasta integrar el backend y agregar controles de seguridad/escala.
- Compatibilidad: se desarrolló para entornos modernos (Node.js reciente y navegadores actuales). Revisar `package.json` para versiones exactas de dependencias.



