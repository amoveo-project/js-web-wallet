import React, { useContext, useEffect, useState } from 'react';

import Recent from './components/Recent';

import ErrorModal from 'shared/components/ErrorModal';
import RecoverPasswordModal from 'shared/components/RecoverPasswordModal';

import AppContext from 'shared/contexts/AppContext';
import RecentContext from 'shared/contexts/RecentContext';

const RecentContainer = ({ navigate }) => {
  const { recoverWallet, setModal } = useContext(AppContext);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    getWallets();
  }, []);

  async function getWallets() {
    const wallets = await window._amoveoWallet.getWallets();
    setWallets(wallets);
  }

  async function openWallet(walletId) {
    const { hasPassword } = await window._amoveoWallet.openWallet(walletId);

    if (hasPassword) {
      setModal(
        <RecoverPasswordModal walletId={walletId} navigate={navigate} />,
      );

      return;
    } else {
      await recoverWallet({ walletId, password: '' });

      navigate('/dashboard/');
    }
  }

  async function removeWallet(walletId) {
    try {
      await window._amoveoWallet.removeWallet(walletId);

      setWallets(wallets => {
        const filteredWallets = wallets.filter(
          item => item.publicKey !== walletId,
        );

        if (filteredWallets.length === 0) {
          navigate('/dashboard/');
        }

        setModal(null);

        return filteredWallets;
      });
    } catch (e) {
      setModal(
        <ErrorModal
          text="Can't remove this wallet"
          onClick={() => setModal(null)}
        />,
      );
    }
  }

  const recentState = {
    openWallet,
    removeWallet,
    wallets,
  };

  return (
    <RecentContext.Provider value={recentState}>
      <Recent />
    </RecentContext.Provider>
  );
};

export default RecentContainer;
