export default class Wallet {
  constructor(merkle, headers) {
    this.tree = merkle;
    this.headers = headers;
  }

  getBalance(pubkey) {
    return this.tree.request_proof('accounts', pubkey);
  }
}
