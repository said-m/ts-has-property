import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

// tslint:disable-next-line: no-any
type FirstArgumentInterface = unknown | ObjectInterface<any>;
type ExtractDefaultOrSet<T, U> = T extends U
  ? T
  // tslint:disable-next-line: no-any
  : T extends any
    ? U
    : T extends unknown
      ? U
      : never;

export type HasPropertyExistInterface = 'boolean' | 'string' | 'number' | 'object' | 'array';

/** Проверка наличия ключа */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
>(
  object: T,
  property: K | Array<K>,
  isExist: void,
): object is (
  {
    [key in keyof T]: T[key];
  } & {
    [key in K]:
      // @ts-ignore
      T[key];
  }
);

/** Проверка наличия ключа и его значения */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      undefined | null
    >;
  }>
);

/** Проверка наличия ключа с булевым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      boolean
    >;
  }>
);

/** Проверка наличия ключа со строковым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      string
    >;
  }>
);

/** Проверка наличия ключа с числовым значением */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      number
    >;
  }>
);

/** Проверка наличия ключа с объектом в значении */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      ObjectInterface
    >;
  }>
);

/** Проверка наличия ключа с массивом в значении */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
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
      // @ts-ignore
      T[key],
      Array<
        // @ts-ignore
        T[key][0]
      >
    >;
  }>
);

/**
 * Indicating whether the object has the
 * specified property as its own property
 */
function hasProperty<
  T extends FirstArgumentInterface,
  K extends keyof Exclude<T, unknown>
>(
  object: T,
  property: K | Array<K>,
  isRequired: boolean | HasPropertyExistInterface | void,
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
