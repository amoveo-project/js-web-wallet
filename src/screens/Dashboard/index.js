import React, { useContext, useEffect, useState } from 'react';

import Dashboard from './components/Dashboard';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

const DashboardContainer = ({ navigate }) => {
  const { headerId, keys, isWalletCreated } = useContext(AppContext);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!isWalletCreated) {
      navigate('/');
    }
  }, []);

  useEffect(
    async () => {
      const address = keys.public;

      const rawData = await fetch(
        `https://amoveo.exan.tech/explorer/api/v1/txlist?address=${address}`,
      );
      const data = await rawData.json();

      const transactions = Array.isArray(data.result) ? data.result : [];

      setTransactions(transactions);
    },
    [headerId],
  );

  const dashboardState = {
    setTransactions,
    transactions,
  };

  return (
    <DashboardContext.Provider value={dashboardState}>
      <Dashboard />
    </DashboardContext.Provider>
  );
};

export default DashboardContainer;
