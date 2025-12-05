import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

function Producto() {
    const { id } = useParams();
    return (
        <>
            <NavBar/>
            <h1>Producto {id}</h1>
        </>
    );
}

export default Producto;
