import { defaultMinerFee } from './config';
import { treeNumber2Value, arrayToString } from './utils/format';

export default class Wallet {
  constructor(rpc, merkle, headers, keys) {
    this.rpc = rpc;
    this.tree = merkle;
    this.headers = headers;
    this.keys = keys;
  }

  getBalance(pubkey = undefined) {
    pubkey = pubkey || this.keys.getPublicKey();
    return this.tree.request_proof('accounts', pubkey);
  }

  getAccountState(receiver, minerFee = undefined) {
    if (minerFee === undefined) minerFee = defaultMinerFee;

    const result = new Promise((resolve, reject) => {
      this.rpc
        .getAccountState(receiver)
        .then(state => {
          const govFeeVar = state === 'empty' ? 14 : 15;
          this.tree
            .request_proof('governance', govFeeVar)
            .then(result => {
              const fee = treeNumber2Value(result[2]) + minerFee;
              resolve({ state, fee });
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });

    return result;
  }

  createTxProposal = async (origin, receiver, amount, minerFee = undefined) => {
    if (minerFee === undefined) minerFee = defaultMinerFee;

    if (minerFee < 9) {
      throw Error(
        'miner fee specified is less than default min_tx_fee (9 sat)',
      );
    }

    const { fee: minimalFee, state } = await this.getAccountState(receiver, 0);
    const fee = minimalFee + minerFee;

    let currentBalance;
    try {
      currentBalance = await this.getBalance(origin);
    } catch (e) {
      currentBalance = 0;
    }

    if (currentBalance < fee + amount) {
      throw Error(
        'amount + fee = ' +
          (fee + amount) +
          ' exceeds available balance ' +
          currentBalance,
      );
    }

    let txType;
    if (state === 'empty') {
      txType = 'create_account_tx';
    } else {
      txType = 'spend_tx';
    }

    const tx = await this.rpc.createTx(txType, amount, fee, origin, receiver);

    return { tx, fee };
  };

  sendMoney = async (receiver, amount, minerFee = undefined) => {
    const origin = this.keys.getPublicKey();

    const { tx, fee } = await this.createTxProposal(
      origin,
      receiver,
      amount,
      minerFee,
    );
    console.debug(tx, fee);

    if (tx[5] !== amount) {
      throw Error('amount has changed');
    } else if (tx[3] !== fee) {
      throw Error('fee has changed');
    } else if (tx[4] !== receiver) {
      throw Error('receiver has changed');
    }

    const signed = this.keys.signTransaction(tx);
    console.debug(signed);

    return this.rpc.pushTx(signed);
  };
}
