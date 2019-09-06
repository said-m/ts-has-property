import hasProperty from '../src';

const data: Record<
  'key' | 'null' | 'undefined',
  'string' | null | undefined
> = {
  key: 'string',
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
