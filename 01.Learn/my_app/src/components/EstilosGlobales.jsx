import { useContext } from "react";
import { TemaContext } from "./TemaContext";

export function EstilosGlobales({ children }){
    const { modoOscuro } = useContext(TemaContext);

    const estilos = {
        backgroundColor: modoOscuro ? '#333' : '#eee',
        color: modoOscuro ? '#fff' : '#333',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        transition: 'all 0.3s ease',
    }

    return(
        <div style={estilos}>
            { children }
        </div>
    );
}

export default EstilosGlobales;