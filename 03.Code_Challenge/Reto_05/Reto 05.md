# 🎬 Reto Semana 5 — Carrusel de Álbumes + Visor de Fotos

## 🎯 Objetivo

Implementar el **AlbumCarousel** para navegar por las fotos de un álbum en formato carrusel, aprovechando el código ya preparado en App.js. Como extra opcional, crear un **PhotoViewer** para visualizar fotos individuales en fullscreen.

---

## 📋 Alcance del Proyecto

### 🎬 **Parte Principal: AlbumCarousel**
- **Carrusel de imágenes** funcional con navegación
- **Thumbnails clickeables** para navegación rápida
- **Información contextual** del álbum y foto actual

### 🖼️ **Parte Extra: PhotoViewer** (Opcional)
- **Visualización fullscreen** de fotos individuales
- **Información completa** de la foto

---

## ✅ Requisitos Técnicos

### 🎬 **1. AlbumCarousel (Obligatorio)**

- [ ] Archivo `src/pages/AlbumCarousel.jsx` con componente completo
- [ ] Archivo `src/pages/AlbumCarousel.css` con estilos responsive
- [ ] Props: `isOpen`, `album`, `onClose`
- [ ] Navegación con flechas izquierda/derecha
- [ ] Thumbnails en la parte inferior
- [ ] Contador de posición (ej: "3 / 10")
- [ ] Cierre con botón X

### 🔗 **2. Integración con App.js**

- [ ] Descomentar import de AlbumCarousel
- [ ] Descomentar estado: `isCarouselModalOpen`, `carouselAlbum`
- [ ] Implementar `handlePlayAlbum` para abrir carrusel
- [ ] Implementar `handleCloseCarousel` para cerrar
- [ ] Descomentar componente en JSX

### 📱 **3. Funcionalidades Core**

- [ ] **Navegación circular**: última imagen → primera imagen
- [ ] **Keyboard navigation**: flechas izquierda/derecha
- [ ] **Responsive design**: funciona en móviles y tablets
- [ ] **Loading states**: manejo de imágenes que no cargan
- [ ] **Empty states**: manejo de álbumes vacíos

---

## 💡 Pistas de Implementación

### 🎬 **AlbumCarousel Structure**

```jsx
export default function AlbumCarousel({ isOpen, album, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ¿Cómo navegar a la siguiente imagen?
  // ¿Cómo hacer navegación circular?
  // ¿Cómo manejar eventos de teclado?

  if (!isOpen || !album) return null;

  return (
    <div className="album-carousel-overlay">
      {/* Header con título y botón cerrar */}
      {/* Imagen principal */}
      {/* Botones de navegación */}
      {/* Thumbnails */}
      {/* Información de imagen actual */}
    </div>
  );
}
```

### 🎨 **CSS Layout Hints**

```css
.album-carousel-overlay {
  /* ¿Cómo hacer fullscreen overlay? */
  /* ¿Cómo centrar contenido? */
}

.carousel-main-image {
  /* ¿Cómo hacer imagen responsive? */
  /* ¿Qué max-height usar? */
}

.carousel-thumbnails {
  /* ¿Cómo hacer scroll horizontal? */
  /* ¿Cómo highlight thumbnail actual? */
}
```

### 🔗 **App.js Integration**

```javascript
// Paso 1: Descomentar import
import AlbumCarousel from "./pages/AlbumCarousel";

// Paso 2: Descomentar estado
const [isCarouselModalOpen, setIsCarouselModalOpen] = useState(false);
const [carouselAlbum, setCarouselAlbum] = useState(null);

// Paso 3: Implementar funciones
const handlePlayAlbum = (album) => {
  // ¿Qué estado actualizar?
};

const handleCloseCarousel = () => {
  // ¿Cómo limpiar estado?
};
```

---

## 📤 Entregables

### 🚀 **Archivos Principales**

**AlbumCarousel Implementation:**
- [ ] `src/pages/AlbumCarousel.jsx` - Componente funcional completo
- [ ] `src/pages/AlbumCarousel.css` - Estilos responsive y animaciones
- [ ] `src/App.js` - Líneas descomentadas e integración completa

**PropTypes & Validation:**
- [ ] PropTypes correctos en AlbumCarousel
- [ ] Manejo de edge cases (álbum vacío, imágenes faltantes)
- [ ] Error boundaries para imágenes que no cargan

### 🎯 **Funcionalidad Mínima**

- [ ] **Carrusel funcional**: Abre desde botón Play de AlbumCard
- [ ] **Navegación completa**
- [ ] **UX pulida**: Animaciones, estados de carga, responsive
- [ ] **Información contextual**: Título álbum, contador, nombre imagen

---

## 🔍 Criterios de Revisión

### ✅ **Funcionalidad Core**

- [ ] **Navegación fluida**: Sin bugs en cambio de imágenes
- [ ] **Thumbnails interactivos**: Click directo a cualquier imagen
- [ ] **Cierre correcto**: Botón X

### 🎨 **UX & Design**

- [ ] **Layout consistente**: Sigue design system del proyecto
- [ ] **Responsive design**: Funciona en todos los tamaños de pantalla
- [ ] **Loading states**: Indicadores mientras cargan imágenes
- [ ] **Smooth transitions**: Animaciones entre imágenes

### 📱 **Robustez**

- [ ] **Edge cases**: Álbumes vacíos, imágenes rotas, un sola imagen
- [ ] **Performance**: No lag en navegación rápida
- [ ] **Accessibility**: ARIA labels y keyboard navigation
- [ ] **PropTypes**: Validación completa de props

---

## 🧠 Conceptos Clave a Investigar

### 🎬 **Carousel Patterns**
- **useState para índice actual**: Tracking de imagen activa
- **Array navigation**: Navegación circular con módulo
- **Event listeners**: Keyboard events y cleanup
- **Conditional rendering**: Mostrar/ocultar overlay

### 🎨 **CSS Fullscreen Modal**
- **position fixed**: Overlay que cubre toda la pantalla
- **z-index**: Asegurar que modal esté encima
- **flexbox centering**: Centrar contenido en modal
- **backdrop blur**: Efectos visuales de fondo

### 📱 **Responsive Image Gallery**
- **object-fit cover**: Imágenes que se adapten sin distorsión
- **thumbnail scroll**: Navegación horizontal en thumbnails

---

## 🌟 Extra (Opcional)

### 🖼️ **PhotoViewer Implementation**

- [ ] **Componente PhotoViewer.jsx**: Visualización de foto individual
- [ ] **Integración completa**: Estados y funciones en App.js
- [ ] **Zoom functionality**: Ampliar/reducir imagen con scroll
- [ ] **Metadata display**: Título, descripción, ubicación, tags

---

## 🚀 Guía Paso a Paso

### 📋 **Checkpoint 1: Estructura Base (45 min)**
1. **Crear AlbumCarousel.jsx** con props básicas
2. **Implementar renderizado condicional** (isOpen)
3. **Crear layout básico** con overlay y contenedor
4. **Probar apertura/cierre** básico

### 🎬 **Checkpoint 2: Navegación de Imágenes (60 min)**
1. **useState para currentImageIndex**
2. **Funciones nextImage y previousImage**
3. **Navegación circular** con operador módulo
4. **Botones de flecha** funcionales

### 🖼️ **Checkpoint 3: Thumbnails y UI (45 min)**
1. **Lista de thumbnails** en la parte inferior
2. **Highlight de thumbnail activo**
3. **Click en thumbnail** cambia imagen principal
4. **Contador de posición** (ej: "3 / 10")

### ⌨️ **Checkpoint 4: Controles y Eventos (30 min)**
1. **Botón cerrar (X)** funcional
2. **Cleanup de event listeners**

### 🎨 **Checkpoint 5: Estilos y Responsive (45 min)**
1. **CSS completo** para todos los elementos
2. **Responsive design** para móviles/tablets
3. **Animaciones** de transición entre imágenes
4. **Estados hover y active** en controles

### 🔗 **Checkpoint 6: Integración App.js (30 min)**
1. **Descomentar todas las líneas** relacionadas
2. **Implementar handlePlayAlbum** y **handleCloseCarousel**
3. **Probar flujo completo** desde AlbumCard
4. **Testing de edge cases**

---

## 🆘 Ayuda y Debug

### ❌ **Problemas Comunes**

```javascript
// ❌ Navegación circular incorrecta
const nextImage = () => {
  setCurrentImageIndex(currentImageIndex + 1); // Se sale del array
}
```

### 🎨 **CSS Troubleshooting**

- **Modal no aparece**: ¿z-index suficientemente alto?
- **Imagen no se ve bien**: ¿object-fit: cover?
- **Thumbnails no scroll**: ¿overflow-x: auto?
- **No responsive**: ¿max-width y height correctos?

### 🔗 **Integración Issues**

- **Carrusel no abre**: ¿handlePlayAlbum implementado?
- **No cierra con ESC**: ¿event listener agregado?
- **Props undefined**: ¿album pasado correctamente?

---

## 🎯 Objetivos de Aprendizaje

Al completar este reto habrás dominado:

- ✅ **Modal patterns**: Overlays fullscreen y manejo de estado
- ✅ **Array navigation**: Navegación circular y manejo de índices
- ✅ **Event handling**: Keyboard events y cleanup
- ✅ **Image galleries**: Thumbnails, navegación, responsive design
- ✅ **Component integration**: Conectar múltiples componentes
- ✅ **UX patterns**: Loading states, transitions, accessibility

---

<div align="center">

**⏰ Tiempo estimado:** 4-5 horas
**📚 Dificultad:** ⭐⭐⭐ Intermedio
**🎯 Enfoque:** Modal Components + Image Navigation

---

**🏫 Curso:** Inadaptados React 2025
**👨‍💻 Instructor:** Rodrigo Leaños Bermejo

</div>