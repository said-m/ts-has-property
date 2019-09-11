import hasProperty from '../src';

const key = 'toString';

describe('Handles successfully', () => {
  test('`Object`', () => {
    const data: unknown = {
      [key]: undefined,
    };

    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });

  test('`Object.create(null)`', () => {
    // tslint:disable-next-line: no-any
    const data: any = Object.create(null);
    data[key] = key;

    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });
});

describe('Rejects data types', () => {
  test('`Null`', () => {
    const data: unknown = null;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`Array`', () => {
    const data: unknown = [];

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`String`', () => {
    const data: unknown = '';

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`Number`', () => {
    const data: unknown = 27;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });

  test('`undefined`', () => {
    const data: unknown = undefined;

    expect(
      hasProperty(data, key),
    ).toBeFalsy();
  });
});
