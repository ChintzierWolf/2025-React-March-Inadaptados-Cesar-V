import { Link } from "react-router-dom";
import { useContext } from "react";
import { TemaContext } from "./TemaContext";
import BotonTema from "./BotonTema";

function NavBar (){
    const { modoOscuro } = useContext(TemaContext);

    return(
        <nav>
            <h1>Navbar</h1>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/contacto">Contacto</Link>
                </li>
            </ul>
            <BotonTema/>
        </nav>
    )
}

export default NavBar;