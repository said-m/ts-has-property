import hasProperty from '../src';

// tslint:disable: no-any

const key = 'toString';
const data: any = {
  [key]: undefined,
};

describe('1st argument type tests', () => {
  test('`Object`', () => {
    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });

  test('`Object.create(null)`', () => {
    const data: any = Object.create(null);

    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });

  test('`Null`', () => {
    const data: any = null;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`Array`', () => {
    const data: any = [];

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`String`', () => {
    const data: any = '';

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`Number`', () => {
    const data: any = 27;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`undefined`', () => {
    const data: any = undefined;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });
});

describe('2nd argument tests', () => {
  test('Only own properties', () => {
    const obj = {};

    expect(
      obj.valueOf,
    ).toBeDefined();

    expect(
      hasProperty(
        obj as {
          valueOf: unknown,
        },
        'valueOf',
      ),
    ).toBeFalsy();

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
    const symbolKey: any = Symbol(key);
    const store: any = {
      [symbolKey]: undefined,
    };

    expect(
      hasProperty(store, key),
    ).toBeFalsy();

    expect(
      hasProperty(store, symbolKey),
    ).toBeTruthy();
  });
});
