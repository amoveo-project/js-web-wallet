import React, { Fragment, useEffect, useState } from 'react';
import VeoNode from 'amoveo-js-light-node';
import { Router, navigate } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './globalStyles';
import theme from './theme';

import CreateRestoreTemplate from 'shared/components/CreateRestoreTemplate';
import HomeTemplate from 'shared/components/HomeTemplate';
import SendTemplate from './screens/Send/components/Send';
import TransactionDetails from './screens/Dashboard/components/TransactionDetails';

import Create from './screens/Create';
import Dashboard from './screens/Dashboard';
import Exchange from './screens/Exchange';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import Receive from './screens/Receive';
import Restore from './screens/Restore';
import Test from './screens/Test';

import AppContext from 'shared/contexts/AppContext';

const veoNodeUrl =
  process.env.REACT_APP_VEO_NODE_URL || 'http://amoveo.exan.tech:8080';
const veo = new VeoNode(veoNodeUrl);

const App = () => {
  const [balance, setBalance] = useState(0);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [keys, setKeys] = useState({
    public: '',
    private: '',
  });
  const [passphrase, setPassphrase] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [headerId, setHeaderId] = useState(0);

  useEffect(() => {
    const headerIdListener = data => setHeaderId(data[1]);
    veo.events.on('header', headerIdListener);

    if (process.env.REACT_APP_DEBUG_PRIVATE_KEY) {
      createWallet({ privateKey: process.env.REACT_APP_DEBUG_PRIVATE_KEY });

      navigate('/dashboard');
    }

    return () => veo.events.removeListener('header', headerIdListener);
  }, []);

  useEffect(
    () => {
      const isCreated = Boolean(keys.public) && Boolean(keys.private);
      setIsWalletCreated(isCreated);
    },
    [keys, passphrase],
  );

  useEffect(
    async () => {
      if (isWalletCreated) {
        try {
          const balance = await veo.getBalance();
          setBalance(balance);
        } catch (e) {
          // no actions
        }
      } else {
        setBalance(0);
      }
    },
    [headerId, isWalletCreated],
  );

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
    [headerId, isWalletCreated],
  );

  const createWallet = async ({ privateKey, mnemonic = '' }) => {
    veo.keys.generateKeyPair();
    veo.keys.setPrivateKey(privateKey);

    const keyPair = veo.keys.getKeyPair();

    setKeys({
      private: keyPair.private,
      public: veo.keys.getPublicKey(),
    });

    setPassphrase(mnemonic);

    try {
      const balance = await veo.getBalance();
      setBalance(balance);
    } catch (e) {
      // no actions
    }
  };

  const resetWallet = () => {
    setKeys({
      private: '',
      public: '',
    });

    setPassphrase('');

    setBalance(0);
  };

  const appState = {
    balance,
    createWallet,
    headerId,
    isWalletCreated,
    keys,
    passphrase,
    resetWallet,
    transactions,
    veo,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appState}>
        <Fragment>
          <GlobalStyles />

          <Router className="routerwrap">
            <HomeTemplate path="/">
              <Home path="/" />
            </HomeTemplate>

            <CreateRestoreTemplate path="/create">
              <Create path="/" />
            </CreateRestoreTemplate>

            <CreateRestoreTemplate path="/restore">
              <Restore path="/" />
            </CreateRestoreTemplate>

            <Dashboard path="/dashboard" />
            <TransactionDetails path="/dashboard/:transactionId" />
            <SendTemplate path="/send" />
            <Receive path="/receive" />
            <Exchange path="/exchange" />

            <Test path="/test" />

            <NotFound default />
          </Router>
        </Fragment>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
