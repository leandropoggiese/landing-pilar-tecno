import{Container} from "react-bootstrap";
import ListaProductos from "../components/ListaProductos/ListaProductos";

const PaginaProductos = () => {
    return (
        <div className="pagina-productos-sintacc">
            <Container className="py-5">
                <ListaProductos />
            </Container>
        </div>
    );
};

export default PaginaProductos;