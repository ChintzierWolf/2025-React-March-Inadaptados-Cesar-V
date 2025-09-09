import "./Button.css";

export default function Button({ children, onClick, disabled, variant }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// Uso del componente:
<Button variant="primary" onClick={() => alert("Clicked!")}>
  Agregar al carrito
</Button>;