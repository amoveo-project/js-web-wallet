import RPC from './rpc'
import EventEmitter from 'eventemitter3'

import Headers from './headers'

class NodeEmitter extends EventEmitter {}

export default class VeoNode {
  constructor(url) {
    this.state = {}

    this.rpc = new RPC(url)
    this.events = new NodeEmitter()

    this.headers = new Headers(this.rpc, this.events)
    this.headers.syncHeaders()
  }
}
