import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

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
  isExist: boolean,
): object is (
  {
    [key in keyof T]: T[key];
  } &
  {
    [key in K]: Exclude<T[key], undefined | null>;
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
  isRequired: boolean | void,
) {
  const properties = isArray(property)
    ? property
    : [property];

  return properties.every(
    thisProperty => {
      if (!isPlainObject(object)) {
        return false;
      }

      if (isRequired === true) {
        const value = object[thisProperty];

        return value !== undefined &&
        value !== null;
      }

      return Object.hasOwnProperty.call(object, thisProperty);
    },
  );
}
