# 📝 Estándares de Código y Mejores Prácticas

## 🎯 Propósito

Esta guía establece las convenciones de código, mejores prácticas y estándares de calidad para mantener un código consistente, legible y mantenible en todos los proyectos React del curso.

---

## 📋 Índice

- [🎨 Formato y Estilo](#🎨-formato-y-estilo)
- [⚛️ Convenciones React](#⚛️-convenciones-react)
- [🔧 Variables y Funciones](#🔧-variables-y-funciones)
- [📝 Comentarios y Documentación](#📝-comentarios-y-documentación)
- [🚀 Performance](#🚀-performance)
- [🧪 Testing](#🧪-testing)
- [🔒 Seguridad](#🔒-seguridad)

---

## 🎨 Formato y Estilo

### **Prettier Configuration**

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### **ESLint Configuration**

```json
// .eslintrc.json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "error",
    "react/prop-types": "warn",
    "react/no-unused-state": "warn",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### **Indentación y Espaciado**

```jsx
// ✅ Correcto: 2 espacios de indentación
function ProductCard({ product, onAddToCart }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Agregando...' : 'Agregar al carrito'}
      </button>
    </div>
  );
}

// ❌ Incorrecto: inconsistente
function ProductCard({product,onAddToCart}) {
const [isLoading,setIsLoading]=useState(false);
    const handleClick=async()=>{
setIsLoading(true);
try{
await onAddToCart(product);
}catch(error){
console.error('Error:',error);
}finally{
setIsLoading(false);
}
    };
return <div className="product-card"><h3>{product.name}</h3></div>;
}
```

---

## ⚛️ Convenciones React

### **Componentes Funcionales**

```jsx
// ✅ Correcto: Arrow function con export default
const UserProfile = ({ userId, onUpdate }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hooks siempre al inicio
  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  // Early returns para casos especiales
  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <EmptyState message="Usuario no encontrado" />;
  }

  // JSX principal
  return (
    <div className="user-profile">
      <ProfileHeader user={user} />
      <ProfileDetails user={user} onUpdate={onUpdate} />
    </div>
  );
};

export default UserProfile;

// ❌ Incorrecto: function declaration con lógica mezclada
export default function UserProfile(props) {
  if (props.loading) return <div>Loading...</div>;

  const [user, setUser] = useState(null); // Hook después de early return

  return <div>{props.user?.name}</div>;
}
```

### **Props y PropTypes**

```jsx
// ✅ Correcto: Destructuring con defaults
const ProductCard = ({
  product,
  onAddToCart,
  showPrice = true,
  currency = 'USD',
  className = '',
  ...rest
}) => {
  return (
    <div className={`product-card ${className}`} {...rest}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      {showPrice && (
        <p className="price">
          {formatPrice(product.price, currency)}
        </p>
      )}
      <button onClick={() => onAddToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

// PropTypes (opcional pero recomendado)
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  showPrice: PropTypes.bool,
  currency: PropTypes.string,
  className: PropTypes.string,
};

// ❌ Incorrecto: No usar destructuring
const ProductCard = (props) => {
  return (
    <div>
      <h3>{props.product.name}</h3>
      <p>{props.product.price}</p>
      <button onClick={() => props.onAddToCart(props.product)}>
        Add
      </button>
    </div>
  );
};
```

### **Hooks y Estado**

```jsx
// ✅ Correcto: Hooks bien organizados
const useProductSearch = (initialQuery = '') => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback para funciones que se pasan como props
  const search = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await ProductService.search(searchTerm);
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // useEffect con dependencias correctas
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300); // Debounce

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    search,
  };
};

// ❌ Incorrecto: Hooks mal organizados
const useProductSearch = (initialQuery) => {
  const search = async (term) => { // No memoizada
    // lógica de búsqueda
  };

  const [query, setQuery] = useState(initialQuery || ''); // Default inline

  useEffect(() => {
    search(query); // Dependencia faltante
  }, [query]); // search no está en dependencias

  const [results, setResults] = useState(); // Sin valor inicial
};
```

---

## 🔧 Variables y Funciones

### **Nomenclatura**

```javascript
// ✅ Correcto: Nombres descriptivos
const isUserLoggedIn = checkAuthStatus();
const userAccountBalance = getUserBalance();
const shoppingCartItems = getCartItems();

// Funciones con verbos claros
const fetchUserProfile = async (userId) => { /* ... */ };
const validateEmailFormat = (email) => { /* ... */ };
const calculateTotalPrice = (items) => { /* ... */ };

// Constantes en UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;

// ❌ Incorrecto: Nombres confusos
const data = getStuff(); // ¿Qué datos?
const flag = true; // ¿Qué indica?
const temp = user.profile; // ¿Temporal de qué?

const get = (id) => { /* ... */ }; // ¿Obtener qué?
const check = (val) => { /* ... */ }; // ¿Verificar qué?
```

### **Funciones Puras vs Impuras**

```javascript
// ✅ Correcto: Función pura
const calculateDiscount = (price, discountPercent) => {
  return price * (discountPercent / 100);
};

const formatUserName = (firstName, lastName) => {
  return `${firstName} ${lastName}`.trim();
};

// ✅ Correcto: Función impura claramente marcada
const saveUserToLocalStorage = (user) => {
  try {
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

// ❌ Incorrecto: Función que parece pura pero no lo es
const calculateTotal = (items) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Side effect oculto
  localStorage.setItem('lastTotal', total);
  analytics.track('total_calculated', { total });

  return total;
};
```

### **Destructuring y Spread**

```javascript
// ✅ Correcto: Uso apropiado de destructuring
const { name, email, preferences: { theme, language } } = user;

const handleUserUpdate = ({ userId, ...updateData }) => {
  return updateUser(userId, updateData);
};

// Spread para copiar objetos
const updatedUser = {
  ...user,
  lastLogin: new Date(),
  preferences: {
    ...user.preferences,
    theme: 'dark'
  }
};

// ✅ Correcto: Array destructuring
const [first, second, ...rest] = items;
const [loading, setLoading] = useState(false);

// ❌ Incorrecto: No usar destructuring cuando es beneficioso
const userName = props.user.name;
const userEmail = props.user.email;
const userTheme = props.user.preferences.theme;

// Debería ser:
const {
  user: {
    name: userName,
    email: userEmail,
    preferences: { theme: userTheme }
  }
} = props;
```

---

## 📝 Comentarios y Documentación

### **Comentarios Útiles**

```javascript
// ✅ Correcto: Comentarios que explican el "por qué"
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Retrasar la actualización hasta que el usuario pare de escribir
    // Esto evita hacer demasiadas llamadas a la API
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar timeout si value cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Calcula el precio final con descuentos aplicados
 * @param {number} basePrice - Precio base del producto
 * @param {Object} discounts - Objeto con descuentos disponibles
 * @param {number} discounts.percentage - Descuento porcentual (0-100)
 * @param {number} discounts.fixed - Descuento fijo en moneda
 * @returns {number} Precio final después de aplicar descuentos
 */
const calculateFinalPrice = (basePrice, discounts = {}) => {
  let finalPrice = basePrice;

  // Aplicar descuento porcentual primero
  if (discounts.percentage) {
    finalPrice *= (100 - discounts.percentage) / 100;
  }

  // Luego aplicar descuento fijo
  if (discounts.fixed) {
    finalPrice = Math.max(0, finalPrice - discounts.fixed);
  }

  return Math.round(finalPrice * 100) / 100; // Redondear a 2 decimales
};

// ❌ Incorrecto: Comentarios que explican el "qué" (obvio del código)
// Crear una variable llamada userName
const userName = user.name;

// Retornar el componente JSX
return (
  <div>
    {/* Mostrar el nombre del usuario */}
    <h1>{userName}</h1>
  </div>
);
```

### **JSDoc para Componentes**

```jsx
/**
 * Tarjeta de producto reutilizable con funcionalidades de e-commerce
 *
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.product - Datos del producto
 * @param {string} props.product.id - ID único del producto
 * @param {string} props.product.name - Nombre del producto
 * @param {number} props.product.price - Precio en USD
 * @param {string} props.product.image - URL de la imagen
 * @param {Function} props.onAddToCart - Callback al agregar al carrito
 * @param {boolean} [props.showPrice=true] - Si mostrar el precio
 * @param {string} [props.className=''] - Clases CSS adicionales
 *
 * @example
 * <ProductCard
 *   product={{
 *     id: '1',
 *     name: 'Laptop Gaming',
 *     price: 999.99,
 *     image: '/laptop.jpg'
 *   }}
 *   onAddToCart={(product) => console.log('Added:', product)}
 *   showPrice={true}
 * />
 */
const ProductCard = ({
  product,
  onAddToCart,
  showPrice = true,
  className = ''
}) => {
  // Implementación del componente...
};
```

### **README para Componentes Complejos**

```markdown
<!-- components/DataTable/README.md -->
# DataTable Component

## Overview
Componente de tabla con funcionalidades avanzadas como ordenamiento, filtrado, paginación y selección múltiple.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Object>` | `[]` | Datos a mostrar en la tabla |
| `columns` | `Array<Column>` | `[]` | Configuración de columnas |
| `onRowClick` | `Function` | `undefined` | Callback al hacer click en una fila |
| `sortable` | `boolean` | `true` | Habilitar ordenamiento |
| `filterable` | `boolean` | `true` | Habilitar filtros |

## Usage

```jsx
const columns = [
  { key: 'name', label: 'Nombre', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Rol', filterable: true }
];

<DataTable
  data={users}
  columns={columns}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```
```

---

## 🚀 Performance

### **Optimización de Re-renders**

```jsx
// ✅ Correcto: Usar React.memo para componentes puros
const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        Agregar
      </button>
    </div>
  );
});

// ✅ Correcto: useCallback para funciones estables
const ProductList = ({ products }) => {
  const [cart, setCart] = useState([]);

  // Función memoizada para evitar re-renders de ProductCard
  const handleAddToCart = useCallback((product) => {
    setCart(prevCart => [...prevCart, product]);
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

// ❌ Incorrecto: Crear funciones en cada render
const ProductList = ({ products }) => {
  const [cart, setCart] = useState([]);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          // Nueva función en cada render
          onAddToCart={(product) => setCart([...cart, product])}
        />
      ))}
    </div>
  );
};
```

### **Carga Lazy y Code Splitting**

```jsx
// ✅ Correcto: Lazy loading para rutas
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// ✅ Correcto: Lazy loading condicional
const HeavyChart = lazy(() => import('./components/HeavyChart'));

const Dashboard = () => {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        Mostrar Gráfico
      </button>

      {showChart && (
        <Suspense fallback={<div>Cargando gráfico...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
};
```

---

## 🧪 Testing

### **Nomenclatura de Tests**

```javascript
// ✅ Correcto: Tests descriptivos
describe('ProductCard', () => {
  describe('when product has all required fields', () => {
    it('should display product name and price', () => {
      // Test implementation
    });

    it('should call onAddToCart when button is clicked', () => {
      // Test implementation
    });
  });

  describe('when showPrice is false', () => {
    it('should not display the price', () => {
      // Test implementation
    });
  });

  describe('when product is already in cart', () => {
    it('should disable the add to cart button', () => {
      // Test implementation
    });
  });
});

// ❌ Incorrecto: Tests no descriptivos
describe('ProductCard', () => {
  it('works', () => {
    // ¿Qué significa "works"?
  });

  it('button click', () => {
    // ¿Qué debería pasar al hacer click?
  });
});
```

### **Test Helpers y Utilities**

```javascript
// utils/test-utils.js
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';

// Custom render que incluye providers necesarios
export const renderWithProviders = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <BrowserRouter>
      <CartProvider>
        {children}
      </CartProvider>
    </BrowserRouter>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

// Mock data factories
export const createMockProduct = (overrides = {}) => ({
  id: '1',
  name: 'Test Product',
  price: 99.99,
  image: '/test-image.jpg',
  ...overrides,
});

export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});
```

---

## 🔒 Seguridad

### **Validación de Props**

```jsx
// ✅ Correcto: Validar y sanitizar props
const UserProfile = ({ userId, allowEdit }) => {
  // Validar que userId es válido
  if (!userId || typeof userId !== 'string') {
    return <ErrorBoundary message="ID de usuario inválido" />;
  }

  // Sanitizar boolean
  const canEdit = Boolean(allowEdit);

  return (
    <div>
      <UserInfo userId={userId} />
      {canEdit && <EditButton />}
    </div>
  );
};

// ✅ Correcto: Escapar contenido dinámico cuando sea necesario
const CommentText = ({ comment }) => {
  // Para contenido que viene de usuarios, usar textContent por defecto
  return <p>{comment.text}</p>;

  // Solo usar dangerouslySetInnerHTML cuando sea absolutamente necesario
  // y el contenido esté sanitizado
  // return <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

// ❌ Incorrecto: Confiar en props sin validar
const UserProfile = ({ userId }) => {
  // No validar userId puede causar errores
  return <UserInfo userId={userId} />;
};
```

### **Manejo de Errores**

```jsx
// ✅ Correcto: Error boundaries para capturar errores
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught error:', error, errorInfo);
    // Reportar a servicio de logging en producción
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Algo salió mal</h2>
          <p>Por favor, recarga la página e intenta de nuevo.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// ✅ Correcto: Manejo de errores en hooks
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        // Log error para debugging
        console.error('API fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};
```

---

## 📋 Checklist de Calidad

### **Antes de Commit**

- [ ] ✅ Código formateado con Prettier
- [ ] ✅ Sin errores de ESLint
- [ ] ✅ Nombres de variables y funciones descriptivos
- [ ] ✅ Componentes tienen una sola responsabilidad
- [ ] ✅ Props validadas y con defaults apropiados
- [ ] ✅ Hooks usados correctamente
- [ ] ✅ No hay console.log en código de producción
- [ ] ✅ Comentarios útiles donde sea necesario
- [ ] ✅ Tests pasan correctamente

### **Antes de Production**

- [ ] ✅ Performance optimizada (React.memo, useCallback)
- [ ] ✅ Error boundaries implementados
- [ ] ✅ Lazy loading donde sea apropiado
- [ ] ✅ Código muerto removido
- [ ] ✅ Bundle size verificado
- [ ] ✅ Accesibilidad verificada
- [ ] ✅ SEO optimizado si aplica

---

<div align="center">

**📅 Actualizado:** Enero 2025
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>