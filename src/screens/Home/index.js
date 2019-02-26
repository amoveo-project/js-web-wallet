import React, { useContext, useEffect, useState } from 'react';

import Home from './components/Home';

import AppContext from 'shared/contexts/AppContext';
import HomeContext from 'shared/contexts/HomeContext';

const HomeContainer = ({ navigate, path }) => {
  const { createWallet, resetWallet } = useContext(AppContext);

  const [lastWalletId, setLastWalletId] = useState('');

  useEffect(() => {
    const isLogout = path && path.startsWith('/logout');

    if (isLogout) {
      resetWallet();
    }

    if (window._isElectron) {
      getLastWalletId();
    }
  }, []);

  async function getLastWalletId() {
    const lastWalletId = await window._amoveoWallet.getLastId();
    setLastWalletId(lastWalletId);
  }

  async function openLastWallet() {
    const {
      privateKeyEncrypted,
      mnemonicEncrypted,
    } = await window._amoveoWallet.openWallet(lastWalletId);

    const privateKey = privateKeyEncrypted;
    const mnemonic = mnemonicEncrypted;

    if (privateKey) {
      createWallet({ privateKey, mnemonic });

      navigate('/dashboard/');
    }
  }

  const homeState = {
    lastWalletId,
    openLastWallet,
  };

  return (
    <HomeContext.Provider value={homeState}>
      <Home />
    </HomeContext.Provider>
  );
};

export default HomeContainer;
