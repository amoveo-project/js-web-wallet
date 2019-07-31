import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import Dashboard from './components/Dashboard';

import LedgerModal from 'shared/components/LedgerModal';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

const DashboardContainer = ({ navigate }) => {
  const { isWalletCreated, setModal, veo, verifyOwnAddress } = useContext(
    AppContext,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [isAddressVerified, setIsAddressVerified] = useState(false);

  useEffect(() => {
    if (!isWalletCreated) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (isWalletCreated) {
      veo.wallet.startPendingSync();
    }

    return () => {
      veo.wallet.stopPendingSync();
    };
  }, [isWalletCreated]);

  const handlePageChange = diff => {
    setCurrentPage(currentPage => currentPage + diff);
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

  const dashboardState = {
    currentPage,
    handlePageChange,
    isAddressVerified,
    verifyLedgerAddress,
  };

  return (
    <DashboardContext.Provider value={dashboardState}>
      <Helmet>
        <title>
          Your wallet address | Download private key | Passphase file | VEO
        </title>
        <meta
          name="description"
          content="Your wallets address, private key and passphrase"
        />
      </Helmet>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardContainer;
