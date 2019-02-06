import React, { useState } from 'react';

import Receive from './components/Receive';

import ReceiveContext from 'shared/contexts/ReceiveContext';

const ReceiveContainer = () => {
  const [amount, setAmount] = useState(0.01);

  const handleAmountInput = e => {
    let value = Number(e.target.value) || 0;
    value = value >= 0 ? value : 0;

    setAmount(value);
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
