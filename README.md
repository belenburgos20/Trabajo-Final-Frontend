# Proyecto Final - Frontend

## Participantes:
-Burgos, Belén.
-Guardese, Luciano.
-Hubert, Noelia.
-Ibañez, Ian Franco.

**Oleohidráulica Guardese** — Frontend del proyecto final de la Tecnicatura en Programación.

## Descripción

Este repositorio contiene la aplicación frontend desarrollada con React, TypeScript y Vite. La aplicación ofrece dos ámbitos principales: una parte pública/general y áreas diferenciadas para clientes y administradores. Permite la gestión de productos, presupuestos, clientes y un carrito de compras. Actualmente, la aplicación está conectada a un backend real para la obtención y gestión de datos.

## Objetivos

- Construir una interfaz clara y accesible para clientes y administradores que permita gestionar productos, presupuestos y clientes.
- Proveer una base mantenible en React + TypeScript que permita agregar nuevas funcionalidades y mejorar la experiencia de usuario de forma incremental.

## Funcionalidad general

- **Interfaz pública**: páginas de inicio, contacto y autenticación (login/register).
- **Portal cliente**: ver productos, gestionar un carrito de compras, acceder al perfil y consultar presupuestos.
- **Portal administrador**: panel de control con gestión de clientes, productos y presupuestos.

## Estructura principal de carpetas

```
src/
├─ App.css          # Estilos globales de la aplicación
├─ App.tsx          # Rutas y punto de composición de la app
├─ assets/          # Archivos estaticos como imagenes y fuentes
├─ components/      # Componentes reutilizables (Header, Footer, Cards, Sidebar...)
├─ context/         # Contextos y providers para estado global
├─ hooks/           # Hooks personalizados
├─ index.css        # Estilos base de la aplicación
├─ layouts/         # Layouts por tipo de pantalla (Admin, Clientes, General)
├─ main.tsx         # Punto de entrada
├─ mocks/           # Datos de prueba en JSON (productos, presupuestos, clientes)
├─ pages/           # Vistas de las paginas(General, Clientes, Admin)
├─ services/        # Abstraccion de llamadas a API y adaptadores
├─ types/           # Definiciones de tipos TypeScript
└─ utils/           # Funciones utilitarias
```

Nota: también hay una carpeta `public/mocks` con copias de los mocks usadas en desarrollo local.

Flujo de trabajo y desarrollo por features

- Desarrollo por features: el trabajo se organiza en tareas/feature-branches. Cada tarea implementa una feature completa (por ejemplo: "autenticación", "portal-", "carrito y checkout", "panel admin"), incluyendo componentes, páginas y servicios necesarios. Las tareas se prueban en rama propia y, al estar estables, se hacen merge a la rama principal de desarrollo.

## Mocks y conexión al backend

- Todas las llamadas de datos ahora están conectadas a un backend real para la gestión de productos, presupuestos y clientes.
- La capa de servicios (`src/services`) se encarga de realizar las solicitudes HTTP al backend, utilizando Axios para la comunicación con la API.
- Configurar correctamente la variable de entorno `VITE_API_URL` con la URL base del backend antes de ejecutar el proyecto.


## Proyecto desplegado en Render
- https://trabajo-final-frontend-j103.onrender.com


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
npm test      
```

4. Abrir en el navegador:

```text
http://localhost:5173
```

## Tecnologías y herramientas usadas

- React 19 + TypeScript
- Vite (bundler / dev server)
- React Router (enrutamiento)
- Axios (consumo HTTP)
- Bootstrap (estilos básicos)
- ESLint, Prettier (linting y formateo)
- Husky + lint-staged (ganchos pre-commit)

Manejo de tableros en Trello para la división de tareas. Cronograma/Sprint
- https://trello.com/b/MuVdiLr8/mi-tablero-de-trello

## Consideraciones y limitaciones

- **Datos**: La aplicación está conectada a un backend real para la gestión de datos. Asegúrate de que el backend esté en ejecución y configurado correctamente antes de iniciar el frontend.
- **Funcionalidades pendientes**: Se planea mejorar la autenticación con tokens/sesiones y realizar pruebas end-to-end para garantizar la calidad del producto.

## Proyecto desplegado

El proyecto está desplegado en Render y puede ser accedido en el siguiente enlace:

[https://trabajo-final-frontend-j103.onrender.com](https://trabajo-final-frontend-j103.onrender.com)

---

Para cualquier consulta o contribución, no dudes en contactarnos.

## Tests

El proyecto incluye tests automatizados utilizando Vitest para garantizar la calidad del código. Los tests están organizados en la carpeta `src/tests` e incluyen pruebas unitarias y de integración para las funcionalidades principales del frontend, como autenticación, gestión de productos, presupuestos y usuarios.

### Comandos para ejecutar los tests

```bash
npm test          # Ejecuta todos los tests una vez
npm run test:watch # Ejecuta los tests en modo watch para desarrollo
```

Asegúrate de que el backend esté en ejecución si los tests dependen de la API.



