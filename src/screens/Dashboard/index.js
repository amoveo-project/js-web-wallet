import React, { useContext, useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

const DashboardContainer = ({ navigate }) => {
  const { isWalletCreated } = useContext(AppContext);

  useEffect(() => {
    if (!isWalletCreated) {
      navigate('/');
    }
  }, []);

  const dashboardState = {};

  return (
    <DashboardContext.Provider value={dashboardState}>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardContainer;
