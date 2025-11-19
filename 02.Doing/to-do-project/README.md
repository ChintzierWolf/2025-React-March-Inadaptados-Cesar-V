# 📝 To-Do List - React App

Una aplicación de lista de tareas construida con React, Vite y Material-UI.

![To-Do List](https://img.shields.io/badge/React-18+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5+-purple.svg)
![Material UI](https://img.shields.io/badge/Material--UI-5+-blue.svg)

## 🌐 Demo en Vivo

**[Ver Demo en GitHub Pages](https://rodrigoBermejo.github.io/to-do-project/)**

## ✨ Características

- ✅ **Agregar tareas** nuevas con validación
- ☑️ **Marcar/desmarcar** tareas como completadas
- 🗑️ **Eliminar** tareas
- 🔍 **Filtrar** por: Todas / Pendientes / Hechas
- 💾 **Persistencia** en localStorage (las tareas se guardan automáticamente)
- 📊 **Contador** de tareas pendientes y completadas
- 🎨 **Interfaz moderna** con Material-UI
- ♿ **Accesible** con etiquetas ARIA y roles apropiados

## 🚀 Cómo ejecutar el proyecto

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn

### Instalación

1. Clona o descarga este repositorio

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── App.jsx              # Componente principal (gestiona estado)
├── App.css              # Estilos globales
├── components/
│   ├── TodoForm.jsx     # Formulario para agregar tareas
│   ├── TodoList.jsx     # Lista de tareas
│   ├── TodoItem.jsx     # Componente individual de tarea
│   └── FilterBar.jsx    # Botones de filtro
└── main.jsx             # Punto de entrada
```

## 🎯 Decisiones de Diseño

### Estado Global en App.js
- Todas las tareas se gestionan en el componente `App`
- Los componentes hijos reciben funciones mediante props para modificar el estado
- Esto mantiene una única fuente de verdad para los datos

### LocalStorage
- Las tareas se cargan desde localStorage al iniciar
- Se guardan automáticamente con `useEffect` cada vez que cambian
- Si no hay tareas guardadas, se muestran 3 tareas de ejemplo

### Material-UI
- Uso de componentes de Material-UI para una interfaz profesional
- Tema por defecto con personalización mínima
- Iconos de @mui/icons-material

### Validación
- El input no permite agregar tareas vacías
- El botón "Agregar" se deshabilita cuando el input está vacío
- Mensajes de error claros con Alert de MUI

### Accesibilidad
- Labels asociados a inputs y checkboxes
- Roles ARIA para alertas
- Textos descriptivos en botones

## 📋 Funcionalidades Implementadas

- [x] Agregar tareas
- [x] Marcar/desmarcar como completada
- [x] Eliminar tareas
- [x] Filtrar (Todas/Pendientes/Hechas)
- [x] Validación de input vacío
- [x] Contador de tareas
- [x] Persistencia en localStorage
- [x] Inputs controlados
- [x] Keys únicas en listas
- [x] Sin errores en consola

## 🛠️ Tecnologías Utilizadas

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **Material-UI (MUI)** - Componentes de interfaz
- **Emotion** - CSS-in-JS (requerido por MUI)
- **LocalStorage API** - Persistencia de datos

## 📝 Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción
npm run lint         # Ejecuta ESLint
npm run deploy       # Despliega a GitHub Pages
```

## 🚀 Deployment a GitHub Pages

Para desplegar tu propia versión:

1. Fork o clona este repositorio
2. Actualiza el `homepage` en `package.json` con tu usuario de GitHub
3. Ejecuta `npm run deploy`
4. Ve a la configuración de tu repositorio en GitHub → Pages
5. Selecciona la rama `gh-pages` como source
6. ¡Tu app estará en vivo en minutos!

## 👨‍💻 Autor

Proyecto desarrollado como parte del Reto 06 - To-Do List Simple

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
