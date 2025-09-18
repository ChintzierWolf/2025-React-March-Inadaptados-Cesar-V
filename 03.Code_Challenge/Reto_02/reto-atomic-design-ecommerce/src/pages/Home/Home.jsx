import React from 'react';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Home.css';

// Página principal que renderiza todos los productos
const Home = () => {
  return (
    <div className="home">
      <h1>Catálogo de Productos</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;

