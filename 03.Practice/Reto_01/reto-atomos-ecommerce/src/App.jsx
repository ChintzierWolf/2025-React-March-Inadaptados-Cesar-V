import "./App.css";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🛒 Mi Tienda Online</h1>
        <p>Reto de Componentes Atómicos</p>
      </header>

      <main className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}

export default App;