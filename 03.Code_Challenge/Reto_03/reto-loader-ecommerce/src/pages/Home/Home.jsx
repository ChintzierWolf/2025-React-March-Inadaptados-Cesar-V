import React, { useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../services/productServices';
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const prods = await fetchProducts();
        setProducts(prods);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <div className="loading">⏳ Cargando ...</div>;
  }

  if (error) {
    return <div className="error">❌ {error}</div>;
  }

  return (
    <div className="home">
      <h2>Nuestros Productos</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}




