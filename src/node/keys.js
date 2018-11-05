import elliptic from 'elliptic';

import { hash } from './utils/crypto';
import { arrayToString, hexToString } from './utils/format';
import { sign } from './utils/signing';

class Keys {
  constructor(entropy = '') {
    this._ellipticCurve = new elliptic.ec('secp256k1');
    // this._keyPair = this._getNewKeyPair(entropy);
  }

  _getNewKeyPair(entropy = null) {
    const isCustomEntropy = Boolean(entropy);

    const params = isCustomEntropy ? { entropy: hash(entropy) } : {};

    return this._ellipticCurve.genKeyPair(params);
  }

  generateKeyPair(entropy) {
    this._keyPair = this._getNewKeyPair(entropy);
  }

  setPrivateKey(privateKey) {
    this._keyPair = this._ellipticCurve.keyFromPrivate(privateKey, 'hex');
  }

  getKeyPair() {
    return {
      private: this._keyPair.getPrivate('hex'),
      public: this._keyPair.getPublic('hex'),
    };
  }

  getPublicKey() {
    const publicKey = this._keyPair.getPublic('hex');

    return btoa(hexToString(publicKey));
  }

  signTransaction(transaction) {
    const isAlreadySigned = transaction[0] === 'signed';

    if (isAlreadySigned) {
      const signature = btoa(
        arrayToString(sign(transaction[1], this._keyPair)),
      );
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
      const signature = btoa(arrayToString(sign(transaction, this._keyPair)));

      return ['signed', transaction, signature, [-6]];
    }
  }
}

export default Keys;
