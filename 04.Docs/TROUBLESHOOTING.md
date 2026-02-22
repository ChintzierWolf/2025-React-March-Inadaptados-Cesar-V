# 🔧 Troubleshooting - Solución de Problemas Comunes

## 🎯 Propósito

Esta guía cubre los problemas más comunes que enfrentan los estudiantes al desarrollar aplicaciones React, con soluciones paso a paso y explicaciones claras para resolverlos rápidamente.

---

## 📋 Índice

- [🚨 Errores de Configuración](#🚨-errores-de-configuración)
- [⚛️ Errores de React](#⚛️-errores-de-react)
- [🔄 Problemas de Estado](#🔄-problemas-de-estado)
- [🌐 Problemas de Red y APIs](#🌐-problemas-de-red-y-apis)
- [🎨 Problemas de CSS y Estilos](#🎨-problemas-de-css-y-estilos)
- [📱 Problemas de Performance](#📱-problemas-de-performance)
- [🛠️ Herramientas de Debug](#🛠️-herramientas-de-debug)

---

## 🚨 Errores de Configuración

### **❌ "Module not found" o "Cannot resolve module"**

**Síntomas:**
```bash
Module not found: Error: Can't resolve './components/Header' in '/src'
Module not found: Error: Can't resolve 'react-router-dom'
```

**Soluciones:**

```bash
# 1. Verificar que el archivo existe en la ruta correcta
ls src/components/Header.jsx  # ¿Existe el archivo?

# 2. Revisar la extensión del archivo
# ✅ Correcto
import Header from './components/Header';     # Header.jsx existe
import Header from './components/Header.jsx'; # Extensión explícita

# ❌ Incorrecto
import Header from './components/header';     # Mayúsculas importan
import Header from './components/Header.js';  # Archivo es .jsx

# 3. Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# 4. Verificar que la dependencia está instalada
npm list react-router-dom
# Si no está: npm install react-router-dom
```

### **❌ "npm start" no funciona**

**Síntomas:**
```bash
Error: ENOENT: no such file or directory
Error: listen EADDRINUSE :::3000
```

**Soluciones:**

```bash
# 1. Puerto 3000 ocupado
# Opción A: Cambiar puerto
PORT=3001 npm start

# Opción B: Matar proceso en puerto 3000
# Mac/Linux:
sudo lsof -t -i tcp:3000 | xargs kill -9
# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# 2. Cache corrupto
npm start -- --reset-cache

# 3. Reinstalar Create React App
npx create-react-app@latest my-app
```

### **❌ Problemas con Git**

**Síntomas:**
```bash
fatal: not a git repository
Permission denied (publickey)
```

**Soluciones:**

```bash
# 1. Inicializar repositorio
git init
git add .
git commit -m "Initial commit"

# 2. Problemas de SSH
# Verificar SSH key
ssh -T git@github.com

# Generar nueva SSH key
ssh-keygen -t ed25519 -C "tu-email@example.com"
# Agregar a GitHub: Settings > SSH and GPG keys

# 3. Usar HTTPS en lugar de SSH
git remote set-url origin https://github.com/usuario/repo.git
```

---

## ⚛️ Errores de React

### **❌ "Cannot read property of undefined"**

**Síntomas:**
```javascript
TypeError: Cannot read property 'name' of undefined
TypeError: Cannot read property 'map' of undefined
```

**Problema:**
```jsx
// ❌ Problema: user puede ser undefined/null
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>  {/* Error si user es undefined */}
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Problema: products puede ser undefined
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (  {/* Error si products es undefined */}
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

**Soluciones:**

```jsx
// ✅ Solución 1: Optional chaining
function UserProfile({ user }) {
  return (
    <div>
      <h1>{user?.name || 'Usuario'}</h1>
      <p>{user?.email || 'Sin email'}</p>
    </div>
  );
}

// ✅ Solución 2: Early return
function UserProfile({ user }) {
  if (!user) {
    return <div>Cargando usuario...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// ✅ Solución 3: Default values
function ProductList({ products = [] }) {
  if (products.length === 0) {
    return <div>No hay productos</div>;
  }

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}

// ✅ Solución 4: Usar defaultProps
UserProfile.defaultProps = {
  user: null,
};

ProductList.defaultProps = {
  products: [],
};
```

### **❌ "Each child in a list should have a unique key prop"**

**Síntomas:**
```bash
Warning: Each child in a list should have a unique "key" prop.
```

**Problema:**
```jsx
// ❌ Sin key
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div>{product.name}</div>  {/* No key */}
      ))}
    </div>
  );
}

// ❌ Key no único
function ProductList({ products }) {
  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>{product.name}</div>  {/* Index como key */}
      ))}
    </div>
  );
}
```

**Soluciones:**

```jsx
// ✅ Key único y estable
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>  {/* ID único */}
      ))}
    </div>
  );
}

// ✅ Si no hay ID, crear key único
function ProductList({ products }) {
  return (
    <div>
      {products.map(product => (
        <div key={`${product.name}-${product.category}`}>
          {product.name}
        </div>
      ))}
    </div>
  );
}

// ✅ Generar ID si no existe
function ProductList({ products }) {
  const productsWithId = products.map((product, index) => ({
    ...product,
    id: product.id || `temp-id-${index}-${product.name}`,
  }));

  return (
    <div>
      {productsWithId.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### **❌ "Maximum update depth exceeded"**

**Síntomas:**
```bash
Error: Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
```

**Problema:**
```jsx
// ❌ Problema: Llamada infinita a setState
function Counter() {
  const [count, setCount] = useState(0);

  // Se ejecuta en cada render, causando loop infinito
  setCount(count + 1);

  return <div>{count}</div>;
}

// ❌ Problema: useEffect sin dependencias
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }); // Sin array de dependencias, se ejecuta en cada render

  return <div>{user?.name}</div>;
}
```

**Soluciones:**

```jsx
// ✅ Solución: useState con función
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
    </div>
  );
}

// ✅ Solución: useEffect con dependencias correctas
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Solo se ejecuta cuando userId cambia

  return <div>{user?.name}</div>;
}

// ✅ Solución: Conditional state update
function DataComponent({ shouldFetch }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (shouldFetch && !data) {  // Solo fetch si necesario
      fetchData().then(setData);
    }
  }, [shouldFetch, data]);

  return <div>{data}</div>;
}
```

---

## 🔄 Problemas de Estado

### **❌ Estado no se actualiza**

**Síntomas:**
- useState no refleja cambios
- useEffect no se ejecuta
- Componente no re-renderiza

**Problemas comunes:**

```jsx
// ❌ Problema 1: Mutación directa del estado
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // Mutación directa
    setTodos(todos); // React no detecta el cambio
  };

  // ...
}

// ❌ Problema 2: Dependencias faltantes en useEffect
function UserData({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // userId debería estar en dependencias

  // ...
}

// ❌ Problema 3: Estado asíncrono no considerado
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // Solo incrementa 1, no 2
  };

  // ...
}
```

**Soluciones:**

```jsx
// ✅ Solución 1: Immutable updates
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text }
    ]);
  };

  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // ...
}

// ✅ Solución 2: Dependencias correctas
function UserData({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]); // Dependencia correcta

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}

// ✅ Solución 3: Functional updates
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1); // Ahora incrementa 2
  };

  const incrementBy = (amount) => {
    setCount(prevCount => prevCount + amount);
  };

  // ...
}
```

### **❌ Props no se actualizan en componentes hijos**

**Síntomas:**
- Componente hijo no refleja cambios en props
- Estado del padre cambia pero hijo no re-renderiza

**Problema:**
```jsx
// ❌ Problema: Referencia de objeto/función cambia
function Parent() {
  const [count, setCount] = useState(0);

  const config = {
    theme: 'dark',
    count: count
  }; // Nuevo objeto en cada render

  const handleClick = () => {
    console.log('clicked');
  }; // Nueva función en cada render

  return (
    <Child config={config} onClick={handleClick} />
  );
}

const Child = React.memo(({ config, onClick }) => {
  // Se re-renderiza siempre porque config y onClick son nuevos
  console.log('Child rendered');
  return <div>{config.count}</div>;
});
```

**Soluciones:**

```jsx
// ✅ Solución: useMemo y useCallback
function Parent() {
  const [count, setCount] = useState(0);

  const config = useMemo(() => ({
    theme: 'dark',
    count: count
  }), [count]); // Solo cambia cuando count cambia

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // Función estable

  return (
    <Child config={config} onClick={handleClick} />
  );
}

// ✅ Alternativa: Pasar props primitivos
function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <Child
      theme="dark"
      count={count}
      onClick={handleClick}
    />
  );
}

const Child = React.memo(({ theme, count, onClick }) => {
  console.log('Child rendered');
  return <div>{count}</div>;
});
```

---

## 🌐 Problemas de Red y APIs

### **❌ CORS Errors**

**Síntomas:**
```bash
Access to fetch at 'https://api.example.com' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Soluciones:**

```javascript
// 1. Proxy en package.json (desarrollo)
{
  "name": "my-app",
  "version": "0.1.0",
  "proxy": "https://api.example.com",
  "dependencies": {
    // ...
  }
}

// Luego usar rutas relativas
const response = await fetch('/api/products'); // En lugar de https://api.example.com/api/products

// 2. Configurar proxy manual en src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.example.com',
      changeOrigin: true,
    })
  );
};

// 3. Headers CORS en requests
const fetchWithCORS = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...options.headers,
    },
    mode: 'cors',
  });

  return response;
};
```

### **❌ Fetch no funciona / Network errors**

**Síntomas:**
```bash
TypeError: Failed to fetch
Network Error
```

**Problemas y soluciones:**

```javascript
// ❌ Problema: No manejar errores HTTP
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  const data = await response.json(); // Error si response no es 200
  return data;
};

// ✅ Solución: Manejo completo de errores
const fetchProducts = async () => {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Error de red: Revisa tu conexión a internet');
    }
    throw error;
  }
};

// ✅ Hook personalizado con manejo robusto
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: cancelar request si component se desmonta
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

// Uso del hook
function ProductList() {
  const { data: products, loading, error } = useApi('/api/products');

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>No hay productos</div>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **❌ JSON Parse errors**

**Síntomas:**
```bash
SyntaxError: Unexpected token < in JSON at position 0
```

**Problema y solución:**

```javascript
// ❌ Problema: Asumir que response es JSON
const fetchData = async () => {
  const response = await fetch('/api/data');
  const data = await response.json(); // Error si response es HTML/text
  return data;
};

// ✅ Solución: Verificar Content-Type
const fetchData = async () => {
  const response = await fetch('/api/data');

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    const text = await response.text();
    throw new Error(`Expected JSON, got: ${text.substring(0, 100)}...`);
  }
};

// ✅ Función helper para diferentes tipos de respuesta
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return await response.json();
  }

  if (contentType?.includes('text/')) {
    return await response.text();
  }

  if (contentType?.includes('application/octet-stream')) {
    return await response.blob();
  }

  throw new Error(`Unsupported content type: ${contentType}`);
};
```

---

## 🎨 Problemas de CSS y Estilos

### **❌ Estilos no se aplican**

**Síntomas:**
- CSS no se ve reflejado
- Clases CSS no funcionan
- Estilos se ven pero no como esperado

**Problemas comunes:**

```jsx
// ❌ Problema 1: class en lugar de className
function Button() {
  return <button class="btn-primary">Click me</button>; // Error
}

// ❌ Problema 2: CSS import incorrecto
import './Button.css'; // Archivo no existe
import 'Button.css';   // Ruta incorrecta

// ❌ Problema 3: Especificidad CSS
.button {
  color: blue;
}

.btn-primary {
  color: red; // Puede no aplicarse si .button es más específico
}
```

**Soluciones:**

```jsx
// ✅ Solución 1: className correcto
function Button({ variant = 'primary', children }) {
  return (
    <button className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}

// ✅ Solución 2: CSS imports correctos
import './Button.css';           // Relativo al archivo actual
import '../styles/Button.css';   // Subir directorio
import 'bootstrap/dist/css/bootstrap.min.css'; // node_modules

// ✅ Solución 3: Clases condicionales
function Button({ variant, disabled, active }) {
  const classes = [
    'btn',
    `btn-${variant}`,
    disabled && 'btn-disabled',
    active && 'btn-active'
  ].filter(Boolean).join(' ');

  return <button className={classes}>Click me</button>;
}

// ✅ Alternativa: Usar clsx o classnames
import clsx from 'clsx';

function Button({ variant, disabled, active }) {
  return (
    <button
      className={clsx(
        'btn',
        `btn-${variant}`,
        {
          'btn-disabled': disabled,
          'btn-active': active
        }
      )}
    >
      Click me
    </button>
  );
}
```

### **❌ CSS Modules no funcionan**

**Problemas:**

```jsx
// ❌ Problema: Import incorrecto de CSS Modules
import './Button.css'; // Normal CSS, no modules
import styles from './Button.css'; // Archivo no configurado como module

// ❌ Problema: Sintaxis incorrecta
<button className={styles.btnPrimary}>Click</button> // Propiedad no existe
```

**Soluciones:**

```jsx
// ✅ Solución: Naming convention correcto
// Archivo: Button.module.css
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.btnPrimary}>
      Click me
    </button>
  );
}

// Button.module.css
.btnPrimary {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}

.btnSecondary {
  background-color: gray;
  color: black;
}

// ✅ Múltiples clases
function Button({ variant, size }) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn${variant}`]} ${styles[size]}`}
    >
      Click me
    </button>
  );
}

// ✅ Con clsx
import clsx from 'clsx';

function Button({ variant, size, disabled }) {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[`btn${variant}`],
        styles[size],
        disabled && styles.disabled
      )}
    >
      Click me
    </button>
  );
}
```

---

## 📱 Problemas de Performance

### **❌ Re-renders excesivos**

**Síntomas:**
- App lenta o con lag
- Componentes se renderizan demasiado
- Console.log muestra renders constantes

**Problemas:**

```jsx
// ❌ Problema 1: Crear objetos/funciones en render
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <Child
      config={{ theme: 'dark' }}  // Nuevo objeto cada render
      onClick={() => setCount(count + 1)}  // Nueva función cada render
    />
  );
}

// ❌ Problema 2: Estado innecesario
function ProductList({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products.filter(p => p.active));
  }, [products]); // Se ejecuta en cada cambio

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Soluciones:**

```jsx
// ✅ Solución 1: useMemo y useCallback
function Parent() {
  const [count, setCount] = useState(0);

  const config = useMemo(() => ({ theme: 'dark' }), []);

  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <Child config={config} onClick={handleClick} />
  );
}

// ✅ Solución 2: Computed values con useMemo
function ProductList({ products, searchTerm }) {
  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.active &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// ✅ Componente optimizado con React.memo
const ProductCard = React.memo(({ product, onAddToCart }) => {
  console.log(`Rendering product: ${product.name}`);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => onAddToCart(product)}>
        Add to cart
      </button>
    </div>
  );
});

// ✅ Custom hook para lógica compleja
function useProductFilters(products) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = category === 'all' ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });
  }, [products, searchTerm, category, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    category,
    setCategory,
    sortBy,
    setSortBy,
    filteredAndSortedProducts,
  };
}
```

---

## 🛠️ Herramientas de Debug

### **React Developer Tools**

```jsx
// ✅ Usar displayName para debugging
const ProductCard = ({ product }) => {
  return <div>{product.name}</div>;
};
ProductCard.displayName = 'ProductCard';

// ✅ Agregar debug info en desarrollo
const DebugInfo = ({ data }) => {
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      background: 'black',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto'
    }}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Uso en componente
function App() {
  const [debugData, setDebugData] = useState({});

  return (
    <div>
      {/* Tu app */}
      <DebugInfo data={debugData} />
    </div>
  );
}
```

### **Console Debugging**

```javascript
// ✅ Console.log mejorado
const debugLog = (label, data) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🐛 ${label}`);
    console.log('Data:', data);
    console.log('Type:', typeof data);
    console.log('Keys:', Object.keys(data || {}));
    console.groupEnd();
  }
};

// ✅ Hook para debugging
const useDebugValue = (value, formatter) => {
  React.useDebugValue(value, formatter);
  return value;
};

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  // Aparece en React DevTools
  useDebugValue(count, count => `Count: ${count}`);

  return [count, setCount];
};
```

### **Error Logging**

```javascript
// ✅ Error boundary con logging
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log a servicio en producción
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo);
    } else {
      console.group('🚨 Error Boundary');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.groupEnd();
    }
  }

  logErrorToService = (error, errorInfo) => {
    // Enviar a Sentry, LogRocket, etc.
    console.log('Logging error to service...', { error, errorInfo });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Algo salió mal 😭</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details (click to expand)</summary>
            <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
            <p><strong>Stack:</strong> {this.state.errorInfo.componentStack}</p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🚨 Checklist de Emergencia

### **Cuando algo no funciona:**

1. **🔍 Revisa la consola del navegador**
   - ¿Hay errores en rojo?
   - ¿Hay warnings en amarillo?

2. **🛠️ Verifica la instalación**
   ```bash
   npm install
   npm start
   ```

3. **🔄 Reinicia el servidor**
   ```bash
   Ctrl + C  # Parar servidor
   npm start # Reiniciar
   ```

4. **🧹 Limpia cache**
   ```bash
   npm start -- --reset-cache
   # O borrar node_modules
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **📂 Revisa rutas de archivos**
   - ¿Los imports son correctos?
   - ¿Los archivos existen?
   - ¿Las mayúsculas/minúsculas coinciden?

6. **🔍 Usa React Developer Tools**
   - ¿Los componentes se renderizan?
   - ¿Las props llegan correctamente?
   - ¿El estado es el esperado?

---

<div align="center">

**📅 Actualizado:** Enero 2025
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>