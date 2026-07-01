import { useEffect, useState } from "react";

export default function ListaConFetch() {
    const [ usuarios, setUsuarios ] = useState([]);
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al cargar los usuarios");
                }
                return respuesta.json();
            })
            .then((data) => {
                setUsuarios(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error('Error al cargar los usuarios:', error);
                setCargando(false);
            });
    }, []);

    if(cargando){
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Lista de usuarios</h1>
            <ul>
                {usuarios.map((usuario) => {
                    return (
                        <li key={usuario.id}>{usuario.name} - {usuario.email}</li>
                    )
                })}
            </ul>
        </div>
    );
}