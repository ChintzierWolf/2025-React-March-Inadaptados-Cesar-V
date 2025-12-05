import { Outlet, Link } from "react-router-dom";

const productos = [
    {id: 1, nombre: "Producto 1", precio: 100},
    {id: 2, nombre: "Producto 2", precio: 200},
    {id: 3, nombre: "Producto 3", precio: 300},
]

function Producto() {
    return (
        <div>
            <h2>Lista de productos</h2>
            <ul>
                {productos.map(prod => (
                    <li key={prod.id}>
                        {prod.nombre} - {prod.precio}
                    </li>
                ))}
            </ul>
            <Link to="nuevo">Agregar nuevo producto</Link>
        <Outlet />
        </div>
    );
}

export default Producto;
