import React, { Component } from 'react';
import Transport from '@ledgerhq/hw-transport-u2f';
import Veo from 'amoveojs-ledger';

import VeoNode from './node/index';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {publicKey: "", error: null, height: 28001};
  }

  componentDidMount = async() => {
    this.node = new VeoNode("https://amoveo.local");

    this.node.events.on("header", (header) => {
      this.setState({ height: header[1] });
    });
  }

  loadPubkey = async() => {
    this.setState({ error: null });

    try {
      const transport = await Transport.create();
      const veo = new Veo(transport);
      const { publicKey } = await veo.getAddress("0'/0/0", this.refs.confirm.checked);
      this.setState({ publicKey });

    } catch (error) {
      console.error(error);
      this.setState({ error });
    };
  }

  render() {
    const { publicKey, error, height } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Height: { height }</p>
          <p>
            <label>
              <input type="checkbox" ref="confirm"/>
              Confirm pubkey?
            </label>
            <br/>
            <input type="button" value="Load pubkey" onClick={this.loadPubkey}/>
          </p>
          {error ? (
            <code>{ error.toString() }</code>
          ) : (
            <code>Pubkey: { publicKey }</code>
          )}
        </header>
      </div>
    );
  }
}

export default App;
