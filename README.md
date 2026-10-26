# Landing Pilar Tecno

Frontend para consultar y administrar productos del inventario, desarrollado con React, TypeScript y Vite.

## Tecnologías y librerías utilizadas

### Aplicación

- **React 19** y **React DOM**: construcción y renderizado de la interfaz mediante componentes.
- **TypeScript**: tipado de componentes, servicios y datos de productos.
- **React Bootstrap**: componentes de interfaz como navegación, contenedores, grillas, tarjetas, formularios y modales.
- **Bootstrap 5**: estilos base y sistema visual; su CSS se importa desde `src/main.tsx`.
- **React Router DOM**: navegación entre las páginas de inicio (`/`) y productos (`/productos`).
- **Axios**: solicitudes HTTP a la API de inventario.
- **Formik**: estado y gestión del formulario de productos.
- **Yup**: validación del formulario (campos requeridos y valores numéricos no negativos).

### Desarrollo y compilación

- **Vite** y **@vitejs/plugin-react**: servidor de desarrollo con recarga en caliente y compilación del frontend.
- **TypeScript**: comprobación de tipos durante el comando de build.
- **Oxlint**: análisis estático y lint del código.
- **@types/react**, **@types/react-dom** y **@types/node**: definiciones de tipos para TypeScript.

## API utilizada

La aplicación consume la API de inventario en `http://localhost:3000/api/productos` mediante Axios. Utiliza estos endpoints:

- `GET /api/productos`: listar productos.
- `POST /api/productos`: crear un producto.
- `PUT /api/productos/:id`: actualizar un producto.
- `DELETE /api/productos/:id`: eliminar un producto.
- `GET /api/productos/bajo-stock/:limite`: consultar productos con bajo stock (el límite predeterminado en el frontend es `5`).
- `GET /api/productos/categoria/:categoria`: filtrar productos por categoría.

La URL de la API está definida en `src/services/productoService.ts`. Para usar otra dirección, actualiza allí la constante `BASE_URL`.

## Requisitos

- Node.js y npm.
- La API de inventario en ejecución en `http://localhost:3000` y conectada a MongoDB.

## Ejecutar en local

Desde la carpeta del frontend:

```bash
npm install
npm run dev
```

Abre la URL local que muestra Vite en la terminal (normalmente `http://localhost:5173`). Inicia también el backend para que las operaciones de productos funcionen.

## Otros comandos

```bash
npm run build
npm run lint
npm run preview
```
