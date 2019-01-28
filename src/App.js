import React, { Fragment, useEffect, useState } from 'react';
import VeoNode from 'amoveo-js-light-node';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import {
  createMemorySource,
  createHistory,
  LocationProvider,
  Router,
} from '@reach/router';
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

const isFileProtocol = window.location.protocol.startsWith('file:');

const memorySource = createMemorySource('/');
const routerHistory = createHistory(
  window._isElectron || isFileProtocol ? memorySource : window,
);

const App = () => {
  const [balance, setBalance] = useState(0);
  const [headerId, setHeaderId] = useState(0);
  const [headerIdSync, setHeaderIdSync] = useState(0);
  const [headerIdTop, setHeaderIdTop] = useState(0);
  const [isWalletCreated, setIsWalletCreated] = useState(false);
  const [keys, setKeys] = useState({ public: '' });
  const [passphrase, setPassphrase] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [unusedActions, setUnusedActions] = useState([
    DOWNLOAD_PASSPHRASE,
    DOWNLOAD_PRIVATE_KEY,
  ]);

  useEffect(() => {
    const setTopHeader = async () => {
      const headerIdTop = await veo.getNodeHeight();
      setHeaderIdTop(headerIdTop);
    };
    setTopHeader();

    const headerIdListener = data => {
      setHeaderId(data[1]);

      setTopHeader();
    };
    veo.events.on(VEO_UPDATE_HEADER, debounce(headerIdListener, 300));

    const headerIdSyncListener = data => {
      setHeaderIdSync(data[1]);
    };
    veo.events.on(VEO_UPDATE_HEADER, throttle(headerIdSyncListener, 300));

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

    const beforeunloadListener = e => {
      e.preventDefault();
      e.returnValue = ''; // Chrome requires returnValue to be set
    };

    if (!window._isElectron) {
      window.addEventListener('beforeunload', beforeunloadListener);
    }

    if (window._isElectron) {
      const privateKey = window._amoveoWallet.getConfigPrivateKey();
      const mnemonic = window._amoveoWallet.getConfigPassphrase();

      if (privateKey) {
        createWallet({ privateKey, mnemonic });

        routerHistory.navigate('/dashboard/');
      }
    }

    if (!window._isElectron && process.env.REACT_APP_DEBUG_PRIVATE_KEY) {
      createWallet({ privateKey: process.env.REACT_APP_DEBUG_PRIVATE_KEY });

      routerHistory.navigate('/dashboard/');
    }

    return () => {
      veo.events.removeListener(VEO_UPDATE_HEADER, headerIdListener);
      veo.events.removeListener(VEO_UPDATE_HEADER, headerIdSyncListener);
      veo.events.removeListener(
        VEO_ADD_PENDING_TRANSACTION,
        addPendingTransaction,
      );
      veo.events.removeListener(
        VEO_REMOVE_PENDING_TRANSACTION,
        removePendingTransaction,
      );

      if (!window._isElectron) {
        window.removeEventListener('beforeunload', beforeunloadListener);
      }
    };
  }, []);

  useEffect(
    () => {
      const isCreated = Boolean(keys.public);
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
      public: veo.keys.getPublicKey(),
    });

    setPassphrase(mnemonic);

    if (window._isElectron) {
      window._amoveoWallet.setConfigPrivateKey(keyPair.private);
      window._amoveoWallet.setConfigPassphrase(mnemonic);
    }

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
      public: '',
    });

    setPassphrase('');
    setBalance(0);
    setUnusedActions([DOWNLOAD_PASSPHRASE, DOWNLOAD_PRIVATE_KEY]);

    if (window._isElectron) {
      window._amoveoWallet.setConfigPrivateKey('');
      window._amoveoWallet.setConfigPassphrase('');
    }
  };

  const appState = {
    balance,
    createWallet,
    headerId,
    headerIdSync,
    headerIdTop,
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

          <LocationProvider history={routerHistory}>
            <Router className="routerwrap">
              <HomeTemplate path="/">
                <Home path="/" />
                <Home path="/logout" />
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
          </LocationProvider>
        </Fragment>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
