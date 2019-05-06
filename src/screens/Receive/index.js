import React, { useContext, useState } from 'react';
import Decimal from 'decimal.js-light';
import { Helmet } from 'react-helmet';

import Receive from './components/Receive';

import LedgerModal from 'shared/components/LedgerModal';

import AppContext from 'shared/contexts/AppContext';
import ReceiveContext from 'shared/contexts/ReceiveContext';

const ReceiveContainer = () => {
  const { setModal, verifyOwnAddress } = useContext(AppContext);

  const [amount, setAmount] = useState(1000000);
  const [isAddressVerified, setIsAddressVerified] = useState(false);

  const handleAmountInput = e => {
    let value = Number(e.target.value) || 0;
    value = value >= 0 ? value : 0;

    setAmount(new Decimal(value).mul(1e8).toNumber());
  };

  const verifyLedgerAddress = async () => {
    const isVerified = await verifyOwnAddress();

    setIsAddressVerified(isVerified);

    if (!isVerified) {
      setModal(
        <LedgerModal
          text="You didn't verify your address. Be careful using it!"
          onClick={() => setModal(null)}
        />,
      );
    }
  };

  const receiveState = {
    amount,
    handleAmountInput,
    isAddressVerified,
    verifyLedgerAddress,
  };

  return (
    <ReceiveContext.Provider value={receiveState}>
      <Helmet>
        <title>Receive payments | VEO</title>
        <meta name="description" content="Receive payments in VEO" />
      </Helmet>
      <Receive />
    </ReceiveContext.Provider>
  );
};

export default ReceiveContainer;
