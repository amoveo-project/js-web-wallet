import Keys from '../keys';

test('should set non-empty elliptic curve', () => {
  const keys = new Keys({
    genKeyPairParams: {
      entropy: 'This is test entropy used to create test data',
    },
  });

  expect(keys.ec).not.toBeNull();
});
