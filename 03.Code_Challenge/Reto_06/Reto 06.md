# 📝 Reto 06 — To-Do List Simple

> **⏱️ Tiempo**: 90-120 minutos
> **🎯 Objetivo**: Crear una app de tareas usando React sin librerías extras

---

## 🎮 ¿Qué vas a construir?

Una lista de tareas donde puedas:
1. ✅ Agregar tareas nuevas
2. ☑️ Marcar tareas como completadas
3. 🗑️ Eliminar tareas
4. 🔍 Filtrar por: Todas / Pendientes / Hechas
5. 💾 (Opcional) Guardar en localStorage

## 🌐 Demo en Vivo

**[Ver Demo en GitHub Pages](https://rodrigoBermejo.github.io/to-do-project/)**

---

## 📋 Reglas del Reto

- ✅ **Usa librerías de UI** (Material, Bootstrap, etc.)
- ❌ **No uses** React Router
- ✅ **Sí usa** inputs controlados (con `value` y `onChange`)
- ✅ **Una sola fuente de verdad** para las tareas (en `App.js`)

---

## 🏗️ Paso 1: Planea tu App (10 min)

### Dibuja en papel (o Paint):

```
┌─────────────────────────────┐
│      📝 To-Do List          │  ← Título
├─────────────────────────────┤
│ [________] [Agregar]        │  ← Formulario
├─────────────────────────────┤
│ [Todas][Pendientes][Hechas] │  ← Filtros
├─────────────────────────────┤
│ ☐ Comprar leche    [X]      │  ← Tarea 1
│ ☑ Estudiar React   [X]      │  ← Tarea 2
│ ☐ Hacer ejercicio  [X]      │  ← Tarea 3
├─────────────────────────────┤
│ 2 pendientes / 1 hecha      │  ← Contador
└─────────────────────────────┘
```

**Pregúntate**:
- ¿Dónde guardo la lista de tareas? → En `App.js`
- ¿Cómo sé cuál filtro está activo? → Con un estado `filter`
- ¿Qué información tiene cada tarea? → `id`, `title`, `done`

---

## 🧩 Paso 2: Estructura de Componentes (15 min)

### Crea esta estructura de carpetas:

```
src/
├── App.js              ← Cerebro (tiene las tareas)
├── components/
│   ├── TodoForm.jsx    ← Formulario para agregar
│   ├── TodoList.jsx    ← Lista de tareas
│   ├── TodoItem.jsx    ← Una tarea individual
│   └── FilterBar.jsx   ← Botones de filtro
```

### ¿Qué hace cada componente?

| Componente | Responsabilidad | Recibe (props) |
|------------|----------------|----------------|
| **App.js** | Guarda todas las tareas y el filtro | - |
| **TodoForm** | Input + botón para agregar | `onAdd` |
| **FilterBar** | Botones: Todas/Pendientes/Hechas | `filter`, `onFilterChange` |
| **TodoList** | Muestra lista de tareas filtradas | `todos`, `onToggle`, `onDelete` |
| **TodoItem** | Checkbox + título + botón eliminar | `todo`, `onToggle`, `onDelete` |

---

## 📦 Paso 3: Define el Estado (20 min)

### En `App.js`, necesitas 2 estados:

#### Estado 1: Lista de tareas
```javascript
// Cada tarea es un objeto con:
{
  id: "1",           // único (usa Date.now() o crypto.randomUUID())
  title: "Comprar leche",
  done: false        // true = hecha, false = pendiente
}
```

**Empieza con 2-3 tareas de ejemplo** para probar.

#### Estado 2: Filtro actual
```javascript
// Puede ser: 'all', 'active', 'done'
```

### 🤔 Piensa:
- ¿Cómo agregas una tarea nueva? → Usa spread operator `[...todos, nuevaTarea]`
- ¿Cómo cambias `done` de una tarea? → Usa `map()` y busca por `id`
- ¿Cómo eliminas una tarea? → Usa `filter()` y excluye ese `id`

---

## 📝 Paso 4: TodoForm - Agregar Tareas (25 min)

### Este componente debe:

1. **Tener un input controlado**:
   - Estado local para el título
   - `value={titulo}` y `onChange`

2. **Validar antes de agregar**:
   - Si el título está vacío → mostrar error
   - Si está ok → llamar a `onAdd(nuevaTarea)` y limpiar input

3. **Mostrar feedback visual**:
   ```
   [_______________]  [Agregar]
   ⚠️ El título no puede estar vacío
   ```

### 💡 Pistas sin código:
- Usa `trim()` para quitar espacios
- El botón puede estar deshabilitado si no hay texto
- El mensaje de error debe tener `role="alert"` para accesibilidad

---

## ☑️ Paso 5: TodoItem - Una Tarea (20 min)

### Este componente muestra:

```
☐ Comprar leche                    [Eliminar]
```

### Debe tener:

1. **Checkbox**:
   - `checked={todo.done}`
   - `onChange` llama a `onToggle(todo.id)`

2. **Título**:
   - Si está `done`, muestra con estilo tachado

3. **Botón eliminar**:
   - `onClick` llama a `onDelete(todo.id)`

### 💡 Pistas:
- Usa estilos CSS para tachar: `text-decoration: line-through`
- El checkbox y el label deben estar conectados con `id` y `htmlFor`

---

## 📋 Paso 6: TodoList - Mostrar Todas (15 min)

### Este componente:

1. **Recibe** array de tareas filtradas
2. **Usa** `map()` para mostrar cada `TodoItem`
3. **Pasa** las funciones `onToggle` y `onDelete`

### ⚠️ Importante:
- Cada `TodoItem` debe tener `key={todo.id}`
- Si no hay tareas, muestra mensaje: "No hay tareas"

---

## 🔍 Paso 7: FilterBar - Filtrar Tareas (15 min)

### Este componente tiene 3 botones:

```
[Todas]  [Pendientes]  [Hechas]
  ^activo
```

### Lógica:
1. Cada botón llama a `onFilterChange('all')` o `'active'` o `'done'`
2. El botón activo tiene estilo diferente (fondo de color)

### En `App.js`, filtras así:
- **'all'** → todas las tareas
- **'active'** → solo `done === false`
- **'done'** → solo `done === true`

---

## 📊 Paso 8: Contador de Tareas (10 min)

### En algún lugar muestra:

```
📊 2 pendientes / 1 hecha
```

### Cálculo:
- Pendientes: cuenta cuántas tienen `done === false`
- Hechas: cuenta cuántas tienen `done === true`

💡 Usa `filter().length` o reduce

---

## 💾 Paso 9 (Opcional): Guardar en localStorage (20 min)

### Para que no se pierdan al recargar:

1. **Al cargar la app**: Lee de localStorage
2. **Cada vez que cambien las tareas**: Guarda en localStorage

### 💡 Pistas:
- Usa `useEffect` con `[todos]` como dependencia
- Guarda: `localStorage.setItem('todos', JSON.stringify(todos))`
- Lee: `JSON.parse(localStorage.getItem('todos')) || []`

---

## ✅ Checklist Final

Antes de entregar, verifica:

- [ ] Puedo agregar una tarea
- [ ] Puedo marcar/desmarcar como hecha
- [ ] Puedo eliminar una tarea
- [ ] Los filtros funcionan (no borran datos)
- [ ] No puedo agregar tareas vacías
- [ ] El contador muestra números correctos
- [ ] No hay errores en la consola
- [ ] Los inputs están controlados (`value` + `onChange`)
- [ ] Cada item de lista tiene `key`

---

## 🎨 Mejoras Opcionales (si terminas antes)

1. **Editar tarea**: Doble click en el título → se convierte en input
2. **Ordenar**: Pendientes arriba, hechas abajo
3. **Buscador**: Filtrar por texto del título
4. **Animaciones**: CSS para cuando agregas/eliminas

---

## 📦 Qué Entregar

1. **Código funcionando** con las 4 funciones principales
2. **README.md** con:
   - Cómo ejecutar (`npm install`, `npm start`)
   - Decisiones que tomaste (estructura, estados)
   - Qué quedo opcional
3. **2-3 capturas de pantalla**:
   - Lista con tareas
   - Filtro activo
   - Error al intentar agregar vacío

---

## 📊 Evaluación

| Criterio | Peso |
|----------|------|
| **Funcionalidad** (agregar/marcar/eliminar/filtrar) | 40% |
| **Código limpio** (componentes pequeños, nombres claros) | 25% |
| **UX/Accesibilidad** (mensajes de error, labels, focus) | 20% |
| **Extra** (localStorage + contador) | 15% |

---

## 💡 Tips Importantes

1. **Empieza simple**: Primero haz que funcione, luego hazlo bonito
2. **Un paso a la vez**: No intentes hacer todo junto
3. **Prueba cada función**: Agrega console.log para ver qué pasa
4. **No copies código**: Entiende la lógica primero
5. **Pide ayuda**: Si te atoras más de 15 min en algo

---

## 🤔 Preguntas Guía (no código, solo piensa)

**¿Dónde va el estado de las tareas?**
→ En el componente más alto que las necesita (`App.js`)

**¿Cómo paso funciones a componentes hijos?**
→ Como props: `<TodoForm onAdd={handleAdd} />`

**¿Cómo actualizo una tarea sin modificar el original?**
→ Usando `map()` y creando un nuevo array

**¿Cómo filtro sin perder las tareas originales?**
→ Guardas todas en el estado, pero MUESTRAS solo las filtradas

**¿Qué es un input controlado?**
→ Un input donde React controla el valor, no el DOM

---

**¡Mucha suerte! 🚀**

Recuerda: No hay una única solución correcta. Lo importante es que funcione y entiendas por qué.