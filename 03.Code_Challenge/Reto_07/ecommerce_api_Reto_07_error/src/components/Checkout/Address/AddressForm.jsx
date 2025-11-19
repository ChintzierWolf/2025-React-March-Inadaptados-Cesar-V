import { useState } from 'react';

const AddressForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: '', street: '', zip: '', city: '', isDefault: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.street || !form.zip || !form.city) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" onChange={handleChange} required />
      <input name="street" placeholder="Dirección" onChange={handleChange} required />
      <input name="zip" placeholder="Código Postal" onChange={handleChange} required />
      <input name="city" placeholder="Ciudad" onChange={handleChange} required />
      <label>
        <input type="checkbox" name="isDefault" onChange={handleChange} />
        Marcar como predeterminada
      </label>
      <button type="submit">Guardar Dirección</button>
    </form>
  );
};

export default AddressForm;