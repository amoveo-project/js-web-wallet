import RPC from './rpc';
import EventEmitter from 'eventemitter3';

import Headers from './headers';
import MerkleProofs from './merkle';

class NodeEmitter extends EventEmitter {}

export default class VeoNode {
  constructor(url) {
    this.state = {};

    this.rpc = new RPC(url);
    this.events = new NodeEmitter();

    this.headers = new Headers(this.rpc, this.events);
    this.headers.init().then(this.headers.syncHeaders);

    this.tree = new MerkleProofs(this.rpc, this.headers);
  }

  getTopHeader() {
    return this.headers.getTopHeader(false);
  }

  getProof(tree, id) {
    return this.tree.request_proof(tree, id);
  }
}
