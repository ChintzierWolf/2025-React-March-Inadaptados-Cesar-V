import "./Badge.css";

export default function Badge({ text, variant }) {
  return (
    <span className={`badge badge-${variant}`}>
      {text}
    </span>
  );
}

/*
<>
  // Uso del componente:
  <Badge text="En stock" variant="success">

  </Badge><Badge text="Descuento" variant="warning">

  </Badge></>;
*/