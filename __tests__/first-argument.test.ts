import hasProperty from '../src';

const key = 'toString';

describe('Handles successfully', () => {
  test('`Object`', () => {
    const data: any = {
      [key]: undefined,
    };

    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });

  test('`Object.create(null)`', () => {
    const data: any = Object.create(null);
    data[key] = key;

    expect(
      hasProperty(data, key),
    ).toBeTruthy();
  });
});

describe('Rejects data types', () => {
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
