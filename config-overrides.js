module.exports = function override(config, env) {
  //do stuff with the webpack config...
  return {
    ...config,
    externals: {
      ...config.externals,
      'node-hid': 'commonjs node-hid',
      'usb': 'commonjs usb',
    },
  };
  // return config;
};
