import { EstilosGlobales } from "../../components/EstilosGlobales";
import NavBar from "../NavBar";
import Contador from "../../components/Contador";
import ListaConFetch from "../../components/ListaConFetch";
import ListaConAxios from "../../components/ListaConAxios";
import Products from "../../components/Products";
import Gallery from "../../components/Gallery/Gallery"; 

function Inicio() {
    return (
        <EstilosGlobales>
            <Gallery/>
        </EstilosGlobales>
    );
}

export default Inicio;