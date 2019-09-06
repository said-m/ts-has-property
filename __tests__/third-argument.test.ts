import hasProperty from '../src';

const data: Record<
  'key' | 'number' | 'null' | 'undefined',
  string | number | null | undefined
> = {
  key: 'sample text',
  number: NaN,
  null: null,
  undefined,
};

test('Required value(-s) (not `null` or `undefined`)', () => {
  expect(
    hasProperty(
      data,
      ['key', 'null', 'undefined'],
    ),
  ).toBeTruthy();

  expect(
    hasProperty(
      data,
      ['key', 'null'],
      true,
    ),
  ).toBeFalsy();

  expect(
    hasProperty(
      data,
      ['key', 'undefined'],
      true,
    ),
  ).toBeFalsy();
});

test('`String`', () => {
  expect(
    hasProperty(
      data,
      'key',
      'string',
    ),
  ).toBeTruthy();

  expect(
    hasProperty(
      data,
      'null',
      'string',
    ),
  ).toBeFalsy();
});

test('`Number`', () => {
  expect(
    hasProperty(
      data,
      'number',
      'number',
    ),
  ).toBeTruthy();

  expect(
    hasProperty(
      data,
      'null',
      'number',
    ),
  ).toBeFalsy();
});
