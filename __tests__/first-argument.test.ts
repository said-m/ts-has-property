import { ObjectInterface } from '@said-m/common/dist/interfaces';
import hasProperty from '../src';

const key = 'toString';

test('`Object`', () => {
  expect(
    hasProperty(
      {
        [key]: undefined,
      },
      key,
    ),
  ).toBeTruthy();

  const collection: ObjectInterface = Object.create(null);
  collection[key] = key;

  expect(
    hasProperty(collection, key),
  ).toBeTruthy();
});

test('`Array`', () => {
  const data: Array<unknown> = [undefined];

  console.log(data);
  expect(
    hasProperty(data, 0),
  ).toBeTruthy();

  expect(
    hasProperty(data, data.length),
  ).toBeFalsy();
});

test('`String`', () => {
  expect(
    hasProperty(key, 0),
  ).toBeTruthy();

  expect(
    hasProperty(key, key.length),
  ).toBeFalsy();
});

test.only('Values without properties', () => {
  expect(
    hasProperty(null, key),
  ).toBeFalsy();

  expect(
    hasProperty(undefined, key),
  ).toBeFalsy();
});
