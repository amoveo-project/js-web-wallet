export default class RPC {
  constructor(url) {
    this.url = url;
  }

  getHeaders = async (top, number) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['headers', number, top]),
    });

    const data = await response.json();
    return data[1].slice(1);
  };

  getProof = async (tree, key, topHash) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['proof', tree, key, topHash]),
    });

    const data = await response.json();
    return data[1];
  };

  getAccountState = async account => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['account', account]),
    });

    const data = await response.json();
    return data[1];
  };

  createTx = async (type, amount, fee, from, to) => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify([type, amount, fee, from, to]),
    });

    const data = await response.json();
    return data[1];
  };

  pushTx = async signedTx => {
    const response = await fetch(this.url, {
      method: 'POST',
      body: JSON.stringify(['txs', [-6, signedTx]]),
    });

    const data = await response.json();
    return data[1];
  };
}
