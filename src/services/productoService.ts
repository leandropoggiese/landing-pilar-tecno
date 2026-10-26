import axios from "axios";
import type { Producto, ProductoFormulario } from "../types/producto";

const BASE_URL = import.meta.env.VITE_API_URL;

export const obtenerProductos = async (): Promise<Producto[]> => {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
};

export const crearProducto = async (datos: ProductoFormulario,): Promise<Producto> => {
    const respuesta = await axios.post(BASE_URL, datos);
    return respuesta.data
};
export const actualizarProducto = async (
    id: string,
    datos: ProductoFormulario,
): Promise<Producto> => {
    const respuesta = await axios.put(`${BASE_URL}/${id}`, datos);
    return respuesta.data;
};

export const obtenerProductosBajoStock = async (limite: number = 5): Promise<Producto[]> => {
    const respuesta = await axios.get(`${BASE_URL}/bajo-stock/${limite}`);
    return respuesta.data;
};

export const obtenerProductosPorCategoria = async (categoria: string): Promise<Producto[]> => {
    const respuesta = await axios.get(`${BASE_URL}/categoria/${categoria}`);
    return respuesta.data;
};


export const eliminarProducto = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};