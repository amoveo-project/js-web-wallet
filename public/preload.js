// only needed because of https://github.com/LedgerHQ/ledgerjs/issues/332
require("regenerator-runtime/runtime");

const {
  addWallet,
  decryptWallet,
  getLastId,
  getRecentWallets,
  getWallets,
  openWallet,
  removeWallet,
  setLastId
} = require("./walletHelpers");

const NodeTransport = require('@ledgerhq/hw-transport-node-hid').default;

window._isElectron = true;

window._amoveoWallet = {
  addWallet,
  decryptWallet,
  getLastId,
  getRecentWallets,
  getWallets,
  openWallet,
  removeWallet,
  setLastId,
  NodeTransport,
};
