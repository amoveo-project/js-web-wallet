import React, { useEffect, useState } from 'react';
import VeoNode, { LedgerKeys } from 'amoveo-js-light-node';
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
import Download from './screens/Download';
import Faq from './screens/Faq';
import Receive from './screens/Receive';
import Restore from './screens/Restore';
import Recent from './screens/Recent';
import Send from './screens/Send/';
import Test from './screens/Test';
import TransactionDetails from './screens/Dashboard/components/TransactionDetails';

import AppContext from 'shared/contexts/AppContext';
import ErrorModal from 'shared/components/ErrorModal';
import LedgerModal from 'shared/components/LedgerModal';

import Transport from './hw-transport';
import Veo from 'hw-app-veo';

import {
  DOWNLOAD_PASSPHRASE,
  DOWNLOAD_PRIVATE_KEY,
  VEO_ADD_PENDING_TRANSACTION,
  VEO_REMOVE_PENDING_TRANSACTION,
  VEO_UPDATE_HEADER,
} from 'shared/constants/actions';
import { LEDGER_MAGIC_NUMBER } from 'shared/constants/ledger';

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
  const [isHardware, setIsHardware] = useState(false);
  const [keys, setKeys] = useState({ public: '' });
  const [passphrase, setPassphrase] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [unusedActions, setUnusedActions] = useState([
    DOWNLOAD_PASSPHRASE,
    DOWNLOAD_PRIVATE_KEY,
  ]);
  const [u2fSupport, setU2fSupport] = useState(false);
  const [modal, setModal] = useState(null);

  // didMount
  useEffect(() => {
    Transport.isSupported().then(setU2fSupport);

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

  useEffect(() => {
    const isCreated = Boolean(keys.public);
    setIsWalletCreated(isCreated);
  }, [keys, passphrase]);

  async function setBalanceAsync(isWalletCreated) {
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
  }

  useEffect(() => {
    setBalanceAsync(isWalletCreated);
  }, [headerId, isWalletCreated]);

  async function setTransactionsAsync(isWalletCreated) {
    if (isWalletCreated) {
      const transactions = await veo.wallet.getTransactions();
      setTransactions(transactions);
    }
  }

  useEffect(() => {
    setTransactionsAsync(isWalletCreated);
  }, [headerId, isWalletCreated]);

  useEffect(() => {
    if (isWalletCreated) {
      veo.wallet.syncPendingTransactions();
    }
  }, [headerId, isWalletCreated]);

  const storeWallet = async ({ password }) => {
    if (!window._isElectron) {
      return;
    }

    const keyPair = veo.keys.getKeyPair();
    const mnemonic = passphrase;

    try {
      await window._amoveoWallet.removeWallet(keyPair.public);
    } catch (e) {
      // no actions
    }

    await window._amoveoWallet.addWallet({
      publicKey: keyPair.public,
      privateKey: keyPair.private,
      password,
      mnemonic,
    });
    await window._amoveoWallet.setLastId(keyPair.public);
  };

  const recoverWallet = async ({ walletId, password }) => {
    try {
      const { privateKey, mnemonic } = await window._amoveoWallet.decryptWallet(
        walletId,
        password,
      );

      if (privateKey) {
        createWallet({ privateKey, mnemonic });
      }
    } catch (e) {
      throw new Error("Couldn't recover wallet");
    }
  };

  const createWallet = async ({ privateKey, mnemonic = '' }) => {
    veo.keys.generateKeyPair();
    veo.keys.setPrivateKey(privateKey);

    const keyPair = veo.keys.getKeyPair();

    setKeys({
      public: veo.keys.getPublicKey(),
    });

    setPassphrase(mnemonic);

    if (window._isElectron) {
      await window._amoveoWallet.setLastId(keyPair.public);
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
  };

  const enterLedger = async () => {
    const transport = await Transport.create();
    // transport.setDebugMode(true);
    const ledger = new Veo(transport);
    const ledgerKeys = new LedgerKeys(ledger);

    try {
      setModal(
        <LedgerModal
          title="Connecting to Ledger"
          text="Please wait"
          onClick={() => setModal(null)}
        />,
      );
      await ledgerKeys.generateKeyPair();
      veo.wallet.keys = ledgerKeys;
      const publicKey = ledgerKeys.getPublicKey();

      setKeys({
        private: LEDGER_MAGIC_NUMBER, // random
        public: publicKey,
      });

      setPassphrase('');
      setBalance(0);
      setUnusedActions([]);

      setIsHardware(true);

      setModal(null);
      routerHistory.navigate('/dashboard/');
    } catch (e) {
      setModal(
        <ErrorModal
          text="Can't find Ledger Nano S"
          onClick={() => setModal(null)}
        />,
      );
    }
  };

  const verifyOwnAddress = async () => {
    let isVerified = false;

    if (!isHardware) {
      isVerified = true;
    }

    try {
      setModal(
        <LedgerModal
          text="Please check your ledger wallet"
          onClick={() => setModal(null)}
        />,
      );

      setTimeout(() => {
        setModal(null);
      }, 1500);

      const address = await veo.wallet.keys.getVerifiedAddress();

      isVerified = address ? true : false;
    } catch (e) {
      isVerified = false;
    }

    return isVerified;
  };

  const appState = {
    balance,
    createWallet,
    headerId,
    headerIdSync,
    headerIdTop,
    isHardware,
    isWalletCreated,
    keys,
    passphrase,
    pendingTransactions,
    resetWallet,
    enterLedger,
    recoverWallet,
    setPendingTransactions,
    setUnusedActions,
    setModal,
    storeWallet,
    transactions,
    unusedActions,
    veo,
    verifyOwnAddress,
    u2fSupport,
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appState}>
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
            <Recent path="/recent" />
            <Exchange path="/exchange" />
            <Download path="/download" />
            <Faq path="/faq" />

            <Test path="/test" />

            <NotFound default />
          </Router>
        </LocationProvider>

        {modal}
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
