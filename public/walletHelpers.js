const electron = require("electron");
const crypto = require("crypto");
const { promisify } = require("util");
const { mkdir, readFile, stat, writeFile } = require("fs");
const { join } = require("path");

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const statAsync = promisify(stat);
const mkdirAsync = promisify(mkdir);

const ENCRYPTION_ALGORITHM = "aes-256-cbc";
const ENCRYPTION_DEFAULT_PASSWORD = "0000000000000000";
const ENCRYPTION_IV_LENGTH = 16;
const ENCRYPTION_KEY_LENGTH = 32;
const ENCRYPTION_SALT = "Amoveo Wallet";

const CURRENT_CONFIG_VERSION = 1;
const CURRENT_WALLET_VERSION = 1;

const defaultConfig = {
  lastId: "",
  version: CURRENT_CONFIG_VERSION,
  wallets: []
};

const defaultWallet = {
  hasPassword: false,
  ivHex: "",
  mnemonicEncrypted: "",
  privateKeyEncrypted: "",
  publicKey: "",
  version: CURRENT_WALLET_VERSION
};

const BASE_PATH = (electron.app || electron.remote.app).getPath("userData");

const CONFIG_FILE_NAME = "wallets.json";
const CONFIG_FILE = join(BASE_PATH, CONFIG_FILE_NAME);

function encryptText(text, password, ivHex) {
  const key = crypto.scryptSync(
    password,
    ENCRYPTION_SALT,
    ENCRYPTION_KEY_LENGTH
  );

  const iv = Buffer.from(ivHex, "hex");

  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted.toString("hex");
}

function decryptText(text, password, ivHex) {
  const key = crypto.scryptSync(
    password,
    ENCRYPTION_SALT,
    ENCRYPTION_KEY_LENGTH
  );

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let decrypted = decipher.update(text, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted.toString("hex");
}

function tryParseConfigJson(stringJson) {
  let object;
  try {
    object = JSON.parse(stringJson);
  } catch (e) {
    throw new Error(`The file in path ${CONFIG_FILE} is not a valid json file`);
  }
  return object;
}

function createConfigFile(configObj) {
  return createDirIfNotExist(BASE_PATH)
    .then(() => writeFileAsync(CONFIG_FILE, JSON.stringify(configObj, null, 2)))
    .then(() => configObj);
}

function createDirIfNotExist(dir) {
  return statAsync(dir).catch(() => mkdirAsync(dir));
}

function addWalletToConfig(wallet) {
  return openConfig().then(configObj => {
    const isAlreadyAdded = configObj.wallets.find(
      item => item.publicKey === wallet.publicKey
    );

    if (!isAlreadyAdded) {
      configObj.wallets.push(wallet);
      return createConfigFile(configObj);
    } else {
      throw new Error("Wallet already exists");
    }
  });
}

function openConfig() {
  return readFileAsync(CONFIG_FILE, { encoding: "utf-8" })
    .then(tryParseConfigJson)
    .catch(error => {
      if (error.code === "ENOENT") {
        return createConfigFile(defaultConfig);
      }
      throw error;
    });
}

function addWallet({ mnemonic, password, privateKey, publicKey }) {
  const hasPassword = Boolean(password);
  password = hasPassword ? password : ENCRYPTION_DEFAULT_PASSWORD;

  const iv = crypto.randomBytes(ENCRYPTION_IV_LENGTH);
  const ivHex = iv.toString("hex");

  const mnemonicEncrypted = encryptText(mnemonic, password, ivHex);
  const privateKeyEncrypted = encryptText(privateKey, password, ivHex);

  const wallet = {
    ...defaultWallet,
    hasPassword,
    ivHex,
    mnemonicEncrypted,
    privateKeyEncrypted,
    publicKey
  };

  return addWalletToConfig(wallet).then(() => wallet);
}

function getLastId() {
  return openConfig().then(configObj => {
    const isCorrectId = configObj.wallets.find(
      item => item.publicKey === configObj.lastId
    );

    return isCorrectId ? configObj.lastId : "";
  });
}

function setLastId(walletId) {
  return openConfig().then(configObj => {
    configObj.lastId = walletId;
    return createConfigFile(configObj);
  });
}

function openWallet(walletId, password) {
  return openConfig().then(configObj => {
    const wallet = configObj.wallets.find(item => item.publicKey === walletId);

    if (wallet) {
      const {
        ivHex,
        hasPassword,
        mnemonicEncrypted,
        privateKeyEncrypted
      } = wallet;

      password = hasPassword ? password : ENCRYPTION_DEFAULT_PASSWORD;

      return {
        ...wallet,
        mnemonic: decryptText(mnemonicEncrypted, password, ivHex),
        privateKey: decryptText(privateKeyEncrypted, password, ivHex)
      };
    } else {
      throw new Error("Wallet not found");
    }
  });
}

function getWallets() {
  return openConfig().then(configObj => {
    const wallets = configObj.wallets.map(wallet => ({
      hasPassword: wallet.hasPassword,
      publicKey: wallet.publicKey,
      version: wallet.version
    }));
    return wallets;
  });
}

module.exports = {
  addWallet,
  getLastId,
  getWallets,
  openConfig,
  openWallet,
  setLastId
};

/*

function recoveryWallet({ name, type = 0, color = 0, mnemonic }) {
  return createDirIfNotExist(WALLETS_PATH)
    .then(() => {
      return recoveryWalletFs({
        mnemonic,
        path: join(WALLETS_PATH, name),
        password: PASSWORD,
        daemonAddress: DAEMON_ADDRESS,
        restoreHeight: 1608000
      });
    })
    .then(wallet => {
      return addWalletToConfig({ name, type, color, uuid: name }).then(
        () => wallet
      );
    });
}

function openWallet({ uuid, password }) {
  return openWalletFs({
    password,
    path: join(WALLETS_PATH, uuid),
    daemonAddress: DAEMON_ADDRESS
  });
}

module.exports = {
  openWallet
};
*/
