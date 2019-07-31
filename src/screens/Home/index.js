import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Home from './components/Home';

import RecoverPasswordModal from 'shared/components/RecoverPasswordModal';

import AppContext from 'shared/contexts/AppContext';
import HomeContext from 'shared/contexts/HomeContext';

const HomeContainer = ({ navigate, path }) => {
  const { recoverWallet, resetWallet, setModal } = useContext(AppContext);

  const [lastWalletId, setLastWalletId] = useState('');
  const [recentWallets, setRecentWallets] = useState([]);

  useEffect(() => {
    const isLogout = path && path.startsWith('/logout');

    if (isLogout) {
      resetWallet();
    }

    if (window._isElectron) {
      getLastWalletId();
      getRecentWallets();
    }
  }, []);

  async function getLastWalletId() {
    const walletId = await window._amoveoWallet.getLastId();
    setLastWalletId(walletId);
  }

  async function getRecentWallets() {
    const wallets = await window._amoveoWallet.getRecentWallets();
    setRecentWallets(wallets);
  }

  async function openLastWallet() {
    const { hasPassword } = await window._amoveoWallet.openWallet(lastWalletId);

    if (hasPassword) {
      setModal(
        <RecoverPasswordModal walletId={lastWalletId} navigate={navigate} />,
      );

      return;
    } else {
      await recoverWallet({ walletId: lastWalletId, password: '' });

      navigate('/dashboard/');
    }
  }

  const homeState = {
    lastWalletId,
    openLastWallet,
    recentWallets,
  };

  return (
    <HomeContext.Provider value={homeState}>
      <Helmet>
        <title>
          Amoveo Wallet for Windows | Mac OS | Linux | Web Wallet | VEO
        </title>
        <meta
          name="description"
          content="Send, store and receive VEO safely and securely | Download on the App Store and get it on Google Play!"
        />
      </Helmet>
      <Home />
    </HomeContext.Provider>
  );
};

export default HomeContainer;
