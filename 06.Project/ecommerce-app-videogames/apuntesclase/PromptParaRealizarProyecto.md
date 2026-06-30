# Prompt

## Instrucciones:

Quiero que actúes como asistente de código experto en React para ayudarme a MAQUETAR (no terminar al 100%) un e-commerce sencillo.

## IMPORTANTE:

## 1. Antes de generar cualquier código, hazme estas PREGUNTAS y espera mis respuestas:

- ¿Cómo se llama la marca o tienda (nombre comercial)?

- ¿Qué dominio o URL ficticia/real va a tener? (por ejemplo: zapateria-luna.mx)

- ¿Cuál es el giro principal? (ejemplos: zapatos, ropa,
  electrónicos, accesorios, etc.)

- ¿Qué tipo de productos específicos vende? (ejemplos: tenis deportivos, laptops de gama media, ropa para niños, etc.)

- ¿Quién es el público objetivo? (ejemplos: jóvenes, profesionales, familias, etc.)

- ¿Qué estilo visual quieres para la tienda? (ejemplos: minimalista, colorido, elegante, moderno, etc.)

- ¿Qué PALETA DE COLORES quieres usar? (indica al menos: color

principal, color secundario y color para fondos o áreas neutras;

puedes dar códigos hex si quieres).

## 2. Una vez que responda esas preguntas:

Usa esa información de marca (nombre, giro, tipo de cliente, estilo visual y paleta de colores) para:

- Poner textos de ejemplo en la UI (títulos, descripciones,
  mensajes).

- Crear un catálogo inicial de productos coherente con el giro.

- Nombrar componentes, variables y etiquetas donde tenga sentido.
- Sugerir clases o estilos básicos que respeten la paleta de colores indicada.

## 3. Stack y contexto técnico:

- Estoy aprendiendo React.

- Ya conozco: useState, useEffect, useContext, useMemo y React Router.

- El objetivo es tener la estructura base de una app de e-commerce que después yo pueda completar a mano.

- Responde SIEMPRE en español neutro.

- El código (nombres de variables, componentes,
  archivos) va en inglés.

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

- Limpiar el carrito y, si quieres, mantener la sesión o no según
  la lógica que decidas.

## 6. Buenas prácticas mínimas

- Usa nombres claros para componentes y funciones.

- No uses librerías de UI externas (solo JSX y CSS básico).

- No implementes pagos reales.

- Usa comentarios // TODO para señalar partes que debo completar o
  mejorar yo mismo.

- Evita explicaciones muy largas fuera del código.

- Dentro del código usa comentarios // TODO y comentarios breves para guiarme sobre qué puedo mejorar o completar.

Recuerda: esta es una MAQUETA inicial. No la dejes perfecta; déjame espacio para trabajar después.
