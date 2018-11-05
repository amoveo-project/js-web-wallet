import RPC from './rpc';
import EventEmitter from 'eventemitter3';

import Headers from './headers';
import MerkleProofs from './merkle';
import Wallet from './wallet';
import Keys from './keys';

import { units } from './config';

class NodeEmitter extends EventEmitter {}

export default class VeoNode {
  constructor(url, options = {}) {
    this.state = {};

    this.rpc = new RPC(url);
    this.events = new NodeEmitter();

    this.headers = new Headers(this.rpc, this.events);
    this.headers.init().then(this.headers.syncHeaders);

    this.tree = new MerkleProofs(this.rpc, this.headers);

    this.keys = options.keys || new Keys();

    this.wallet = new Wallet(this.tree, this.headers);
  }

  getTopHeader() {
    return this.headers.getTopHeader(false);
  }

  getProof(tree, id) {
    return this.tree.request_proof(tree, id);
  }

  getBalance() {
    const key = this.keys.getPublicKey();
    return this.wallet.getBalance(key).then(response => response[1] / units);
  }
}
