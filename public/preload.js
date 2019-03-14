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

window._isElectron = true;

window._amoveoWallet = {
  addWallet,
  decryptWallet,
  getLastId,
  getRecentWallets,
  getWallets,
  openWallet,
  removeWallet,
  setLastId
};
