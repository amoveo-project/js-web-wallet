import React, { useContext, useEffect, useState } from 'react';

import Send from './components/Send';

import AppContext from 'shared/contexts/AppContext';
import SendContext from 'shared/contexts/SendContext';
import Decimal from 'decimal.js-light';

const SendContainer = () => {
  const { balance, keys, veo } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(1000000);
  const [fee, setFee] = useState(0);
  const [isSendEnabled, setIsSendEnabled] = useState(false);
  const [sentTransaction, setSentTransaction] = useState(null);

  useEffect(
    async () => {
      const isFilled = amount > 0 && address.length > 0;
      const isYourself = address === keys.public;

      if (!isFilled || isYourself) {
        setFee(0);
        setIsSendEnabled(false);

        return;
      }

      let fee = 0;
      try {
        const accountState = await veo.wallet.getAccountState(address);
        fee = accountState.fee;
      } catch (e) {
        // no actions
      }

      let proposal = {};
      if (fee > 0) {
        try {
          proposal = await veo.wallet.createTxProposal(
            keys.public,
            address,
            amount,
          );
        } catch (e) {
          // no actions
        }
      }

      fee = proposal.fee;
      setFee(fee);

      const isValid = fee > 0 && balance >= amount + fee;

      setIsSendEnabled(isValid);
    },
    [address, amount],
  );

  const handleAddressInput = e => {
    setAddress(e.target.value);
  };

  const handleAmountInput = e => {
    let value = Number(e.target.value) || 0;
    value = value >= 0 ? value : 0;

    setAmount(new Decimal(value).mul(1e8).toNumber());
  };

  const handleFillMax = () => {
    let value = balance - fee;
    setAmount(value);
  };

  const handleSendMoney = async () => {
    if (amount <= 0) {
      return;
    }

    // todo: block send control

    let hash = null;
    try {
      hash = await veo.wallet.sendMoney(address, amount);
    } catch (e) {
      console.error(e);
      console.error('sending money failed');
    }

    // todo: unblock send control

    if (!hash) {
      return;
    }

    setAddress('');
    setAmount(1000000);

    setSentTransaction({
      hash,
    });

    veo.wallet.syncPendingTransactions();
  };

  const handleHideModal = () => {
    setSentTransaction(null);
  };

  const sendState = {
    address,
    amount,
    fee,
    handleAddressInput,
    handleAmountInput,
    handleFillMax,
    handleHideModal,
    handleSendMoney,
    isSendEnabled,
    sentTransaction,
  };

  return (
    <SendContext.Provider value={sendState}>
      <Send />
    </SendContext.Provider>
  );
};

export default SendContainer;
