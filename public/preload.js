const {
  addWallet,
  getLastId,
  getWallets,
  openWallet,
  setLastId
} = require("./walletHelpers");

const Store = require("electron-store");
const store = new Store({
  encryptionKey: "amoveo-temp-encryption-key"
});

window._isElectron = true;

function getConfigPrivateKey() {
  const defaultPrivateKey = "";

  try {
    return store.get("privateKey", defaultPrivateKey);
  } catch (e) {
    return defaultPrivateKey;
  }
}

function setConfigPrivateKey(privateKey) {
  if (!privateKey) {
    store.delete("privateKey");
  }

  try {
    store.set("privateKey", privateKey);
  } catch (e) {
    // no actions
  }
}

function getConfigPassphrase() {
  const defaultPassphrase = "";

  try {
    return store.get("passphrase", defaultPassphrase);
  } catch (e) {
    return defaultPassphrase;
  }
}

function setConfigPassphrase(passphrase) {
  if (!passphrase) {
    store.delete("passphrase");
  }

  try {
    store.set("passphrase", passphrase);
  } catch (e) {
    // no actions
  }
}

window._amoveoWallet = {
  addWallet,
  getConfigPassphrase,
  getConfigPrivateKey,
  getLastId,
  getWallets,
  setConfigPassphrase,
  setConfigPrivateKey,
  setLastId,
  openWallet
};
