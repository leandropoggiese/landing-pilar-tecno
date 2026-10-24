import {useState, useEffect} from "react";
import {Modal, Card , Row , Col, Badge, Button} from "react-bootstrap";
import {crearProducto, obtenerProductos, actualizarProducto, eliminarProducto,} from "../../services/productoService";
import type {Producto, ProductoFormulario} from "../../types/producto";
import ModalProducto from "../ModalProducto/ModalProducto";

const ListaProductos = () => {
    const [datos, setDatos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [MostrarModal, setMostrarModal] = useState(false);
    const [productoEditado, setProductoEditado] = useState<Producto | null>(null);
    const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);
    const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

    useEffect(() => {
        obtenerProductos()
        .then(setDatos)
        .catch(() => setError("No se pudieron cargar los datos"))
        .finally (() => setCargando(false));
    }, []);

  const abrirAgregar = () => { //se abre modal vacio porque estamos agregando/creando un producto
    setProductoEditado(null);
    setMostrarModal(true);
  };
  const abrirEditar = (producto: Producto) => {
    //se abre el modal con el producto que se quiere editar
    setProductoEditado(producto);
    setMostrarModal(true);
  };

  const guardarProducto = async (datos: ProductoFormulario) => {
    if (productoEditado) {
      const actualizado = await actualizarProducto(productoEditado._id, datos);
      setDatos((anteriores) => anteriores.map((producto) => producto._id === actualizado._id? actualizado : producto,),
    );
    } else{
      const nuevo = await crearProducto(datos);
      setDatos((anteriores) => [...anteriores, nuevo]);
    }
  };

    const cerrarEliminar = () => {
      setProductoAEliminar(null);
      setErrorEliminar(null);
    };

    //para eliminar el producto
    const confirmarEliminar = async () => {
      if (!productoAEliminar) return;
      try {
      await eliminarProducto(productoAEliminar._id);
      setDatos((anteriores) =>
      anteriores.filter((producto) => producto._id !== productoAEliminar._id),
      );
      cerrarEliminar();
     } catch {
    setErrorEliminar("No se pudo eliminar el producto");
    }
  };



    return (
   <>
      <div className="d-flex justify-content-between align-items-center mb-3">
       <h2 className="mb-3">Productos</h2>
       <Button onClick={abrirAgregar} > Agregar Producto</Button>
       </div>

       <ModalProducto
          mostrar={MostrarModal}
          producto={productoEditado}
          onCerrar={() => setMostrarModal(false)}
          onGuardar={guardarProducto}
        />
      

      <Modal show={!!productoAEliminar} onHide={cerrarEliminar} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro que querés eliminar "{productoAEliminar?.nombre}"?
          {errorEliminar && (
            <p className="text-danger mt-3 mb-0">{errorEliminar}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarEliminar}>Cancelar</Button>
          <Button variant="danger" onClick={confirmarEliminar}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

  



      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      
      {!cargando && !error && (
        <Row>
          {datos.map((producto) => (
            <Col md={4} key ={producto._id}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Subtitle className = "text-secondary mb-2">{producto.categoria}</Card.Subtitle>
                  <Badge bg= "info">{producto.precio}</Badge>
                  <div className="mt-3 d-flex gap-2">
                    <Button size= "sm" 
                    variant="outline-primary" 
                    onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </Button>
                     <Button size= "sm" 
                     variant="outline-danger" 
                     onClick={() => setProductoAEliminar(producto)}
                    >
                      Eliminar
                    </Button>

                    </div>
                </Card.Body>
              </Card>
            </Col>
      ))}
 </Row>
 )}
 </>
 );
}
export default ListaProductos;