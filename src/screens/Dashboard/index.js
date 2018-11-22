import React, { useContext, useEffect } from 'react';

import Dashboard from './components/Dashboard';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

const DashboardContainer = ({ navigate }) => {
  const { isWalletCreated, veo } = useContext(AppContext);

  useEffect(() => {
    if (!isWalletCreated) {
      navigate('/');
      return;
    }
  }, []);

  useEffect(
    () => {
      if (!isWalletCreated) {
        return () => {
          veo.wallet.stopPendingSync();
        };
      }

      veo.wallet.startPendingSync();

      return () => {
        veo.wallet.stopPendingSync();
      };
    },
    [isWalletCreated],
  );

  const dashboardState = {};

  return (
    <DashboardContext.Provider value={dashboardState}>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardContainer;
