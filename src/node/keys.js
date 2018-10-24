import elliptic from 'elliptic';

import { hash } from './crypto';
import { array_to_string, fromHex } from './format';

class Keys {
  constructor(entropy) {
    this._ec = new elliptic.ec('secp256k1');

    this._keyPair = this._getNewKeyPair(entropy);
  }

  _getNewKeyPair(entropy = null) {
    const isCustomEntropy = Boolean(entropy);

    const params = isCustomEntropy
      ? {
          entropy: hash(entropy),
        }
      : {};

    return this._ec.genKeyPair(params);
  }

  generateKeyPair(entropy) {
    this._keyPair = this._getNewKeyPair(entropy);
  }

  setPrivateKey(privateKey) {
    this._keyPair = this._ec.keyFromPrivate(privateKey, 'hex');
  }

  getKeyPair() {
    return {
      private: this._keyPair.getPrivate('hex'),
      public: this._keyPair.getPublic('hex'),
    };
  }

  getPublicKey() {
    const publicKey = this._keyPair.getPublic('hex');

    return btoa(fromHex(publicKey));
  }

  sign(transaction) {
    if (transaction[0] === 'signed') {
      const signature = btoa(array_to_string(this.sign(transaction[1])));

      const publicKey = this.getPublicKey();

      if (publicKey === transaction[1][1]) {
        transaction[2] = signature;
      } else if (publicKey === transaction[1][2]) {
        transaction[3] = signature;
      } else {
        throw new Error('sign error');
      }

      return transaction;
    } else {
      const signature = btoa(array_to_string(this.sign(transaction)));

      return ['signed', transaction, signature, [-6]];
    }
  }
}

export default Keys;
