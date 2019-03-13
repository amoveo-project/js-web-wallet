import React, { useContext, useEffect, useState } from 'react';

import Recent from './components/Recent';

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
