# Documentación del Proyecto: GamezVazStore (Frontend React)

## Descripción del Proyecto
`ecommerce-app-videogames` (GamezVazStore) es una aplicación frontend (SPA - Single Page Application) desarrollada en React para un e-commerce especializado en la venta de videojuegos, consolas y accesorios (enfocado en Xbox y Nintendo). Esta interfaz provee a los usuarios de un entorno visual amigable, responsivo y dinámico con un **diseño moderno inspirado en la estética Gamer/Xbox**. Permite explorar el catálogo, agregar productos al carrito de forma persistente, y simular el flujo completo de compra (Checkout).

## Estado Actual
**Fase de Frontend: Maquetación y Lógica Local Completada.**
El proyecto cuenta con sus vistas principales maquetadas, rutas configuradas, estados globales manejados a través de Context API, y un diseño visual funcional. Actualmente opera con datos simulados (mock data) a la espera de ser integrado plenamente con la API del backend.

## Stack Tecnológico
El ecosistema de la aplicación frontend está construido sobre las siguientes tecnologías y herramientas:
*   **Librería Principal:** React.js (v19)
*   **Enrutador:** React Router DOM (v7)
*   **Gestión de Estado Global:** React Context API (`CartContext`, `ThemeContext`)
*   **Estilos:** CSS puro (Variables CSS, y hojas de estilo a nivel de componente/página)
*   **Entorno de Construcción:** Create React App (`react-scripts`)
*   **Testing:** Jest & React Testing Library (integrado)

## Arquitectura de Software
El frontend está estructurado bajo un enfoque modular orientado a componentes reutilizables, separando de manera clara la interfaz de usuario, la lógica de estado y la comunicación (futura) con los servicios externos:

*   **Components (Componentes):** Elementos visuales reutilizables e independientes (Tarjetas de producto, Carruseles, Formularios, Componentes compartidos).
*   **Pages (Vistas/Páginas):** Componentes de alto nivel que representan las rutas principales de la aplicación (Home, Cart, Checkout, Profile, Login).
*   **Context (Contextos):** Proveedores de estado global para inyectar datos a lo largo del árbol de componentes sin necesidad de "prop drilling". Maneja el estado del Carrito de compras y preferencias de UI (como el Tema).
*   **Services (Servicios):** Módulos encargados de abstraer la lógica de peticiones y obtención de datos. Listos para ser refactorizados para conectarse a la API real.
*   **Data (Datos Mock):** Archivos que simulan la información proveniente de un servidor, permitiendo validar la UI durante el desarrollo.

## Estructura de Directorios
```text
ecommerce-app-videogames/
├── package.json          # Metadatos, dependencias y scripts de ejecución
├── public/               # Assets estáticos y punto de entrada index.html
├── README.md             # Guía rápida e información general
├── documentation/        # Documentación técnica del proyecto frontend
└── src/                  # Código fuente de la aplicación React
    ├── components/       # UI Components (App, ProductCard, BannerCarousel, etc.)
    ├── context/          # Estados globales (CartContext.jsx, ThemeContext.jsx)
    ├── data/             # Datos simulados del catálogo
    ├── layout/           # Estructuras maestras de la interfaz
    ├── pages/            # Vistas enrutadas (Home, Cart, Checkout, Login, etc.)
    ├── services/         # Servicios de conexión (productService, userService...)
    ├── styles/           # Archivos de estilos globales y utilitarios
    ├── utils/            # Funciones de ayuda (formateadores, helpers)
    ├── index.js          # Punto de entrada de React al DOM
    └── index.css         # Estilos globales y reseteos
```

## Flujos Principales de Usuario
La interfaz cubre los siguientes flujos de interacción del e-commerce:

1.  **Navegación y Catálogo:** Exploración de la vista `Home` y las categorías, visualizando los detalles de cada artículo a través del `ProductCard`.
2.  **Gestión de Carrito:** Persistencia y modificación (agregar, actualizar cantidades, eliminar) usando el `CartContext` y la vista `Cart`.
3.  **Proceso de Pago (Checkout):** Flujo simulado de recolección de datos de envío y pago (`Checkout`), finalizando en la pantalla de `OrderConfirmation`.
4.  **Autenticación de Usuarios:** Vistas de `Login` y `Profile`, apoyadas en `ProtectedRoute` para bloquear el acceso a ciertas áreas a usuarios no autenticados.

## Instalación y Ejecución Local
Para levantar el entorno de desarrollo del frontend:
1.  Asegúrate de tener Node.js instalado.
2.  Abre una terminal en la carpeta raíz del proyecto frontend (`ecommerce-app-videogames`).
3.  Instala las dependencias ejecutando: `npm install`
4.  Inicia el servidor de desarrollo ejecutando: `npm start`
5.  La aplicación estará disponible en tu navegador en [http://localhost:3000](http://localhost:3000).

## Próximos Pasos (Fase de Integración)
Teniendo la arquitectura visual y de servicios lista, el siguiente paso natural será:
1. Reemplazar la dependencia de la carpeta `data/` por llamadas asíncronas dentro de `services/` (`fetch` o `axios`).
2. Conectar estos servicios a los correspondientes endpoints de la API (`ecommerce-api-videogames`), administrando adecuadamente los tokens de seguridad JWT proporcionados en el Login.

> [!WARNING]
> **Mapeo de Datos (Atención)**
> Actualmente los mocks del frontend utilizan la propiedad `product.image` para mostrar imágenes. Sin embargo, el modelo `Product` del backend utiliza la propiedad `imagesUrl` (un arreglo de Strings). Al integrar, será imperativo actualizar el componente `ProductCard` (y cualquier otro que renderice productos) para leer `imagesUrl[0]` en lugar de `image`.
