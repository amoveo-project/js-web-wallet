const Store = require("electron-store");
const store = new Store();

window._isElectron = true;

function getConfigPrivateKey() {
  const defaultPrivateKey = "";

  console.log("getConfigPrivateKey", store.get("privateKey"));

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
    console.log("setConfigPrivateKey", privateKey);
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
  getConfigPassphrase,
  getConfigPrivateKey,
  setConfigPassphrase,
  setConfigPrivateKey
};
