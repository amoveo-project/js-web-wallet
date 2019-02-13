import React, { useContext, useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

const DashboardContainer = ({ navigate }) => {
  const { isWalletCreated, veo } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isWalletCreated) {
      navigate('/');
      return;
    }
  }, []);

  useEffect(
    () => {
      if (isWalletCreated) {
        veo.wallet.startPendingSync();
      }

      return () => {
        veo.wallet.stopPendingSync();
      };
    },
    [isWalletCreated],
  );

  const handlePageChange = diff => {
    setCurrentPage(currentPage => currentPage + diff);
  };

  const dashboardState = {
    currentPage,
    handlePageChange,
  };

  return (
    <DashboardContext.Provider value={dashboardState}>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardContainer;
