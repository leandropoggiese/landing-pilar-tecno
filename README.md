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

La aplicación consume la API de inventario mediante Axios. La URL base se configura con la variable `VITE_API_URL` en el archivo `.env`; actualmente se utiliza `https://api-inventario-stock.onrender.com/api/productos`. Utiliza estos endpoints:

- `GET /api/productos`: listar productos.
- `POST /api/productos`: crear un producto.
- `PUT /api/productos/:id`: actualizar un producto.
- `DELETE /api/productos/:id`: eliminar un producto.
- `GET /api/productos/bajo-stock/:limite`: consultar productos con bajo stock (el límite predeterminado en el frontend es `5`).
- `GET /api/productos/categoria/:categoria`: filtrar productos por categoría.

Para cambiar la dirección de la API, modifica `VITE_API_URL` en `.env`. No guardes credenciales de MongoDB ni otros secretos en variables `VITE_*`: Vite las expone en el código enviado al navegador. Las credenciales de la base de datos deben configurarse solo en el backend.

## Requisitos

- Node.js y npm.
- Acceso a la API de inventario configurada en `VITE_API_URL`.

## Ejecutar en local

Desde la carpeta del frontend:

```bash
npm install
npm run dev
```

El proyecto incluye un `.env` de desarrollo con la URL de la API de Render. Si necesitas crearlo de nuevo, copia `.env.example` como `.env`. Abre la URL local que muestra Vite en la terminal (normalmente `http://localhost:5173`). Si cambias `.env` mientras Vite está activo, reinicia el servidor de desarrollo.

## Otros comandos

```bash
npm run build
npm run lint
npm run preview
```
