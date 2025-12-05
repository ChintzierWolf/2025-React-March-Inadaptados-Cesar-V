import { EstilosGlobales } from "../../components/EstilosGlobales";
import NavBar from "../NavBar";
import Contador from "../../components/Contador";
import TeclaDetector from "../../components/teclaDetector";

function Inicio() {
    return (
        <EstilosGlobales>
            <NavBar/>
            <h1>Inicio</h1>
            <Contador/>
            <TeclaDetector tecla='a'/>
            <TeclaDetector tecla='b'/>
            <TeclaDetector tecla='c'/>
            <TeclaDetector tecla='d'/>
            <TeclaDetector tecla='e'/>
            <TeclaDetector tecla=' '/>
        </EstilosGlobales>
    );
}

export default Inicio;