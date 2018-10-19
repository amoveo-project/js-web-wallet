import Keys from '../keys';

const defaults = {
  genKeyPairParams: {
    entropy: 'This is test entropy used to create test data',
  },
};

test('should set non-empty elliptic curve', () => {
  const keyPair = new Keys(defaults);

  expect(keyPair.ec).not.toBeNull();
});

test('should set key pair', () => {
  const keyPair = new Keys(defaults);

  expect(keyPair.keys).not.toBeNull();
});

test('should change key pair after setting new entropy', () => {
  const keyPair = new Keys(defaults);
  const oldKeys = keyPair.keys;

  const newEntropy = 'New entropy to test data regeneration';

  keyPair.setEntropy(newEntropy);

  const newKeys = keyPair.keys;

  expect(oldKeys).not.toEqual(newKeys);
});

test('should return keys on getKeys()', () => {
  const keyPair = new Keys(defaults);

  const keys = keyPair.getKeys();

  const expectedKeys = {
    private: '8e4efe70850df89230a965e687d11d413f8884e87c67fc7ff275e29c4d3f3f01',
    public:
      '04ef33a7578b2764ab9059ef3d6ab515e789252f7286918c2ae830dddc2ec514fb03ee0f775c992cc704b741ce31a860319fe6fa496c0e188537d9fc24555e7282',
  };

  expect(keys).toEqual(expectedKeys);
});

test('should load private key', () => {
  const keyPair = new Keys({
    genKeyPairParams: {
      entropy: 'Random entropy to generate random key pair',
    },
  });

  keyPair.setPrivateKey(
    '8e4efe70850df89230a965e687d11d413f8884e87c67fc7ff275e29c4d3f3f01',
  );

  const keys = keyPair.getKeys();

  const expectedKeys = {
    private: '8e4efe70850df89230a965e687d11d413f8884e87c67fc7ff275e29c4d3f3f01',
    public:
      '04ef33a7578b2764ab9059ef3d6ab515e789252f7286918c2ae830dddc2ec514fb03ee0f775c992cc704b741ce31a860319fe6fa496c0e188537d9fc24555e7282',
  };

  expect(keys).toEqual(expectedKeys);
});
