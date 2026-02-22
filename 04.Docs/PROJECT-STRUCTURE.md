# 🏗️ Estructura de Proyecto y Arquitectura

## 🎯 Propósito

Esta guía establece las mejores prácticas para organizar código React, desde proyectos pequeños hasta aplicaciones empresariales. Incluye convenciones de carpetas, separación de responsabilidades y escalabilidad.

---

## 📂 Estructura Básica (Proyectos Pequeños)

```
src/
├── components/          # Componentes reutilizables
│   ├── UI/             # Componentes de interfaz básica
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.css
│   │   │   └── index.js
│   │   ├── Input/
│   │   └── Modal/
│   ├── Layout/         # Componentes de layout
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Sidebar/
│   │   └── Layout.jsx
│   └── ProductCard/    # Componentes específicos del dominio
├── pages/              # Páginas principales
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   └── index.js
│   ├── Products/
│   ├── ProductDetail/
│   └── Cart/
├── hooks/              # Custom hooks
│   ├── useCart.js
│   ├── useFetch.js
│   └── useLocalStorage.js
├── services/           # Lógica de negocio y APIs
│   ├── api.js
│   ├── productService.js
│   └── authService.js
├── context/            # Context providers
│   ├── CartContext.js
│   ├── AuthContext.js
│   └── ThemeContext.js
├── utils/              # Utilidades generales
│   ├── constants.js
│   ├── helpers.js
│   └── formatters.js
├── data/               # Datos mock y constantes
│   ├── products.json
│   ├── categories.json
│   └── mockData.js
├── assets/             # Archivos estáticos
│   ├── images/
│   ├── icons/
│   └── fonts/
├── styles/             # Estilos globales
│   ├── globals.css
│   ├── variables.css
│   └── themes.css
├── App.jsx             # Componente principal
├── App.css             # Estilos del componente principal
└── index.js            # Punto de entrada
```

---

## 🏢 Estructura Avanzada (Proyectos Grandes)

```
src/
├── components/          # Componentes reutilizables
│   ├── atoms/          # Componentes básicos (Atomic Design)
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Text/
│   │   └── Icon/
│   ├── molecules/      # Combinaciones de átomos
│   │   ├── SearchBox/
│   │   ├── Card/
│   │   └── FormField/
│   ├── organisms/      # Componentes complejos
│   │   ├── Header/
│   │   ├── ProductGrid/
│   │   └── ShoppingCart/
│   └── templates/      # Layouts de página
│       ├── MainLayout/
│       ├── AuthLayout/
│       └── DashboardLayout/
├── features/           # Características por módulo
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   ├── SignupForm/
│   │   │   └── PasswordReset/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useLogin.js
│   │   ├── services/
│   │   │   └── authAPI.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   └── types/
│   │       └── auth.types.js
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   └── cart/
├── shared/             # Código compartido
│   ├── components/     # Componentes compartidos
│   ├── hooks/         # Hooks compartidos
│   ├── services/      # Servicios compartidos
│   ├── utils/         # Utilidades compartidas
│   ├── constants/     # Constantes globales
│   └── types/         # Tipos TypeScript compartidos
├── pages/             # Páginas de la aplicación
├── routing/           # Configuración de rutas
│   ├── AppRouter.jsx
│   ├── PrivateRoute.jsx
│   └── routes.js
├── store/             # Manejo de estado global
│   ├── slices/        # Redux slices o Zustand stores
│   ├── middleware/
│   └── index.js
├── config/            # Configuración
│   ├── api.config.js
│   ├── env.config.js
│   └── app.config.js
├── assets/
├── styles/
├── App.jsx
└── index.js
```

---

## 📋 Convenciones de Nomenclatura

### **Archivos y Carpetas**

```bash
# ✅ Componentes: PascalCase
ProductCard.jsx
UserProfile.jsx
ShoppingCart.jsx

# ✅ Hooks: camelCase con prefijo 'use'
useCart.js
useLocalStorage.js
useProductSearch.js

# ✅ Servicios: camelCase con sufijo 'Service'
productService.js
authService.js
paymentService.js

# ✅ Utilidades: camelCase
helpers.js
formatters.js
validators.js

# ✅ Constantes: UPPER_SNAKE_CASE
API_ENDPOINTS.js
APP_CONSTANTS.js
```

### **Variables y Funciones**

```javascript
// ✅ Variables: camelCase descriptivo
const isLoading = false;
const userProfileData = {};
const productSearchResults = [];

// ✅ Funciones: camelCase con verbo
const fetchUserData = () => {};
const handleSubmitForm = () => {};
const validateEmailAddress = () => {};

// ✅ Componentes: PascalCase
const ProductCard = () => {};
const UserDashboard = () => {};

// ✅ Constantes: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
```

---

## 🧩 Separación de Responsabilidades

### **Componentes (UI + Lógica de Presentación)**

```jsx
// ✅ Componente enfocado en UI
function ProductCard({ product, onAddToCart, isInCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button
        onClick={() => onAddToCart(product)}
        disabled={isInCart}
        className={isInCart ? 'btn-disabled' : 'btn-primary'}
      >
        {isInCart ? 'En carrito' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
```

### **Hooks (Lógica de Estado)**

```javascript
// ✅ Hook con lógica de negocio
function useCart() {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);

      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [items]);

  const isInCart = useCallback((productId) => {
    return items.some(item => item.id === productId);
  }, [items]);

  return {
    items,
    addToCart,
    removeFromCart,
    getTotalPrice,
    isInCart,
    itemCount: items.length
  };
}
```

### **Services (Lógica de Datos)**

```javascript
// ✅ Servicio para manejar API calls
class ProductService {
  static async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Producto no encontrado');
        }
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  static async searchProducts(query, filters = {}) {
    const searchParams = new URLSearchParams({
      q: query,
      ...filters
    });

    try {
      const response = await fetch(`${API_BASE_URL}/products/search?${searchParams}`);

      if (!response.ok) {
        throw new Error(`Error en búsqueda: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}

export default ProductService;
```

### **Utils (Funciones Auxiliares)**

```javascript
// ✅ Utilidades puras sin side effects
export const formatPrice = (price, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency
  }).format(price);
};

export const formatDate = (date, format = 'short') => {
  return new Intl.DateTimeFormat('es-ES', {
    dateStyle: format
  }).format(new Date(date));
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
```

---

## 📁 Organización por Características (Feature-Based)

### **Ventajas del Feature-Based Structure**

```
src/features/auth/
├── components/
│   ├── LoginForm.jsx      # Solo para auth
│   ├── SignupForm.jsx     # Solo para auth
│   └── PasswordReset.jsx  # Solo para auth
├── hooks/
│   ├── useAuth.js         # Lógica de autenticación
│   └── useLogin.js        # Lógica de login específica
├── services/
│   └── authAPI.js         # API calls de auth
├── utils/
│   └── authHelpers.js     # Utilidades de auth
└── index.js               # Exportaciones públicas

src/features/products/
├── components/
│   ├── ProductList.jsx
│   ├── ProductCard.jsx
│   └── ProductFilters.jsx
├── hooks/
│   ├── useProducts.js
│   └── useProductSearch.js
├── services/
│   └── productAPI.js
└── index.js
```

### **Archivo index.js para Exportaciones**

```javascript
// src/features/auth/index.js
export { default as LoginForm } from './components/LoginForm';
export { default as SignupForm } from './components/SignupForm';
export { useAuth } from './hooks/useAuth';
export { useLogin } from './hooks/useLogin';

// src/features/products/index.js
export { default as ProductList } from './components/ProductList';
export { default as ProductCard } from './components/ProductCard';
export { useProducts } from './hooks/useProducts';
export { useProductSearch } from './hooks/useProductSearch';
```

---

## 🔄 Patrón de Componentes Barrel Exports

### **Estructura de Componente**

```
src/components/Button/
├── Button.jsx          # Componente principal
├── Button.css          # Estilos específicos
├── Button.test.js      # Tests unitarios
├── Button.stories.js   # Storybook stories
└── index.js            # Barrel export
```

### **index.js para Re-exportar**

```javascript
// src/components/Button/index.js
export { default } from './Button';

// src/components/index.js (barrel principal)
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
export { default as ProductCard } from './ProductCard';
```

### **Uso con Barrel Exports**

```javascript
// ✅ Importación limpia
import { Button, Input, Modal } from '../components';

// ❌ Sin barrel exports
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Modal from '../components/Modal/Modal';
```

---

## 🎯 Mejores Prácticas

### **✅ Organización Efectiva**

```bash
# ✅ Agrupar por funcionalidad relacionada
src/features/cart/
  ├── components/
  ├── hooks/
  └── services/

# ✅ Separar componentes reutilizables
src/components/UI/
  ├── Button/
  ├── Input/
  └── Modal/

# ✅ Mantener assets organizados
src/assets/
  ├── images/products/
  ├── icons/ui/
  └── fonts/
```

### **❌ Anti-patrones a Evitar**

```bash
# ❌ Todo en una carpeta
src/components/
  ├── Button.jsx
  ├── Input.jsx
  ├── ProductCard.jsx
  ├── LoginForm.jsx
  ├── Dashboard.jsx
  └── ...100 archivos más

# ❌ Nombres confusos
src/stuff/
src/things/
src/misc/

# ❌ Archivos gigantes
src/components/App.jsx  # 2000 líneas
```

### **🔍 Consejos de Escalabilidad**

1. **Empieza simple**: Usa estructura básica para proyectos pequeños
2. **Refactoriza gradualmente**: Migra a estructura avanzada cuando sea necesario
3. **Mantén consistencia**: Una vez que elijas un patrón, síguelo
4. **Documenta decisiones**: Explica por qué organizaste algo de cierta manera

---

## 🛠️ Herramientas de Ayuda

### **Extensiones VS Code**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### **Scripts de npm Útiles**

```json
{
  "scripts": {
    "create:component": "node scripts/create-component.js",
    "analyze:bundle": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js",
    "lint:fix": "eslint src --fix",
    "format": "prettier --write src/**/*.{js,jsx,css,md}"
  }
}
```

---

<div align="center">

**📅 Actualizado:** Enero 2025
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>