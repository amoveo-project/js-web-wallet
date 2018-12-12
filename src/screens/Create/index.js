import React, { useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import { downloadFile } from 'shared/utils/browser';

import Create from './components/Create';

import AppContext from 'shared/contexts/AppContext';
import CreateContext from 'shared/contexts/CreateContext';

const { HDNode } = ethers.utils;

const CreateContainer = () => {
  const { createWallet, passphrase } = useContext(AppContext);

  useEffect(() => {
    const mnemonic = HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    const masterNode = HDNode.fromMnemonic(mnemonic);
    const veoNode = masterNode.derivePath("m/44'/488'/0'/0/0");

    const privateKey = veoNode.keyPair.privateKey.replace(/^0x/, '');

    createWallet({ privateKey, mnemonic });
  }, []);

  function downloadPassphrase() {
    downloadFile(passphrase, 'passphrase', 'text/plain');
  }

  const createState = {
    downloadPassphrase,
  };

  return (
    <CreateContext.Provider value={createState}>
      <Create />
    </CreateContext.Provider>
  );
};

export default CreateContainer;
