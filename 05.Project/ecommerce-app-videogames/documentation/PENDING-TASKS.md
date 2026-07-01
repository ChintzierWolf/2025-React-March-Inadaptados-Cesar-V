# Tareas Pendientes y Sugerencias de Integración

Este documento enlista las tareas identificadas que deben abordarse en la próxima fase del proyecto, enfocándose principalmente en conectar el frontend local con el servidor de la API backend (`ecommerce-api-videogames`).

## 1. Integración con la API (Backend)
- [ ] **Sustituir Mocks**: Eliminar la dependencia y consumo de archivos estáticos ubicados en la carpeta `data/`.
- [ ] **Configurar Servicios**: Modificar los archivos dentro de la carpeta `services/` (ej. `productService.js`, `userService.js`) para que realicen peticiones asíncronas (`fetch` o `axios`) a la URL local del servidor Node.js (ej. `http://localhost:5000/api/...`).
- [ ] **Autenticación (JWT)**: Programar la intercepción de solicitudes HTTP para enviar el Token JWT del usuario (cuando inicie sesión) dentro de las cabeceras (`Authorization: Bearer <token>`).

## 2. Ajustes de Modelos y Datos
- [ ] **Mapeo de Imágenes (IMPORTANTE)**: Refactorizar `<ProductCard>` y componentes de detalle visual para que la propiedad de la imagen consumida cambie de `product.image` a `product.imagesUrl[0]`, ya que así está mapeado en la colección `Product` de MongoDB.
- [x] **Identificadores (IDs)**: Asegurar que los componentes de React lean los identificadores de MongoDB utilizando `_id` en lugar del genérico `id` al buscar o rutear productos específicos. (Corregido en `ProductCard.jsx`).

## 3. Lógica de Negocio y Estado
- [ ] **Sincronización del Carrito**: Actualmente el Carrito vive estrictamente en el `localStorage` del frontend a través de Context. En una fase madura, planificar si el carrito se sincronizará con la colección `Cart` de la base de datos para recuperar carritos abandonados.
- [ ] **Envío de Órdenes (Checkout)**: Conectar el botón de "Confirmar Orden" en `Checkout.jsx` directamente con el endpoint de creación de órdenes del backend (`POST /api/orders`), enviando las referencias de pago, subtotal, impuestos y dirección reales.

## 4. Mejoras UX/UI a Futuro (Sugerencias)
- [ ] **Paginación / Scroll Infinito**: Al conectarse a una base de datos real con un catálogo expansivo, será necesario manejar los límites de resultados por página en la vista de Exploración.
- [ ] **Filtros Avanzados**: Conectar la lógica de búsqueda por texto, filtrado de categorías y ordenamientos de precios del frontend directamente con los filtros (queries) de MongoDB.
