import { Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import PaginaInicio from "./pages/PaginaInicio";
import PaginaProductos from "./pages/PaginaProductos";

// import ".//App.css"


function App() {
  return (
  <>
    <BarraNavegacion />
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/productos" element={<PaginaProductos />} />
    
    </Routes>
  </>
  );
}
export default App