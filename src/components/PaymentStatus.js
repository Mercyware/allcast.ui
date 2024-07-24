// components/PaymentStatus.js
import React from 'react';

const PaymentStatus = ({ status }) => {
  if (!status) return null;

  return (
    <div className={`payment-status ${status}`}>
      {status === 'success' ? 'Payment Successful!' : 'Payment Failed!'}
    </div>
  );
};

export default PaymentStatus;