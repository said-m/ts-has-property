import hasProperty from '../src';

const data: Record<
  'key' | 'number' | 'null' | 'object' | 'undefined',
  any
> = {
  key: 'sample text',
  number: NaN,
  object: {
    number: 27,
  },
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

test('`Object`', () => {
  expect(
    hasProperty(
      data,
      'object',
      'object',
    ),
  ).toBeTruthy();

  // typeof null === 'object',
  // but We talking about true Objects
  expect(
    hasProperty(
      data,
      'null',
      'object',
    ),
  ).toBeFalsy();
});
