import "./Input.css";

export default function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

// Uso del componente:
<Input
  label="Buscar productos"
  type="text"
  placeholder="Escribe aquí..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>;
