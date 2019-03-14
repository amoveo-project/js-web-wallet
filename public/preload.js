const {
  addWallet,
  decryptWallet,
  getLastId,
  getRecentWallets,
  getWallets,
  openWallet,
  setLastId
} = require("./walletHelpers");

window._isElectron = true;

window._amoveoWallet = {
  addWallet,
  decryptWallet,
  getLastId,
  getRecentWallets,
  getWallets,
  setLastId,
  openWallet
};
