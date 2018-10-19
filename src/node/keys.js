import elliptic from 'elliptic';

import { hash } from './crypto';
import { array_to_string, fromHex } from './format';

class Keys {
  constructor(props) {
    this.options = {
      genKeyPairParams: {},
      ...props,
    };

    this.ec = new elliptic.ec('secp256k1');
    this.keys = this.ec.genKeyPair(this.options.genKeyPairParams);
  }

  make() {
    this.keys = this.ec.genKeyPair(this.options.genKeyPairParams);

    return this.keys;
  }

  pub() {
    const pubPoint = this.keys.getPublic('hex');

    return btoa(fromHex(pubPoint));
  }

  sign(tx) {
    if (tx[0] == 'signed') {
      const sig = btoa(array_to_string(this.sign(tx[1], this.keys)));

      const pub = this.pub();

      if (pub == tx[1][1]) {
        tx[2] = sig;
      } else if (pub == tx[1][2]) {
        tx[3] = sig;
      } else {
        throw 'sign error';
      }

      return tx;
    } else {
      var sig = btoa(array_to_string(this.sign(tx, this.keys)));

      return ['signed', tx, sig, [-6]];
    }
  }

  encrypt(val, to) {
    // return encryption_object.send(val, to, keys)
  }

  decrypt(val) {
    // return encryption_object.get(val, keys)
  }

  check_balance(cb) {
    var trieKey = this.pub();

    /* merkle.request_proof('accounts', trieKey, function(x) {
      cb(x[1])
    }) */
  }

  regenerate() {
    this.make();

    return this;
  }

  setEntropy(entropy) {
    this.options.genKeyPairParams.entropy = hash(entropy);

    this.regenerate();
  }

  getKeys() {
    return {
      private: this.keys.getPrivate('hex'),
      public: this.keys.getPublic('hex'),
    };
  }
}

export default Keys;
