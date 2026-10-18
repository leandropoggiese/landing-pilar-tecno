import { Container, Row, Col } from "react-bootstrap";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";


import ".//App.css"
import SeccionHero from "./components/SeccionHero/SeccionHero";
function App() {
  return (
  <>
    <BarraNavegacion />
    <SeccionHero />
  </>
  );
}
export default App