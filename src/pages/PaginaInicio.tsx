import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import BotonColor from "../components/BotonColor/BotonColor";
const PaginaInicio = () => {
 return (
    <section className="py-5 bg-light">
 <Container className="py-5">
 <Row className="align-items-center g-4">
 <Col md={6}>
 <h1 className="display-5 fw-bold">Pilar Tecno</h1>
 <p className="lead text-secondary">
 Bienvenido al control de stock de Pilar Tecno. Consultá el catálogo de productos y llevá el que quieras.
 </p>
 <div className="d-flex gap-2">
 <Link to="/productos" className="btn btn-primary">
 Ver Productos
 </Link>
 <BotonColor />
 </div>
 </Col>
 <Col md={6}>
   <div
   className= "rounded-4 bg-white shadow-sm d-flex align-items-center justify-content-center"
   style={{minHeight: "220px"}}
   >
      <span className= "text-secondary"> Tus productos favoritos siempre a mano

      </span>
   </div>
 </Col>
 </Row>
 </Container>
 </section>
 );
};
export default PaginaInicio; 