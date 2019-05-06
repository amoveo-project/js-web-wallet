import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ethers } from 'ethers';

import { downloadFile } from 'shared/utils/browser';

import Create from './components/Create';

import AppContext from 'shared/contexts/AppContext';
import CreateContext from 'shared/contexts/CreateContext';

import { DOWNLOAD_PASSPHRASE } from '../../shared/constants/actions';

const { HDNode } = ethers.utils;

const CreateContainer = () => {
  const { createWallet, passphrase, setUnusedActions } = useContext(AppContext);

  useEffect(() => {
    const mnemonic = HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    const masterNode = HDNode.fromMnemonic(mnemonic);
    const veoNode = masterNode.derivePath("m/44'/488'/0'/0/0");

    const privateKey = veoNode.privateKey.replace(/^0x/, '');

    createWallet({ privateKey, mnemonic });
  }, []);

  function downloadPassphrase() {
    downloadFile(passphrase, 'passphrase', 'text/plain');
    setUnusedActions(unusedActions =>
      unusedActions.filter(item => item !== DOWNLOAD_PASSPHRASE),
    );
  }

  const createState = {
    downloadPassphrase,
  };

  return (
    <CreateContext.Provider value={createState}>
      <Helmet>
        <title>Create Amoveo Wallet | VEO</title>
        <meta name="description" content="Create your own Amoveo wallet" />
      </Helmet>
      <Create />
    </CreateContext.Provider>
  );
};

export default CreateContainer;
