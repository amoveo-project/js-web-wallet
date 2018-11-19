import React from 'react';
import VeoNode from 'amoveo-js-light-node';
import styled from 'styled-components';

import { downloadFile } from 'shared/utils/browser';

const TestWrapper = styled.div`
  text-align: center;
`;

const TestHeader = styled.div`
  background-color: #282c34;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const TopHeaderInfo = styled.pre`
  width: 600px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const KeyFile = styled.p`
  color: black;
`;

const KeysInfo = styled.pre`
  display: inline-block;
  margin: 0 auto;
  width: 600px;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: black;
`;

const BalanceInfo = styled.p`
  color: black;
`;

class Test extends React.Component {
  state = {
    publicKey: null,
    privateKey: null,
    error: null,
    height: 28001,
    nodeHeight: null,
    top: null,
    balance: null,
  };

  componentDidMount() {
    const veoNodeUrl =
      process.env.REACT_APP_VEO_NODE_URL || 'http://amoveo.exan.tech:8080';

    this.node = new VeoNode(veoNodeUrl);

    this.node
      .getNodeHeight()
      .then(height => this.setState({ nodeHeight: height }));

    this.node.events.on('header', header => {
      this.setState(state => ({ height: header[1] }));
    });

    // this.keys = new Keys();
  }

  loadPubkey = async () => {};

  generateKeys = () => {
    this.node.keys.generateKeyPair();

    const keyPair = this.node.keys.getKeyPair();

    const privateKey = keyPair.private;
    const publicKey = this.node.keys.getPublicKey();

    this.setState(state => ({ privateKey, publicKey }));

    this.node
      .getBalance()
      .then(balance => {
        this.setState({ balance });
      })
      .catch(err => {
        this.setState({ balance: 0 });
      });
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

        this.node.keys.setPrivateKey(privateKey);

        this.setState(state => ({
          privateKey,
          publicKey: this.node.keys.getPublicKey(),
        }));

        this.node
          .getBalance()
          .then(balance => {
            this.setState({ balance });
          })
          .catch(err => {
            console.log("can't get balance: " + err);
            this.setState({ balance: 0 });
          });
      }
    };

    reader.readAsBinaryString(files[0]);

    event.target.value = null;
  };

  storePrivateKey = () => {
    const { privateKey, publicKey } = this.state;

    downloadFile(privateKey, publicKey, 'text/plain');
  };

  testMerkle = () => {
    this.node.getProof('governance', 14).then(proof => {
      console.log('test result is: ', proof);
    });

    this.node
      .getProof('oracles', 'koWAM1ANpoPGmd+o3AFVABVyc7EeEHanf8qqmxOLeE4=')
      .then(proof => {
        console.log('test result is: ', proof);
      });
  };

  testTx = async () => {
    const txid1 = await this.node.sendMoney(
      'BOK3aoRrpJiPzATO8HVnQmwmf8S9eUheF//dcWJ58l0FE9yqrF+7RDrJOy9TJX9eWIQFwzBUZSr0JxTVfqFCVj8=',
      120000,
    );

    console.log(txid1);

    // const txid2 = await this.node.sendMoney(
    //   "BMa7Jqz6r85dLZ+qYvLl+q9mknsxVkYy4itjPYLvomyKzeCIMR1k3+RPx9o4iQsAsGI4zO5OFZMPHdd7emOkPEs=",
    //   120000);

    // console.log(txid2);
  };

  showTopHeader = () => {
    const topHeader = this.node.getTopHeader();

    this.setState(state => ({
      top: JSON.stringify(topHeader),
    }));
  };

  render() {
    const {
      balance,
      publicKey,
      privateKey,
      nodeHeight,
      height,
      top,
    } = this.state;

    return (
      <TestWrapper>
        <TestHeader>
          <p>
            Height: {height} / {nodeHeight}
          </p>

          <p>
            <input
              type="button"
              onClick={this.showTopHeader}
              value="Show top header"
            />
          </p>

          {top && <TopHeaderInfo>{top}</TopHeaderInfo>}
        </TestHeader>

        <p>
          <input
            type="button"
            onClick={this.generateKeys}
            value="Generate keypair"
          />
        </p>

        <KeyFile>
          <label>
            Load key from file:&nbsp;
            <input id="load" type="file" onChange={this.loadPrivateKey} />
          </label>
        </KeyFile>

        {publicKey && (
          <div>
            <KeysInfo>
              {publicKey}: {privateKey}
            </KeysInfo>
            <BalanceInfo>Balance: {balance} VEO</BalanceInfo>
            <input
              type="button"
              value="Store private key"
              onClick={this.storePrivateKey}
            />
          </div>
        )}

        <hr />
        <div>
          <input
            type="button"
            onClick={this.testMerkle}
            value="Test Merkle (console)"
          />
        </div>
        <div>
          <input
            type="button"
            onClick={this.testTx}
            value="Test Tx (console)"
          />
        </div>
      </TestWrapper>
    );
  }
}

export default Test;
