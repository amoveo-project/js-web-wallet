import React, { useContext, useEffect, useState } from 'react';

import Recent from './components/Recent';

import AppContext from 'shared/contexts/AppContext';
import RecentContext from 'shared/contexts/RecentContext';

const RecentContainer = ({ navigate }) => {
  const { createWallet } = useContext(AppContext);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    getWallets();
  }, []);

  async function getWallets() {
    const wallets = await window._amoveoWallet.getWallets();
    setWallets(wallets);
  }

  async function openWallet(walletId) {
    const {
      privateKeyEncrypted,
      mnemonicEncrypted,
    } = await window._amoveoWallet.openWallet(walletId);

    const privateKey = privateKeyEncrypted;
    const mnemonic = mnemonicEncrypted;

    if (privateKey) {
      createWallet({ privateKey, mnemonic });

      navigate('/dashboard/');
    }
  }

  const recentState = {
    openWallet,
    wallets,
  };

  return (
    <RecentContext.Provider value={recentState}>
      <Recent />
    </RecentContext.Provider>
  );
};

export default RecentContainer;
