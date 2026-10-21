import{Container} from "react-bootstrap";
import ListaProductos from "../components/ListaProductos/ListaProductos";

const PaginaProductos = () => {
    return(
        <Container className="py-5">
            <ListaProductos />
        </Container>
    );
};

export default PaginaProductos;