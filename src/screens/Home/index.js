import React, { useContext, useEffect } from 'react';

import Home from './components/Home';

import AppContext from 'shared/contexts/AppContext';

const HomeContainer = () => {
  const { setKeys, setPassphrase } = useContext(AppContext);

  useEffect(() => {
    setKeys({
      private: null,
      public: null,
    });

    setPassphrase('');
  }, []);

  return <Home />;
};

export default HomeContainer;
