import React, { useState } from 'react';

import Receive from './components/Receive';

import ReceiveContext from 'shared/contexts/ReceiveContext';
import Decimal from 'decimal.js-light';

const ReceiveContainer = () => {
  const [amount, setAmount] = useState(1000000);

  const handleAmountInput = e => {
    let value = Number(e.target.value) || 0;
    value = value >= 0 ? value : 0;

    setAmount(new Decimal(value).mul(1e8).toNumber());
  };

  const receiveState = {
    amount,
    handleAmountInput,
  };

  return (
    <ReceiveContext.Provider value={receiveState}>
      <Receive />
    </ReceiveContext.Provider>
  );
};

export default ReceiveContainer;
