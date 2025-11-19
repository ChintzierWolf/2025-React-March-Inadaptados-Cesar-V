// Campo de formulario reutilizable con etiqueta y validación
const FormField = ({ label, name, type = 'text', value, onChange, required = false, placeholder }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={name} style={{ display: 'block', fontWeight: 'bold' }}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default FormField;
