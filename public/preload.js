const {
  addWallet,
  decryptWallet,
  getLastId,
  getWallets,
  openWallet,
  setLastId
} = require("./walletHelpers");

window._isElectron = true;

window._amoveoWallet = {
  addWallet,
  decryptWallet,
  getLastId,
  getWallets,
  setLastId,
  openWallet
};
