//import Ejemplo from './components/useEffectEjemplo.jsx';
//import Contador from './components/Contador.jsx';
//import SimpleForm from "./components/forms/SimpleForm";
//import Conditional from "./components/conditional/Conditional";
// import ProductList from "./components/lists/ProductList";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contacto from "../pages/Contacto";
import Producto from "../pages/Producto";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/producto/:id" element={<Producto/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
