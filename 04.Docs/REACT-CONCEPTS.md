# ⚛️ Conceptos Fundamentales de React

## 🎯 Propósito

Esta guía cubre todos los conceptos esenciales de React que necesitas dominar para desarrollar aplicaciones modernas. Desde lo más básico hasta patrones avanzados utilizados en la industria.

---

## 📋 Índice

- [🏗️ Fundamentos](#🏗️-fundamentos)
- [🔄 Hooks Esenciales](#🔄-hooks-esenciales)
- [🎨 Componentes Avanzados](#🎨-componentes-avanzados)
- [📊 Manejo de Estado](#📊-manejo-de-estado)
- [🌐 Efectos y Side Effects](#🌐-efectos-y-side-effects)
- [🧩 Patrones de Diseño](#🧩-patrones-de-diseño)
- [⚡ Optimización](#⚡-optimización)

---

## 🏗️ Fundamentos

### **JSX - JavaScript XML**

JSX permite escribir HTML-like syntax en JavaScript:

```jsx
// ❌ Sin JSX (React.createElement)
const element = React.createElement('h1', null, 'Hola Mundo');

// ✅ Con JSX (más legible)
const element = <h1>Hola Mundo</h1>;

// Expresiones en JSX
const nombre = 'Usuario';
const saludo = <h1>Hola {nombre}!</h1>;
```

**💡 Tips importantes:**
- JSX debe retornar un elemento padre único
- Usa `className` en lugar de `class`
- Los atributos son camelCase: `onClick`, `htmlFor`

### **Componentes Funcionales**

Componentes como funciones que reciben props y retornan JSX:

```jsx
// Componente básico
function Saludo() {
  return <h1>¡Hola!</h1>;
}

// Componente con props
function SaludoPersonalizado({ nombre, apellido = "Usuario" }) {
  return <h1>¡Hola {nombre} {apellido}!</h1>;
}

// Uso del componente
function App() {
  return (
    <div>
      <Saludo />
      <SaludoPersonalizado nombre="Juan" apellido="Pérez" />
    </div>
  );
}
```

### **Props - Propiedades**

Datos que se pasan de componente padre a hijo:

```jsx
// ✅ Buenas prácticas con props
function ProductCard({
  name,
  price,
  image,
  onAddToCart,
  isOnSale = false
}) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      {isOnSale && <span className="sale-badge">¡En oferta!</span>}
      <button onClick={() => onAddToCart({ name, price })}>
        Agregar al carrito
      </button>
    </div>
  );
}

// Destructuring de props
function App() {
  const handleAddToCart = (product) => {
    console.log('Agregado:', product);
  };

  return (
    <ProductCard
      name="Laptop"
      price={999}
      image="/laptop.jpg"
      onAddToCart={handleAddToCart}
      isOnSale={true}
    />
  );
}
```

---

## 🔄 Hooks Esenciales

### **useState - Estado Local**

Para manejar datos que pueden cambiar:

```jsx
import { useState } from 'react';

function Contador() {
  // [valor, función para actualizar]
  const [count, setCount] = useState(0);

  const incrementar = () => {
    setCount(count + 1);
    // O mejor: setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={incrementar}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

**🎯 Casos comunes de useState:**

```jsx
function FormularioEjemplo() {
  // Estados para diferentes tipos de datos
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  // Actualizar objetos
  const updateUser = (newData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...newData
    }));
  };

  // Actualizar arrays
  const addItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const removeItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
}
```

### **useEffect - Efectos Secundarios**

Para ejecutar código cuando el componente monta, actualiza o desmonta:

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Effect que se ejecuta al montar y cuando cambia userId
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependencias

  // ✅ Effect para cleanup
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer ejecutándose');
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**🎯 Patrones comunes de useEffect:**

```jsx
function ComponenteEjemplo() {
  // 1. Solo al montar (una vez)
  useEffect(() => {
    console.log('Componente montado');
  }, []);

  // 2. En cada render
  useEffect(() => {
    console.log('En cada render');
  });

  // 3. Cuando cambia una dependencia
  useEffect(() => {
    console.log('userId cambió');
  }, [userId]);

  // 4. Con cleanup
  useEffect(() => {
    const subscription = subscribeToSomething();
    return () => subscription.unsubscribe();
  }, []);
}
```

---

## 📊 Manejo de Estado

### **Context API - Estado Global**

Para compartir estado entre componentes sin prop drilling:

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto
const CartContext = createContext();

// 2. Provider del contexto
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    getTotalPrice,
    itemCount: items.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }

  return context;
}

// 4. Uso en componentes
function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
}

function CartSummary() {
  const { items, getTotalPrice, itemCount } = useCart();

  return (
    <div>
      <h3>Carrito ({itemCount} items)</h3>
      <p>Total: ${getTotalPrice()}</p>
    </div>
  );
}

// 5. Envolver la app con el Provider
function App() {
  return (
    <CartProvider>
      <div className="app">
        <ProductCard product={{ id: 1, name: "Laptop", price: 999 }} />
        <CartSummary />
      </div>
    </CartProvider>
  );
}
```

### **useReducer - Estado Complejo**

Para estado con lógica compleja:

```jsx
import { useReducer } from 'react';

// 1. Definir acciones
const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER'
};

// 2. Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    default:
      return state;
  }
}

// 3. Estado inicial
const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
};

// 4. Componente que usa useReducer
function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: ACTIONS.ADD_TODO, payload: text });
  };

  const toggleTodo = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  return (
    <div>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodoFilters
        currentFilter={state.filter}
        onFilterChange={(filter) =>
          dispatch({ type: ACTIONS.SET_FILTER, payload: filter })
        }
      />
    </div>
  );
}
```

---

## 🧩 Patrones de Diseño

### **Custom Hooks**

Extraer lógica reutilizable:

```jsx
// Hook personalizado para fetching de datos
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Hook personalizado para localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Uso de custom hooks
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);
  const [preferences, setPreferences] = useLocalStorage('userPrefs', {});

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <UserPreferences
        preferences={preferences}
        onChange={setPreferences}
      />
    </div>
  );
}
```

### **Render Props Pattern**

Compartir lógica usando una prop que es una función:

```jsx
// Componente con render prop
function MouseTracker({ render }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return render(mousePosition);
}

// Uso del render prop
function App() {
  return (
    <div>
      <MouseTracker
        render={({ x, y }) => (
          <div>
            <h1>Posición del mouse:</h1>
            <p>X: {x}, Y: {y}</p>
          </div>
        )}
      />

      <MouseTracker
        render={({ x, y }) => (
          <div
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 10,
              height: 10,
              backgroundColor: 'red',
              borderRadius: '50%'
            }}
          />
        )}
      />
    </div>
  );
}
```

---

## ⚡ Optimización

### **React.memo**

Evitar re-renders innecesarios:

```jsx
import { memo } from 'react';

// Componente que se re-renderiza solo si sus props cambian
const ProductCard = memo(function ProductCard({ name, price, onAddToCart }) {
  console.log('ProductCard renderizado'); // Para debugging

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={onAddToCart}>Agregar</button>
    </div>
  );
});

// Con función de comparación personalizada
const AdvancedProductCard = memo(
  function AdvancedProductCard({ product, onAddToCart }) {
    return (
      <div>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => onAddToCart(product)}>
          Agregar
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Retorna true si las props son iguales (no re-renderizar)
    return (
      prevProps.product.id === nextProps.product.id &&
      prevProps.product.name === nextProps.product.name &&
      prevProps.product.price === nextProps.product.price
    );
  }
);
```

### **useCallback y useMemo**

Optimizar funciones y cálculos costosos:

```jsx
import { useState, useCallback, useMemo } from 'react';

function ProductList({ products, searchTerm }) {
  const [sortBy, setSortBy] = useState('name');

  // useCallback: memoriza la función
  const handleAddToCart = useCallback((product) => {
    // Esta función solo se recrea si cambian sus dependencias
    console.log('Agregando al carrito:', product);
  }, []); // Sin dependencias, la función nunca cambia

  // useMemo: memoriza el resultado de un cálculo
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Calculando productos filtrados y ordenados...');

    return products
      .filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'price') {
          return a.price - b.price;
        }
        return 0;
      });
  }, [products, searchTerm, sortBy]); // Se recalcula solo si cambian estas dependencias

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Ordenar por nombre</option>
        <option value="price">Ordenar por precio</option>
      </select>

      <div className="product-grid">
        {filteredAndSortedProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
```

### **Lazy Loading**

Carga de componentes bajo demanda:

```jsx
import { lazy, Suspense } from 'react';

// Importación lazy
const Dashboard = lazy(() => import('./components/Dashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));
const Settings = lazy(() => import('./components/Settings'));

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <nav>
        <button onClick={() => setCurrentView('dashboard')}>Dashboard</button>
        <button onClick={() => setCurrentView('profile')}>Perfil</button>
        <button onClick={() => setCurrentView('settings')}>Configuración</button>
      </nav>

      <main>
        <Suspense fallback={<div>Cargando...</div>}>
          {renderCurrentView()}
        </Suspense>
      </main>
    </div>
  );
}
```

---

## 🎯 Mejores Prácticas

### **✅ Dos and Don'ts**

```jsx
// ✅ DO: Usar nombres descriptivos
const [isLoading, setIsLoading] = useState(false);
const [userList, setUserList] = useState([]);

// ❌ DON'T: Nombres confusos
const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);

// ✅ DO: Destructuring de props
function UserCard({ name, email, avatar, onEdit }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <p>{email}</p>
      <button onClick={onEdit}>Editar</button>
    </div>
  );
}

// ❌ DON'T: Usar props directamente
function UserCard(props) {
  return (
    <div className="user-card">
      <img src={props.avatar} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.email}</p>
      <button onClick={props.onEdit}>Editar</button>
    </div>
  );
}

// ✅ DO: Manejar loading states
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Usuario no encontrado</div>;

  return <UserDetails user={user} />;
}

// ❌ DON'T: Ignorar estados intermedios
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  return user ? <UserDetails user={user} /> : null;
}
```

---

## 🔗 Referencias Útiles

- [Documentación oficial de React](https://react.dev/)
- [React Patterns](https://reactpatterns.com/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Awesome React](https://github.com/enaqx/awesome-react)

---

<div align="center">

**📅 Actualizado:** Enero 2025
**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>