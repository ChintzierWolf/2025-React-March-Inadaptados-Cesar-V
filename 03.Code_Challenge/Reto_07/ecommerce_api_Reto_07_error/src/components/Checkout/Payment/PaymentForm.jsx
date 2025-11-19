// Formulario para agregar una nueva tarjeta
import { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ cardNumber: '', expiry: '', cvv: '', isDefault: false });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.cardNumber || !form.expiry || !form.cvv) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="cardNumber" placeholder="Número de tarjeta" onChange={handleChange} required />
      <input name="expiry" placeholder="MM/AA" onChange={handleChange} required />
      <input name="cvv" placeholder="CVV" onChange={handleChange} required />
      <label>
        <input type="checkbox" name="isDefault" onChange={handleChange} />
        Guardar como predeterminada
      </label>
      <button type="submit">Guardar Método de Pago</button>
    </form>
  );
};

export default PaymentForm;