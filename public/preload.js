const {
  addWallet,
  getLastId,
  getWallets,
  openWallet,
  setLastId
} = require("./walletHelpers");

window._isElectron = true;

window._amoveoWallet = {
  addWallet,
  getLastId,
  getWallets,
  setLastId,
  openWallet
};
