import React, { useContext, useEffect } from 'react';

import Home from './components/Home';

import AppContext from 'shared/contexts/AppContext';

const HomeContainer = () => {
  const { resetWallet } = useContext(AppContext);

  useEffect(() => resetWallet(), []);

  return <Home />;
};

export default HomeContainer;
