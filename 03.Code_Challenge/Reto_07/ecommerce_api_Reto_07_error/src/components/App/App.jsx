import { BrowserRouter, Route, Routes } from "react-router-dom";
// BrowserRouter: Componente que envuelve toda la aplicación para habilitar el enrutamiento
// Route: Define una ruta específica y el componente que se renderiza en esa ruta
// Routes: Componente que agrupa todas las rutas definidas en la aplicación

import { CartProvider } from "../../context/CartContext";
// CartProvider: Proveedor de contexto para el carrito de compras

import Layout from "../../layout/Layout";
// Layout: Componente de diseño que envuelve las páginas de la aplicación

import Cart from "../../pages/Cart";
// Cart: Página del carrito de compras

import CategoryPage from "../../pages/CategoryPage";
// CategoryPage: Página de categoría de productos

import Home from "../../pages/Home";
// Home: Página principal de la aplicación

import Login from "../../pages/Login";
// Login: Página de inicio de sesión

import Product from "../../pages/Product";
// Product: Página de detalles del producto

import Profile from "../../pages/Profile";
// Profile: Página de perfil del usuario

import ProtectedRoute from "../../pages/ProtectedRoute";
// ProtectedRoute: Componente que protege rutas que requieren autenticación

import PurchaseOrder from "../../pages/PurchaseOrder";
// PurchaseOrder: Página de órdenes de compra

import SearchResults from "../../pages/SearchResults";
// SearchResults: Página de resultados de búsqueda

import Settings from "../../pages/Setttings";
// Settings: Página de configuración del usuario

import WishList from "../../pages/WishList";
// WishList: Página de lista de deseos

import SectionField from '../shared/SectionField';
// SectionField: Componente reutilizable para secciones del formulario

import FormField from '../shared/FormField';
// FormField: Componente reutilizable para campos de formulario

//import SectionTitle from '../shared/SectionTitle';
//
//<SectionTitle>Direcciones</SectionTitle>
//<SectionTitle>Métodos de Pago</SectionTitle>
//
//import FormField from '../shared/FormField';
//
//<FormField
//  label="Nombre"
//  name="name"
//  value={form.name}
//  onChange={handleChange}
//  required
//  placeholder="Ej. César Gómez"
///>


function App() {
  return (
    <CartProvider>
      // Envolvemos la aplicación con BrowserRouter para habilitar el enrutamiento

      <BrowserRouter>
      // Layout envuelve las rutas para aplicar un diseño consistente

        <Layout>
          // Definición de las rutas de la aplicación

          <Routes>
            <Route path="/" element={<Home />} />
            // Ruta para la página principal

            <Route path="/cart" element={<Cart />} />
            // Ruta para la página del carrito de compras
            
            <Route path="/login" element={<Login />} />
            // Ruta para la página de inicio de sesión
            
            <Route path="/search" element={<SearchResults />} />
            // Ruta para la página de resultados de búsqueda
            
            <Route path="/product/:productId" element={<Product />} />
            // Ruta para la página de detalles del producto con parámetro productId
            
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            // Ruta para la página de categoría de productos con parámetro categoryId
            
            <Route
              path="/profile"
              // Ruta protegida para la página de perfil del usuario

              element={
                <ProtectedRoute
                // Componente que protege la ruta, redirigiendo a /login si no está autenticado
                  redirectTo="/login"
                  allowedRoles={["admin", "customer", "cliente"]}
                  // allowedRoles define los roles permitidos para acceder a esta ruta
                >
                  <Profile />
                </ProtectedRoute>
              }
            />
            // Rutas protegidas para órdenes de compra, lista de deseos y configuración

            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  // Componente que protege la ruta, redirigiendo a /login si no está autenticado
                  <PurchaseOrder></PurchaseOrder>
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <WishList /> 
                  {/* <WishList></WishList> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                  {/* <Settings></Settings> */}
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Ruta no encontrada</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
// como agregar un comentario en html dentro de jsx es usando {} y dentro de estas llaves usar // Ejemplo: {/* Este es un comentario en jsx */}