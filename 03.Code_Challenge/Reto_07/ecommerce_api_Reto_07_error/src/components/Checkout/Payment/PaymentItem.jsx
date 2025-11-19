const PaymentItem = ({ payment, onSelect }) => {
  return (
    <div className="payment-item" onClick={() => onSelect(payment.id)}>
      <p>**** **** **** {payment.cardNumber.slice(-4)}</p>
      <p>Vence: {payment.expireDate}</p>
    </div>
  );
};

export default PaymentItem;
