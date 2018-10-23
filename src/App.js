import React, { Component } from 'react';

import VeoNode from './node/index';
import Keys from './node/keys';

import config from './config';

import './App.css';

const defaultConfig = {
  nodeUrl: 'http://amoveo.exan.tech:8080',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: null,
      privateKey: null,
      error: null,
      height: 28001,
      top: null,
    };

    this.showTopHeader = this.showTopHeader.bind(this);
    this.generateKeys = this.generateKeys.bind(this);
    this.loadPrivateKey = this.loadPrivateKey.bind(this);
    this.storePrivateKey = this.storePrivateKey.bind(this);
  }

  componentDidMount = async () => {
    this.node = new VeoNode(config.nodeUrl || defaultConfig.nodeUrl);

    this.node.events.on('header', header => {
      this.setState({ height: header[1] });
    });

    this.keys = new Keys();
  };

  loadPubkey = async () => {};

  generateKeys() {
    this.keys.make();
    const pair = this.keys.getKeys();
    this.setState({ privateKey: pair['private'], publicKey: this.keys.pub() });
  }

  loadPrivateKey(evt) {
    const files = evt.target.files;
    if (files.length < 1) throw Error();

    const self = this;

    const reader = new FileReader();
    reader.onloadend = evt => {
      if (evt.target.readyState == FileReader.DONE) {
        const data = evt.target.result;

        self.keys.setPrivateKey(data);
        self.setState({ privateKey: data, publicKey: self.keys.pub() });
      }
    };

    reader.readAsBinaryString(files[0]);
    evt.target.value = null;
  }

  storePrivateKey() {
    function download(data, filename, type) {
      var file = new Blob([data], { type: type });
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        // Others
        var a = document.createElement('a'),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    }

    download(this.state.privateKey, this.state.publicKey, 'text/plain');
  }

  showTopHeader() {
    this.setState({ top: JSON.stringify(this.node.getTopHeader()) });
  }

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
          {top ? (
            <pre
              style={{
                width: '600px',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
              }}
            >
              {top}
            </pre>
          ) : (
            ''
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
          {publicKey ? (
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
          ) : (
            ''
          )}
        </header>
      </div>
    );
  }
}

export default App;
