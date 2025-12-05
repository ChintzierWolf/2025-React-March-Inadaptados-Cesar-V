const products = [
    {
        id: 1,
        nombre: 'taza',
        precio: 120,
    },
    {
        id: 2,
        nombre: 'cuaderno',
        precio: 75,
    },
    {
        id: 3,
        nombre: 'bolígrafo',
        precio: 35,
    }
];

function ProductList() {
    return (<div>
        <h2>Lista de productos</h2>
        <ul>
            {products.map(product => (
                //<li key={product.id}>{product.nombre} - ${product.precio}</li>
                <li>{product.nombre} - ${product.precio}</li>
            ))}
        </ul>
    </div>);
    // key es una propiedad especial (prop) que se debe de incluir al renderizar listas de elementos
    // Ayuda a react a identificar ítems que han cambiado o han sido agregados o no se han eliminado.
    // Esto es crucial para el rendimiento y para que React no se "confunda" al actualizar el DOM.
    //Lo que está como atributo key, en realidad no se va mostrar en pantalla, sin embargo es importante
    // utilizarla cuando se utilice una propiedad .map
}

export default ProductList;