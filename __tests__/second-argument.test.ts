import hasProperty from '../src';

test('Only own properties', () => {
  const obj = {};

  // Object.prototype.valueOf
  expect(
    obj.valueOf,
  ).toBeDefined();

  // no own `valueOf`
  expect(
    hasProperty(
      obj as {
        valueOf: unknown,
      },
      'valueOf',
    ),
  ).toBeFalsy();

  // own `valueOf`
  expect(
    hasProperty(
      {
        valueOf: undefined,
      },
      'valueOf',
    ),
  ).toBeTruthy();
});

test('`Symbol`', () => {
  const symbolKey: any = Symbol();
  const store: any = {
    [symbolKey]: undefined,
  };

  expect(
    hasProperty(store, symbolKey),
  ).toBeTruthy();
});

test('`Array` of keys', () => {
  const keys = [
    'key1',
    'key2',
  ];
  const store: any = {
    [keys[0]]: undefined,
    [keys[1]]: undefined,
  };

  expect(
    hasProperty(store, keys),
  ).toBeTruthy();

  expect(
    hasProperty(
      store,
      [
        ...keys,
        'notDefined',
      ],
    ),
  ).toBeFalsy();
});
