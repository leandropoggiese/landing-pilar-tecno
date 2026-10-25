import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { Producto, ProductoFormulario } from "../../types/producto";

type Props = {
  mostrar: boolean;
  producto?: Producto | null;
  onCerrar: () => void;
  onGuardar: (datos: ProductoFormulario) => Promise<void>;
};
const esquema = Yup.object({
  nombre: Yup.string().trim().required("El nombre es obligatorio"),
  descripcion: Yup.string().trim().required("La descripción es obligatoria"),
  precio: Yup.number().required("El precio es obligatorio").min(0, "El precio no puede ser negativo"),
  cantidad: Yup.number().required("La cantidad es obligatoria").min(0, "La cantidad no puede ser negativa"),
  categoria: Yup.string().trim().required("La categoría es obligatoria"),
});

const valoresInicialesVacios: ProductoFormulario = {
  nombre: "",
  descripcion: "",
  precio: 0,
  cantidad: 0,
  categoria: "",
  imagen: "",
};


const ModalProducto = ({ mostrar, producto, onCerrar, onGuardar }: Props) => {
  const formik = useFormik<ProductoFormulario>({
    initialValues: producto ? {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      categoria: producto.categoria,
      precio: producto.precio,
      cantidad: producto.cantidad,
      imagen: producto.imagen || "",
    } : valoresInicialesVacios,
    enableReinitialize: true,
    validationSchema: esquema,
    onSubmit: async (valores, { resetForm, setStatus }) => {
      try {
        await onGuardar(valores);
        resetForm();
      } catch {
        setStatus("No se pudo guardar el producto");
      }
    },
  });


  const cerrar = () => {
    formik.resetForm();
    onCerrar();
  };

  const manejarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    if (archivo.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("imagen", reader.result as string);
    };
    reader.readAsDataURL(archivo);
  };

  const campoTexto = (nombre: "nombre" | "descripcion" | "categoria", etiqueta: string) => (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        name={nombre}
        value={formik.values[nombre]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[nombre] && !!formik.errors[nombre]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[nombre]}
      </Form.Control.Feedback>
    </Form.Group>
  );
  const campoNumero = (
    nombre: "precio" | "cantidad",
    etiqueta: string
  ) => (
    <Form.Group className="mb-3" controlId={nombre}>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        type="number"
        name={nombre}
        value={formik.values[nombre]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isInvalid={formik.touched[nombre] && !!formik.errors[nombre]}
      />
      <Form.Control.Feedback type="invalid">
        {formik.errors[nombre]}
      </Form.Control.Feedback>
    </Form.Group>
  );


  return (
    <Modal show={mostrar} onHide={cerrar} centered>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>{producto ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {campoTexto("nombre", "Nombre")}
          {campoTexto("descripcion", "Descripción")}
          {campoTexto("categoria", "Categoría")}
          
          {/* SECCIÓN DE IMAGEN: ARCHIVO LOCAL O URL */}
          <Form.Group className="mb-3">
            <Form.Label>Subir imagen desde tus archivos</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={manejarArchivo}
            />
            <Form.Text className="text-muted">
              Seleccioná una foto de tu computadora (JPG, PNG, WEBP).
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="imagen">
            <Form.Label>O pegar URL de imagen</Form.Label>
            <Form.Control
              name="imagen"
              placeholder="https://ejemplo.com/foto.jpg"
              value={formik.values.imagen}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Group>

          {/* VISTA PREVIA DE LA IMAGEN */}
          {formik.values.imagen && (
            <div className="mb-3 p-2 bg-light rounded text-center border">
              <p className="small text-muted mb-2">Vista previa de la imagen:</p>
              <img
                src={formik.values.imagen}
                alt="Vista previa"
                style={{
                  maxHeight: "140px",
                  maxWidth: "100%",
                  objectFit: "contain",
                  borderRadius: "6px"
                }}
              />
              <div className="mt-2">
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => formik.setFieldValue("imagen", "")}
                >
                  Quitar imagen
                </Button>
              </div>
            </div>
          )}

          {campoNumero("precio", "Precio ($)")}
          {campoNumero("cantidad", "Cantidad")}

          {formik.status && (
            <p className="text-danger mt-3 mb-0">{formik.status}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrar}>
            Cancelar
          </Button>
          <Button type="submit" variant="warning" className="fw-semibold text-dark" disabled={formik.isSubmitting}>
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalProducto
