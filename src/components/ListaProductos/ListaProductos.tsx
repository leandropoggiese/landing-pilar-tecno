import {useState, useEffect} from "react";
import {Card , Row , Col, Badge} from "react-bootstrap";
import {obtenerProductos} from "../../services/productoService";
import type {Producto} from "../../types/producto";

const ListaProductos = () => {
    const [datos, setDatos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        obtenerProductos()
        .then(setDatos)
        .catch(() => setError("No se pudieron cargar los datos"))
        .finally (() => setCargando(false));
    }, []);


    return (
   <>
      <h2 className="mb-3">Productos</h2>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      
      {!cargando && !error && (
        <Row>
          {datos.map((Producto) => (
            <Col md={4} key ={Producto._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{Producto.nombre}</Card.Title>
                  <Card.Subtitle className = "text-secondary mb-2">{Producto.categoria}</Card.Subtitle>
                  <Badge bg= "info">{Producto.precio}</Badge>
                </Card.Body>
              </Card>
            </Col>
      ))}
 </Row>
 )}
 </>
 );
};


export default ListaProductos;
