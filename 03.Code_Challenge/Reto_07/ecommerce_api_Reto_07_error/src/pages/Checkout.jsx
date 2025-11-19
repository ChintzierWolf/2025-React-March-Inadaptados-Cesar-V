import { useState } from 'react';
import AddressList from '../components/Checkout/Address/AddressList';
import AddressForm from '../components/Checkout/Address/AddressForm';
import PaymentList from '../components/Checkout/Payment/PaymentList';
import PaymentForm from '../components/Checkout/Payment/PaymentForm';

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const addAddress = (newAddress) => {
    if (newAddress.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }
    setAddresses(prev => [...prev, { ...newAddress, id: Date.now() }]);
  };

  const addPayment = (newPayment) => {
    if (newPayment.isDefault) {
      setPayments(prev => prev.map(p => ({ ...p, isDefault: false })));
    }
    setPayments(prev => [...prev, { ...newPayment, id: Date.now() }]);
  };

  return (
    <div>
      <h2>Direcciones</h2>
      <AddressList addresses={addresses} onSelect={setSelectedAddress} />
      <AddressForm onSubmit={addAddress} />

      <h2>Métodos de Pago</h2>
      <PaymentList payments={payments} onSelect={setSelectedPayment} />
      <PaymentForm onSubmit={addPayment} />
    </div>
  );
};

export default Checkout;