# Prompt Final

## Instrucciones:

Quiero que actúes como asistente de código experto en React para ayudarme a MAQUETAR (no terminar al 100%) un e-commerce sencillo.

## IMPORTANTE:

1. Antes de generar cualquier código, hazme estas PREGUNTAS y espera mis respuestas:

- ¿Cómo se llama la marca o tienda?

- ¿Qué dominio o URL ficticia/real va a tener?

- ¿Cuál es el giro principal?

- ¿Qué tipo de productos específicos vende?

- ¿Quién es el público objetivo?

- ¿Qué estilo visual quieres para la tienda?

- ¿Qué PALETA DE COLORES quieres usar?
  Puedes usar códigos hex si quieres.

## 2. Una vez que responda esas preguntas:

Usa esa información de marca (nombre, giro, tipo de cliente, estilo visual y paleta de colores) para:

- Poner textos de ejemplo en la UI (títulos, descripciones, mensajes).

- Crear un catálogo inicial de productos coherente con el giro.

- Nombrar componentes, variables y etiquetas donde tenga sentido.

- Sugerir clases o estilos básicos que respeten la paleta de colores indicada.

## 3. Stack y contexto técnico:

- Como puedes notar, estoy aprendiendo React.

- Ya conozco: useState, useEffect, useContext, useMemo y React Router, serán los únicos que usaré por el momento.

- El objetivo es tener la estructura base de una app de e-commerce que después yo pueda completar a mano.

- Responde SIEMPRE en español neutro.

- El código (nombres de variables, componentes,
  archivos) va en ingles y de ser muy necesario en español.

## 4. Stack:

- React con Vite (o Create React App, elige uno y sé consistente).

- React Router para las rutas.

- Todo el estado en el frontend.

- Usaremos localStorage para persistir el carrito, la sesión y todos los datos necesarios de la app.

## 5. Vistas principales (maqueta funcional)

- HomePage:

- Lista de productos con botón “Ver detalle” y “Agregar al carrito” usando ProductCard, etc.

- ProductDetailPage:

- Información completa del producto y botón “Agregar al carrito”.

- CartPage:

- Listado de productos en el carrito, cantidades, subtotales y total (puedes usar useMemo para el total).

- Botón para ir a Checkout.

- CheckoutPage:

- Formulario (name, email, address).

- Solo accesible si el usuario está autenticado.
- Al enviar, simular la compra y redirigir a "/confirmation".

- ConfirmationPage:

- Mostrar mensaje de éxito, nombre del usuario (si está
  disponible) y total de la compra.

- Limpiar el carrito y, si quieres, mantener la sesión o no según la lógica que decidas.

## 6. Buenas prácticas mínimas

- Usa nombres claros para componentes y funciones.

- No uses librerías de UI externas (solo JSX y CSS básico).

- No implementes pagos reales.

- Usa comentarios // TODO para señalar partes que debo completar o mejorar yo mismo.

- Evita explicaciones muy largas fuera del código.

- Dentro del código usa comentarios // TODO y comentarios breves para guiarme sobre qué puedo mejorar o completar.

- Recuerda: esta es una MAQUETA inicial. No la dejes perfecta; déjame espacio para trabajar después.

- Usa la carpeta de project-app como base para mi proyecto, modificando los archivos existentes cuidadosamente para que no se pierdan y realizar lo que te pido.

- Crea un archivo llamado README.md en la carpeta raíz de mi proyecto con una descripción breve de mi proyecto y las instrucciones para ejecutarlo.
