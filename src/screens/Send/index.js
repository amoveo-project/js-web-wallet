import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Send from './components/Send';

import AppContext from 'shared/contexts/AppContext';
import SendContext from 'shared/contexts/SendContext';
import Decimal from 'decimal.js-light';
import { LEDGER_MAGIC_NUMBER } from '../../shared/constants/ledger';
import LedgerModal from '../../shared/components/LedgerModal';
import ErrorModal from '../../shared/components/ErrorModal';

const SendContainer = () => {
  const { balance, keys, veo, setModal } = useContext(AppContext);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(1000000);
  const [fee, setFee] = useState(0);
  const [isSendEnabled, setIsSendEnabled] = useState(false);
  const [sentTransaction, setSentTransaction] = useState(null);

  async function setIsSendEnabledAsync() {
    const isFilled = amount > 0 && address.length > 0;
    const isYourself = address === keys.public;

    if (!isFilled || isYourself) {
      setFee(0);
      setIsSendEnabled(false);
    } else {
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
    }
  }

  useEffect(() => {
    setIsSendEnabledAsync(address, amount);
  }, [address, amount]);

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
    try {
      if (keys.private === LEDGER_MAGIC_NUMBER) {
        setModal(
          <LedgerModal
            title="Hey"
            text="Confirm your transaction on wallet"
            onClick={() => setModal(null)}
          />,
        );
      }
      const hash = await veo.wallet.sendMoney(address, amount);
      setAddress('');
      setAmount(1000000);

      setSentTransaction({
        hash,
      });

      veo.wallet.syncPendingTransactions();
    } catch {
      setModal(
        <ErrorModal
          text="Sending Money failed"
          onClick={() => setModal(null)}
        />,
      );
    }
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
      <Helmet>
        <title>Send payments | VEO</title>
        <meta name="description" content="Send VEO anywhere in the world" />
      </Helmet>
      <Send />
    </SendContext.Provider>
  );
};

export default SendContainer;
