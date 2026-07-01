import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon/Icon";
import ProductCard from "../components/ProductCard/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import "./WishList.css";

export default function WishList() {
  const { wishlistItems, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <Icon name="heart" size={64} className="wishlist-empty-icon" />
        <h2>Tu lista de deseos está vacía</h2>
        <p className="muted">
          Parece que aún no has agregado ningún videojuego a tus favoritos. 
          Explora nuestro catálogo y presiona el corazón en los productos que te interesen.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Explorar catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <div>
          <h1>Lista de Deseos</h1>
          <p className="muted">{wishlistItems.length} artículos guardados</p>
        </div>
        <Button variant="outline" onClick={clearWishlist}>
          <Icon name="trash" size={16} />
          Limpiar lista
        </Button>
      </div>

      <div className="wishlist-content">
        <div className="wishlist-vertical-list">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              orientation="vertical"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
