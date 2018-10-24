import Keys from '../keys';

const defaults = {
  entropy: 'This is test entropy used to create test data',
};

test('should set non-empty elliptic curve', () => {
  const keys = new Keys(defaults.entropy);

  expect(keys._ec).not.toBeNull();
});

test('should set key pair', () => {
  const keys = new Keys(defaults.entropy);

  expect(keys._keyPair).not.toBeNull();
});

test('should change key pair after setting new entropy', () => {
  const keys = new Keys(defaults.entropy);
  const oldKeyPair = keys.getKeyPair();

  const newEntropy = 'New entropy to test data regeneration';

  keys.generateKeyPair(newEntropy);

  const newKeyPair = keys.getKeyPair();

  expect(oldKeyPair).not.toEqual(newKeyPair);
});

test('should return keyPair on getKeyPair()', () => {
  const keys = new Keys(defaults.entropy);

  const keyPair = keys.getKeyPair();

  const expectedKeyPair = {
    private: 'c29ec7d3a8d514c88128e48a59c15f13841058056850109c2ea49b1b3af1bca8',
    public:
      '0456964975f83d52661b85998b4b971f5b5dc6f73cf8a45da09b3504543a189caeaceb135d3c0b0f098327eb4735030c93a92427c09d56ca5e13d6dec4ce740a33',
  };

  expect(keyPair).toEqual(expectedKeyPair);
});

test('should load private key', () => {
  const params = {
    ...defaults,
    entropy: 'Random entropy to generate random key pair',
  };

  const keys = new Keys(params);

  keys.setPrivateKey(
    'c29ec7d3a8d514c88128e48a59c15f13841058056850109c2ea49b1b3af1bca8',
  );

  const keyPair = keys.getKeyPair();

  const expectedKeyPair = {
    private: 'c29ec7d3a8d514c88128e48a59c15f13841058056850109c2ea49b1b3af1bca8',
    public:
      '0456964975f83d52661b85998b4b971f5b5dc6f73cf8a45da09b3504543a189caeaceb135d3c0b0f098327eb4735030c93a92427c09d56ca5e13d6dec4ce740a33',
  };

  expect(keyPair).toEqual(expectedKeyPair);
});
