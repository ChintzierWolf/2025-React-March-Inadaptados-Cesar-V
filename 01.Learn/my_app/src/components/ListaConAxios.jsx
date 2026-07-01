import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaConAxios(){
    const [ posts, setPosts ] = useState([]);
    const [ cargando, setCargando ] = useState(true);
    const [ error, setError ] = useState("");

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/posts1")
            .then((respuesta) => {
                setPosts(respuesta.data);
                setCargando(false);
            })
            .catch((error) => {
                setError("Error al cargar los posts");
                console.error("Error al cargar los posts:", error);
                setCargando(false);
            });
    }, []);

    if(cargando){
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <h1>Lista de posts</h1>
            <ul>
                {posts && posts.map((post) => {
                    return (
                        <li key={post.id}>{post.title} - {post.body}</li>
                    )
                })}
            </ul>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}