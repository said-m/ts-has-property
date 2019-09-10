import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

// tslint:disable-next-line: no-any
type FirstArgumentInterface = ObjectInterface<any>;
type UnknownKeysInterface = keyof ObjectInterface<unknown>;
type ExtractDefaultOrSet<T, U> = T extends U
  ? T
  // tslint:disable-next-line: no-any
  : T extends any
    ? U
    : T extends unknown
      ? U
      : never;

export type HasPropertyExistInterface = true |
  'boolean' |
  'string' |
  'number' |
  'object' |
  'array';

/** Проверка наличия ключа */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: void,
): object is {
  [key in K]: unknown;
};
/** Проверка наличия ключа */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: void,
): object is (
  {
    [key in keyof T]: T[key];
  } & {
    [key in K]: T[key];
  }
);

/** Проверка наличия ключа и его значения */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: true,
): object is {
  [key in K]: unknown;
};
/** Проверка наличия ключа и его значения */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: true,
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: Exclude<
      T[key],
      undefined | null
    >;
  }>
);

/** Проверка наличия ключа с булевым значением */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: 'boolean',
): object is {
  [key in K]: boolean;
};
/** Проверка наличия ключа с булевым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: 'boolean',
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: ExtractDefaultOrSet<
      T[key],
      boolean
    >;
  }>
);

/** Проверка наличия ключа со строковым значением */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: 'string',
): object is {
  [key in K]: string;
};
/** Проверка наличия ключа со строковым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: 'string',
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: ExtractDefaultOrSet<
      T[key],
      string
    >;
  }>
);

/** Проверка наличия ключа с числовым значением */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: 'number',
): object is {
  [key in K]: number;
};
/** Проверка наличия ключа с числовым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: 'number',
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: ExtractDefaultOrSet<
      T[key],
      number
    >;
  }>
);

/** Проверка наличия ключа с объектом в значении */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: 'object',
): object is {
  [key in K]: ObjectInterface<unknown>;
};
/** Проверка наличия ключа с объектом в значении */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: 'object',
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: ExtractDefaultOrSet<
      T[key],
      ObjectInterface
    >;
  }>
);

/** Проверка наличия ключа с массивом в значении */
function hasProperty<
  K extends UnknownKeysInterface
>(
  object: unknown,
  property: K | Array<K>,
  isExist: 'array',
): object is {
  [key in K]: Array<unknown>;
};
/** Проверка наличия ключа с массивом в значении */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isExist: 'array',
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Required<{
    [key in K]: ExtractDefaultOrSet<
      T[key],
      Array<T[key][0]>
    >;
  }>
);

/**
 * Indicating whether the object has the
 * specified property as its own property
 */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
  isRequired: HasPropertyExistInterface | void,
) {
  const properties = isArray(property)
    ? property
    : [property];

  return properties.every(
    thisProperty => {
      if (!isPlainObject(object)) {
        return false;
      }

      const hasStatus = Object.hasOwnProperty.call(object, thisProperty);

      if (isRequired && hasStatus) {
        // @ts-ignore
        const value = object[thisProperty];

        switch (isRequired) {
          case true:
            return value !== undefined &&
            value !== null;
          case 'boolean':
            return typeof value === 'boolean';
          case 'string':
            return typeof value === 'string';
          case 'number':
            return typeof value === 'number';
          case 'object':
            return isPlainObject(value);
          case 'array':
            return isArray(value);
        }
      }

      return hasStatus;
    },
  );
}

export default hasProperty;
