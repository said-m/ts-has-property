import hasProperty from '../src';

const data: Record<
  'key' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'undefined',
  unknown
> = {
  key: 'sample text',
  number: NaN,
  boolean: false,
  object: {},
  array: [],
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

test('`Array`', () => {
  expect(
    hasProperty(
      data,
      'array',
      'array',
    ),
  ).toBeTruthy();

  // убеждаемся, что `false` случается
  expect(
    hasProperty(
      data,
      'null',
      'array',
    ),
  ).toBeFalsy();
});

test('`Boolean`', () => {
  expect(
    hasProperty(
      data,
      'boolean',
      'boolean',
    ),
  ).toBeTruthy();

  // убеждаемся, что `false` случается
  expect(
    hasProperty(
      data,
      'key',
      'boolean',
    ),
  ).toBeFalsy();
});
