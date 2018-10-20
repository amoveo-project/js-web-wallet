import React, { Component } from 'react';

import VeoNode from './node/index';

import config from './config';

import './App.css';

const defaultConfig = {
  nodeUrl: 'http://amoveo.exan.tech:8080',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { publicKey: '', error: null, height: 28001, top: null };

    this.showTopHeader = this.showTopHeader.bind(this);
  }

  componentDidMount = async () => {
    this.node = new VeoNode(config.nodeUrl || defaultConfig.nodeUrl);

    this.node.events.on('header', header => {
      this.setState({ height: header[1] });
    });
  };

  loadPubkey = async () => {};

  showTopHeader() {
    this.setState({ top: JSON.stringify(this.node.getTopHeader()) });
  }

  render() {
    const { publicKey, error, height, top } = this.state;
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
        </header>
      </div>
    );
  }
}

export default App;
