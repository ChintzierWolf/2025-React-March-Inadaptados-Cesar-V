//import Ejemplo from './components/useEffectEjemplo.jsx';
//import Contador from './components/Contador.jsx';
//import SimpleForm from "./components/forms/SimpleForm";
//import Conditional from "./components/conditional/Conditional";
// import ProductList from "./components/lists/ProductList";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Contacto from "../pages/Contacto";
import Producto from "../pages/Producto";
import NuevoProducto from "../pages/NuevoProducto";
import { estaAutenticado } from "../../utils/auth";
import NoAutorizado from "../pages/NoAutorizado";
import NoEncontrado from "../pages/NoEncontrado";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos" element={<Producto/>}>
            <Route path='nuevo' 
            element={
            estaAutenticado() ? 
            <NuevoProducto /> : <Navigate to="/no-autorizado" />
            }/>
          </Route>
          <Route path="/no-autorizado" element={<NoAutorizado/>}/>
          <Route path="*" element={<NoEncontrado/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
