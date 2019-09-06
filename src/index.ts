import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

export type HasPropertyExistInterface = 'string';

export default hasProperty;
// tslint:disable-next-line: no-any
type FirstArgumentInterface = ObjectInterface<any>;

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
  {
    [key in K]: Exclude<T[key], undefined | null>;
  }
);

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
  {
    [key in K]: Extract<T[key], string>;
  }
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
  isRequired: boolean | string | void,
) {
  const properties = isArray(property)
    ? property
    : [property];

  return properties.every(
    thisProperty => {
      if (!isPlainObject(object)) {
        return false;
      }

      if (isRequired) {
        const value = object[thisProperty];

        switch (isRequired) {
          case true:
            return value !== undefined &&
            value !== null;
          case 'string':
            return typeof value === 'string';
        }
      }

      return Object.hasOwnProperty.call(object, thisProperty);
    },
  );
}
