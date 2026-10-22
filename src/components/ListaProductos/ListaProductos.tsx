import {useState, useEffect} from "react";
import {Card , Row , Col, Badge, Button} from "react-bootstrap";
import {crearProducto, obtenerProductos} from "../../services/productoService";
import type {Producto, ProductoFormulario} from "../../types/producto";
import ModalProducto from "../ModalProducto/ModalProducto";

const ListaProductos = () => {
    const [datos, setDatos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [MostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        obtenerProductos()
        .then(setDatos)
        .catch(() => setError("No se pudieron cargar los datos"))
        .finally (() => setCargando(false));
    }, []);

    const agregarProducto = async (datos: ProductoFormulario) =>{
      const nuevo = await crearProducto(datos);
      setDatos((anteriores) => [...anteriores, nuevo]);
      setMostrarModal(false)
    };

    return (
   <>
      <div className="d-flex justify-content-between align-items-center mb-3">
       <h2 className="mb-3">Productos</h2>
       <Button onClick={() => setMostrarModal(true)} > Agregar Producto</Button>
       </div>

       <ModalProducto
          mostrar={MostrarModal}
          onCerrar={() => setMostrarModal(false)}
          onGuardar={agregarProducto}
        />
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