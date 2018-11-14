import React, { useContext, useEffect } from 'react';
import { ethers } from 'ethers';

import { downloadFile } from 'shared/utils/browser';

import Create from './components/Create';

import AppContext from 'shared/contexts/AppContext';
import CreateContext from 'shared/contexts/CreateContext';

const CreateContainer = () => {
  const { keys, setKeys, setPassphrase, veo } = useContext(AppContext);

  useEffect(() => {
    const { HDNode } = ethers.utils;

    const mnemonic = HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));

    const masterNode = HDNode.fromMnemonic(mnemonic);
    const veoNode = masterNode.derivePath("m/44'/488'/0'/0/0");

    const privateKey = veoNode.keyPair.privateKey.replace(/^0x/, '');

    veo.keys.generateKeyPair();
    veo.keys.setPrivateKey(privateKey);

    const keyPair = veo.keys.getKeyPair();

    setKeys({
      private: keyPair.private,
      public: veo.keys.getPublicKey(),
    });

    setPassphrase(mnemonic);
  }, []);

  function downloadPrivateKey() {
    downloadFile(keys.private, keys.public, 'text/plain');
  }

  const createState = {
    downloadPrivateKey,
  };

  return (
    <CreateContext.Provider value={createState}>
      <Create />
    </CreateContext.Provider>
  );
};

export default CreateContainer;
