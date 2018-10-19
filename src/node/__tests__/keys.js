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
