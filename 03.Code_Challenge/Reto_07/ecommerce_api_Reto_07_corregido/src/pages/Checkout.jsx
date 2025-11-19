import { useState } from "react";
import Loading from "../components/common/Loading/Loading";
import Loading from "../components/common/ErrorMessage/ErrorMessage";
import AddressForm from "../components/Checkout/Address/AddressForm";
import AddressItem from "../components/Checkout/Address/AddressItem";
import AddressList from "../components/Checkout/Address/AddressList";
import PaymentForm from "../components/Checkout/Payment/PaymentForm";
import PaymentItem from "../components/Checkout/Payment/PaymentItem";
import PaymentList from "../components/Checkout/Payment/PaymentList";
import SummarySection from "../components/Checkout/shared/SummarySection";
import { getPaymentMethods, getDefaultPaymentMethods } from "../services/paymentService";
import { getShippingAddresses, getDefaultShippingAddress } from "../services/shippingService";
import ErrorMessage from "../components/common/ErrorMessage/ErrorMessage";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState (null);
  const [payments, setPayments] = useState([]);
  const [selectedPayments, setSelectedPayments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [addrList, payList, defaultAdd, defaultPay] = await Promise.all([
        getShippingAddresses(),
        getPaymentMethods(),
        getDefaultShippingAddress(),
        getDefaultPaymentMethods(),
      ]);

      setAddresses(addrList || []);

      const normalizedPayments = (payList || []).map((p) => ({
        id: p._id || Date.now().toString(),
        alias: p.alias || `Tarjeta ****${(p.cardNumber || "").slice(-4)}`,
        // slice(0, length - 4)
        cardNumber: p.cardNumber || "",
        placeHolder: p.placeHolder || "",
        expiryDate: p.expiryDate || "",
        isDefault: p.isDefault || false,
      }));

      setPayments(payList || []);

      setSelectedAddress(defaultAdd);
      setSelectedPayments(defaultPay);

    } catch (err) {
      setError("No se pudieron cargar las direcciones o métodos de pago");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handledAddressSubmit = (formData) => {console.log(FormData);};
  const handledPaymentSubmit = (formData) => {console.log(FormData);};
  const handledAddressEdit = (address) => {console.log(address);};
  const handledPaymentEdit = (payment) => {console.log(payment);};

  if (loading){

  }

  if (error) {

  }

  return (
    loading ? (<div className="Checkout-loading"><Loading><p>Cargando direcciones y métodos de pago</p></Loading></div>) :
    error ? (<ErrorMessage>{error}</ErrorMessage>) :
    (
    <div className="checkout-container">
      <div className="checout-left">
        <SummarySection title="1. Dirección de envío" selected={selectedAddress} summaryContent={<div className="selected-address">
          <p>selectedAddress.name</p>
          <p>selectedAddress.address1</p>
          <p>{selectedAddress.city}, {selectedAddress.postalCode}</p>
        </div>}
        isExpanded={fale}
        onToggle={()=>{console.log(`Expand ${selectedAddress}`)}}
      </div>
      <div className="checkout-right"></div>
    </div>
  );
}
