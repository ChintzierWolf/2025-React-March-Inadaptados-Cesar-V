import { useState, useEffect } from "react";

export default function Products(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if(!response.ok) throw new Error("Error al cargar los productos");
                return response.json();
            })
            .then((data) => setProducts(data.products))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (loading) {
        return <p>Cargando Productos...</p>;
    }

    return (
        <div>
            <h1>Cátalogo de Productos</h1>
            <ul>
                {products && products.map((product) => {
                    return (<li key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.image} alt={product.title} width="100"/>
                        <p><strong>Precio: </strong>${product.price}</p>
                        <p><strong>Categoria: </strong>{product.category}</p>
                        <p><strong>Descripción: </strong>{product.description}</p>
                        <p><strong>Calificación: </strong>{product.rating.rate}</p>
                        <p><strong>Calificaciones: </strong>{product.rating.count}</p>
                        <button>Agregar al carrito</button>
                    </li>)
                })}
            </ul>
        </div>
    );
}
