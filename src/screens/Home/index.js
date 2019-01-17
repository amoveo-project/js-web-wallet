import React, { useContext, useEffect } from 'react';

import Home from './components/Home';

import AppContext from 'shared/contexts/AppContext';

const HomeContainer = ({ path }) => {
  const { resetWallet } = useContext(AppContext);

  useEffect(() => {
    const isLogout = path && path.startsWith('/logout');

    if (isLogout) {
      resetWallet();
    }
  }, []);

  return <Home />;
};

export default HomeContainer;
