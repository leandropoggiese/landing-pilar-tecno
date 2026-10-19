import axios from "axios";
import type {Producto} from "../types/producto";

const BASE_URL = "http://localhost:3000/productos";

export const obtenerProductos = async (): Promise<Producto[]> => {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
};