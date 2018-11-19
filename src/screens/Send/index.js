import React, { useContext, useEffect, useState } from 'react';

import Send from './components/Send';

import AppContext from 'shared/contexts/AppContext';
import SendContext from 'shared/contexts/SendContext';

const SendContainer = () => {
  const { balance, keys, veo } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);
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
        fee = accountState.fee / 1e8;
      } catch (e) {
        // no actions
      }

      let proposal = {};
      if (fee > 0) {
        try {
          proposal = await veo.wallet.createTxProposal(
            keys.public,
            address,
            amount * 1e8,
          );
        } catch (e) {
          // no actions
        }
      }

      fee = proposal.fee ? proposal.fee / 1e8 : 0;
      setFee(fee);

      const isValid = fee > 0 && balance >= amount + fee + 1e-8;

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

    setAmount(value);
  };

  const handleFillMax = () => {
    let value = balance - fee - 1e-8;
    value = value >= 0 ? value : 0;

    setAmount(value);
  };

  const handleSendMoney = async () => {
    if (amount <= 0) {
      return;
    }

    // todo: block send control

    let transaction = null;
    try {
      transaction = await veo.wallet.sendMoney(address, amount / 1e8);
    } catch (e) {
      console.error('sending money failed');
    }

    // todo: unblock send control

    if (!transaction) {
      return;
    }

    setAddress('');
    setAmount(0);

    setSentTransaction(transaction);
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
