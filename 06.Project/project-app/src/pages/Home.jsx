import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel/BannerCarousel";
import List from "../components/List/List";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";
import Loading from "../components/common/Loading/Loading";
import homeImagesTop from "../data/homeImagesTop.json";
import homeImagesBottom from "../data/homeImagesBottom.json";
import { fetchProducts } from "../services/productService";
import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (err) {
        setError("No se pudieron cargar los productos. Intenta más tarde.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="welcome-title">
            Bienvenido a <span>GamezVazStore</span>
          </h1>
          <p className="welcome-subtitle">
            Tu destino definitivo para videojuegos, consolas y accesorios de nueva generación.
          </p>
        </div>
      </div>

      {/* Top Banner Carousel */}
      <div className="home-section">
        <div className="banner-wrapper">
          <BannerCarousel banners={homeImagesTop} />
        </div>
      </div>
      
      {/* Product List */}
      <div className="home-section container">
        <div className="section-title-wrapper">
          <h2 className="section-title">Novedades y Destacados</h2>
        </div>
        
        {loading ? (
          <Loading>Cargando arsenal...</Loading>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : products.length > 0 ? (
          <List
            products={products}
            layout="grid"
          />
        ) : (
          <ErrorMessage>No hay productos en el inventario actual.</ErrorMessage>
        )}
      </div>

      {/* Bottom Banner Carousel */}
      <div className="home-section">
        <div className="banner-wrapper">
           <BannerCarousel banners={homeImagesBottom} />
        </div>
      </div>

    </div>
  );
}