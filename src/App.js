import React from 'react';

import VeoNode from './node/index';
import Keys from './node/keys';

import config from './config';

import { downloadFile } from './helpers/browser';

import './App.css';

const defaultConfig = {
  nodeUrl: 'http://amoveo.exan.tech:8080',
};

class App extends React.Component {
  state = {
    publicKey: null,
    privateKey: null,
    error: null,
    height: 28001,
    top: null,
  };

  componentDidMount() {
    this.node = new VeoNode(config.nodeUrl || defaultConfig.nodeUrl);

    this.node.events.on('header', header => {
      this.setState(state => ({ height: header[1] }));
    });

    this.keys = new Keys();
  }

  loadPubkey = async () => {};

  generateKeys = () => {
    this.keys.generateKeyPair();

    const keyPair = this.keys.getKeyPair();

    const privateKey = keyPair.private;
    const publicKey = this.keys.getPublicKey();

    this.setState(state => ({ privateKey, publicKey }));
  };

  loadPrivateKey = event => {
    const files = event.target.files;

    if (files.length < 1) {
      throw new Error('No file chosen');
    }

    const reader = new FileReader();

    reader.onloadend = event => {
      if (event.target.readyState === FileReader.DONE) {
        const privateKey = event.target.result;

        this.keys.setPrivateKey(privateKey);

        this.setState(state => ({
          privateKey,
          publicKey: this.keys.getPublicKey(),
        }));
      }
    };

    reader.readAsBinaryString(files[0]);

    event.target.value = null;
  };

  storePrivateKey = () => {
    const { privateKey, publicKey } = this.state;

    downloadFile(privateKey, publicKey, 'text/plain');
  };

  showTopHeader = () => {
    const topHeader = this.node.getTopHeader();

    this.setState(state => ({
      top: JSON.stringify(topHeader),
    }));
  };

  render() {
    const { publicKey, privateKey, error, height, top } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <p>Height: {height}</p>

          <p>
            <input
              type="button"
              onClick={this.showTopHeader}
              value="Show top header"
            />
          </p>

          {top && (
            <pre
              style={{
                width: '600px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {top}
            </pre>
          )}

          <br />

          <p>
            <input
              type="button"
              onClick={this.generateKeys}
              value="Generate keypair"
            />
          </p>

          <p>
            <label>
              Load key from file:&nbsp;
              <input id="load" type="file" onChange={this.loadPrivateKey} />
            </label>
          </p>

          {publicKey && (
            <div>
              <pre
                style={{
                  width: '600px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {publicKey}: {privateKey}
              </pre>
              <input
                type="button"
                value="Store private key"
                onClick={this.storePrivateKey}
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
