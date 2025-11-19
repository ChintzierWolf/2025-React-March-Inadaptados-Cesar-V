import PaymentItem from './PaymentItem';

const PaymentList = ({ payments, onSelect }) => {
  return (
    <div className="payment-list">
      {payments.map(payment => (
        <PaymentItem key={payment.id} payment={payment} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default PaymentList;
