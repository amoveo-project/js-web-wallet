import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Restore from './components/Restore';

import AppContext from 'shared/contexts/AppContext';
import RestoreContext from 'shared/contexts/RestoreContext';

const RestoreContainer = () => {
  const { createWallet } = useContext(AppContext);

  const [currentTab, setCurrentTab] = useState('passphrase');
  const [tempPassphrase, setTempPassphrase] = useState('');
  const [tempPrivateKey, setTempPrivateKey] = useState('');
  const [isValidMnemonic, setIsValidMnemonic] = useState(false);
  const [isValidPrivateKey, setIsValidPrivateKey] = useState(false);

  useEffect(
    () => {
      const { HDNode } = ethers.utils;

      const isValidMnemonic = HDNode.isValidMnemonic(tempPassphrase);
      setIsValidMnemonic(isValidMnemonic);
    },
    [tempPassphrase],
  );

  useEffect(
    () => {
      const isValidPrivateKey = tempPrivateKey.length === 64;
      setIsValidPrivateKey(isValidPrivateKey);
    },
    [tempPrivateKey],
  );

  useEffect(
    () => {
      if (!isValidMnemonic) {
        return;
      }

      const mnemonic = tempPassphrase;

      const { HDNode } = ethers.utils;

      const masterNode = HDNode.fromMnemonic(mnemonic);
      const veoNode = masterNode.derivePath("m/44'/488'/0'/0/0");

      const privateKey = veoNode.keyPair.privateKey.replace(/^0x/, '');

      createWallet({ privateKey, mnemonic });
    },
    [isValidMnemonic],
  );

  useEffect(
    () => {
      if (!isValidPrivateKey) {
        return;
      }

      const privateKey = tempPrivateKey;

      createWallet({ privateKey, mnemonic: '' });
    },
    [isValidPrivateKey],
  );

  const handlePassphraseInput = e => {
    setTempPassphrase(e.target.value);
  };

  const handlePrivateKeyInput = e => {
    setTempPrivateKey(e.target.value);
  };

  const handleTabChange = (tab = 'passphrase') => {
    setCurrentTab(tab);

    setTempPassphrase('');
    setTempPrivateKey('');
  };

  const restoreState = {
    currentTab,
    handlePassphraseInput,
    handlePrivateKeyInput,
    handleTabChange,
    isValidMnemonic,
    isValidPrivateKey,
    setCurrentTab,
    setIsValidMnemonic,
    setIsValidPrivateKey,
    setTempPassphrase,
    setTempPrivateKey,
    tempPassphrase,
    tempPrivateKey,
  };

  return (
    <RestoreContext.Provider value={restoreState}>
      <Restore />
    </RestoreContext.Provider>
  );
};

export default RestoreContainer;
