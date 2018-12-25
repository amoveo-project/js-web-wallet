import React, { Fragment, useEffect, useState } from 'react';
import VeoNode from 'amoveo-js-light-node';
import debounce from 'lodash/debounce';
import { Router, navigate } from '@reach/router';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './globalStyles';
import theme from './theme';

import CreateRestoreTemplate from 'shared/components/CreateRestoreTemplate';
import HomeTemplate from 'shared/components/HomeTemplate';

import Create from './screens/Create';
import Dashboard from './screens/Dashboard';
import Exchange from './screens/Exchange';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import Receive from './screens/Receive';
import Restore from './screens/Restore';
import Send from './screens/Send/';
import Test from './screens/Test';
import TransactionDetails from './screens/Dashboard/components/TransactionDetails';

import AppContext from 'shared/contexts/AppContext';

import {
  DOWNLOAD_PASSPHRASE,
  DOWNLOAD_PRIVATE_KEY,
  VEO_ADD_PENDING_TRANSACTION,
  VEO_REMOVE_PENDING_TRANSACTION,
  VEO_UPDATE_HEADER,
} from 'shared/constants/actions';

const veoNodeUrl =
  process.env.REACT_APP_VEO_NODE_URL || 'http://amoveo.exan.tech:8080';
const veo = new VeoNode(veoNodeUrl);

const App = () => {
  const [balance, setBalance] = useState(0);
  const [headerId, setHeaderId] = useState(0);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [keys, setKeys] = useState({ public: '', private: '' });
  const [passphrase, setPassphrase] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [unusedActions, setUnusedActions] = useState([
    DOWNLOAD_PASSPHRASE,
    DOWNLOAD_PRIVATE_KEY,
  ]);

  useEffect(() => {
    const beforeunloadListener = e => {
      e.preventDefault();
      e.returnValue = ''; // Chrome requires returnValue to be set
    };
    window.addEventListener('beforeunload', beforeunloadListener);

    const headerIdListener = data => {
      console.log({ data });
      setHeaderId(data[1]);
    };
    veo.events.on(VEO_UPDATE_HEADER, debounce(headerIdListener, 300));

    const addPendingTransaction = data =>
      setPendingTransactions(pendingTransactions => [
        {
          ...data.tx,
          hash: data.id,
          timestamp: Date.now() / 1000,
          _isPending: true,
        },
        ...pendingTransactions,
      ]);
    veo.events.on(VEO_ADD_PENDING_TRANSACTION, addPendingTransaction);

    const removePendingTransaction = data => {
      setPendingTransactions(pendingTransactions =>
        pendingTransactions.filter(tx => tx.hash !== data.id),
      );
    };
    veo.events.on(VEO_REMOVE_PENDING_TRANSACTION, removePendingTransaction);

    if (process.env.REACT_APP_DEBUG_PRIVATE_KEY) {
      createWallet({ privateKey: process.env.REACT_APP_DEBUG_PRIVATE_KEY });

      navigate('/dashboard/');
    }

    return () => {
      window.removeEventListener('beforeunload', beforeunloadListener);
      veo.events.removeListener(VEO_UPDATE_HEADER, headerIdListener);
      veo.events.removeListener(
        VEO_ADD_PENDING_TRANSACTION,
        addPendingTransaction,
      );
      veo.events.removeListener(
        VEO_REMOVE_PENDING_TRANSACTION,
        removePendingTransaction,
      );
    };
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
      if (!isWalletCreated) {
        return;
      }

      const transactions = await veo.wallet.getTransactions();

      setTransactions(transactions);
    },
    [headerId, isWalletCreated],
  );

  useEffect(
    () => {
      if (isWalletCreated) {
        veo.wallet.syncPendingTransactions();
      }
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

    if (!mnemonic) {
      setUnusedActions(unusedActions =>
        unusedActions.filter(item => item !== DOWNLOAD_PASSPHRASE),
      );
    }

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
    setUnusedActions([DOWNLOAD_PASSPHRASE, DOWNLOAD_PRIVATE_KEY]);
  };

  const appState = {
    balance,
    createWallet,
    headerId,
    isWalletCreated,
    keys,
    passphrase,
    pendingTransactions,
    resetWallet,
    setPendingTransactions,
    setUnusedActions,
    transactions,
    unusedActions,
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
            <Send path="/send" />
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
