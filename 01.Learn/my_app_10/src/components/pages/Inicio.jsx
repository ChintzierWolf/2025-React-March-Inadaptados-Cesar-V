import { EstilosGlobales } from "../../components/EstilosGlobales";
import NavBar from "../NavBar";
import Contador from "../../components/Contador";
import ContadorReducer from "../../components/ContadorReducer";
import TeclaDetector from "../../components/teclaDetector";

function Inicio() {
    return (
        <EstilosGlobales>
            <NavBar/>
            <h1>Inicio</h1>
            <Contador/>
            <ContadorReducer/>
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