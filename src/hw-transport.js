export default (window._isElectron
  ? window._amoveoWallet.NodeTransport
  : require('@ledgerhq/hw-transport-u2f').default);
