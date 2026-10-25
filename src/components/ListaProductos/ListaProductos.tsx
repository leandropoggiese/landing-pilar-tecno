import { useState, useEffect } from "react";
import { Modal, Card, Row, Col, Badge, Button, Form } from "react-bootstrap";
import {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
  obtenerProductosBajoStock,
  obtenerProductosPorCategoria,
} from "../../services/productoService";
import type { Producto, ProductoFormulario } from "../../types/producto";
import ModalProducto from "../ModalProducto/ModalProducto";

const ListaProductos = () => {
  const [datos, setDatos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [MostrarModal, setMostrarModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState<Producto | null>(null);
  const [productoAEliminar, setProductoAEliminar] = useState<Producto | null>(null);
  const [errorEliminar, setErrorEliminar] = useState<string | null>(null);

  // Estados para los filtros
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [filtroBajoStock, setFiltroBajoStock] = useState(false);

  // 1. Cargar todos los productos y guardar lista de categorías únicas
  const cargarTodos = () => {
    setCargando(true);
    setError(null);
    setFiltroBajoStock(false);
    setCategoriaSeleccionada("");

    obtenerProductos()
      .then((res) => {
        setDatos(res);
        // Extraemos categorías únicas sin repetir
        const categoriasUnicas = Array.from(
          new Set(res.map((p) => p.categoria).filter(Boolean))
        );
        setCategorias(categoriasUnicas);
      })
      .catch(() => setError("No se pudieron cargar los datos"))
      .finally(() => setCargando(false));
  };

  // 2. Filtrar por bajo stock
  const manejarBajoStock = () => {
    setCargando(true);
    setError(null);
    setFiltroBajoStock(true);
    setCategoriaSeleccionada("");

    obtenerProductosBajoStock(5)
      .then(setDatos)
      .catch(() => setError("No se pudieron filtrar productos con bajo stock"))
      .finally(() => setCargando(false));
  };

  // 3. Filtrar por categoría
  const manejarCambioCategoria = (categoria: string) => {
    if (!categoria) {
      cargarTodos();
      return;
    }

    setCategoriaSeleccionada(categoria);
    setFiltroBajoStock(false);
    setCargando(true);
    setError(null);

    obtenerProductosPorCategoria(categoria)
      .then(setDatos)
      .catch(() => setError(`No se pudieron cargar productos de "${categoria}"`))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    cargarTodos();
  }, []);

  const abrirAgregar = () => {
    setProductoEditado(null);
    setMostrarModal(true);
  };

  const abrirEditar = (producto: Producto) => {
    setProductoEditado(producto);
    setMostrarModal(true);
  };

  const guardarProducto = async (datosForm: ProductoFormulario) => {
    if (productoEditado) {
      const actualizado = await actualizarProducto(productoEditado._id, datosForm);
      setDatos((anteriores) =>
        anteriores.map((p) => (p._id === actualizado._id ? actualizado : p))
      );
    } else {
      const nuevo = await crearProducto(datosForm);
      setDatos((anteriores) => [...anteriores, nuevo]);
      // Si es una nueva categoría, la sumamos a la lista
      if (nuevo.categoria && !categorias.includes(nuevo.categoria)) {
        setCategorias((prev) => [...prev, nuevo.categoria]);
      }
    }
    setMostrarModal(false);
  };

  const cerrarEliminar = () => {
    setProductoAEliminar(null);
    setErrorEliminar(null);
  };

  const confirmarEliminar = async () => {
    if (!productoAEliminar) return;
    try {
      await eliminarProducto(productoAEliminar._id);
      setDatos((anteriores) =>
        anteriores.filter((p) => p._id !== productoAEliminar._id)
      );
      cerrarEliminar();
    } catch {
      setErrorEliminar("No se pudo eliminar el producto");
    }
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h2>Productos</h2>
        <Button variant="warning" className="fw-semibold text-dark shadow-sm" onClick={abrirAgregar}>
          + Agregar Producto
        </Button>
      </div>

      {/* BARRA DE FILTROS Y ACCIONES DE NEGOCIO */}
      <Card className="mb-4 p-3 bg-white border-0 shadow-sm">
        <Row className="g-2 align-items-center">
          <Col md={4} sm={12}>
            <Form.Select
              value={categoriaSeleccionada}
              onChange={(e) => manejarCambioCategoria(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md="auto" sm={6}>
            <Button
              variant={filtroBajoStock ? "warning" : "outline-warning"}
              onClick={manejarBajoStock}
            >
              ⚠️ Ver Bajo Stock
            </Button>
          </Col>

          {(filtroBajoStock || categoriaSeleccionada) && (
            <Col md="auto" sm={6}>
              <Button variant="outline-secondary" onClick={cargarTodos}>
                Restablecer filtros
              </Button>
            </Col>
          )}
        </Row>
      </Card>

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
          <Button variant="secondary" onClick={cerrarEliminar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {cargando && <p className="text-muted">Cargando productos...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!cargando && !error && datos.length === 0 && (
        <p className="text-muted">No se encontraron productos con el filtro aplicado.</p>
      )}

      {!cargando && !error && datos.length > 0 && (
        <Row>
          {datos.map((producto) => (
            <Col md={4} sm={6} xs={12} key={producto._id}>
              <Card className="mb-3 shadow-sm h-100">
                <div
                  style={{
                    height: "220px",
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  {/* Fondo ambiental difuminado para que el cuadro esté siempre lleno y vivo */}
                  <img
                    src={
                      producto.imagen ||
                      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80"
                    }
                    alt=""
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "blur(14px) brightness(0.97)",
                      transform: "scale(1.2)",
                      opacity: 0.35,
                    }}
                  />

                  {/* Imagen principal nítida: se ve completa y en tamaño protagonista */}
                  <img
                    src={
                      producto.imagen ||
                      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80"
                    }
                    alt={producto.nombre}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      maxHeight: "210px",
                      objectFit: "contain",
                      padding: "6px",
                      zIndex: 1,
                    }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80";
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Subtitle className="text-secondary mb-2">
                    {producto.categoria}
                  </Card.Subtitle>
                  <p className="text-muted small flex-grow-1">
                    {producto.descripcion}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Badge bg="warning" text="dark" className="fs-6 shadow-sm">
                      ${producto.precio}
                    </Badge>
                    <Badge
                      bg={producto.cantidad < 5 ? "danger" : "secondary"}
                      title={producto.cantidad < 5 ? "Stock crítico" : "Stock disponible"}
                    >
                      Stock: {producto.cantidad}
                    </Badge>
                  </div>

                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-warning"
                      className="w-50 text-dark border-warning"
                      onClick={() => abrirEditar(producto)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="w-50"
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
};

export default ListaProductos;
