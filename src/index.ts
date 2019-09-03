import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

/**
 * Indicating whether the object has the
 * specified property as its own property
 */
export default function hasProperty<
  // tslint:disable-next-line: no-any
  T extends ObjectInterface<any>,
  K extends keyof T
>(
  object: T,
  property: K | Array<K>,
): object is (
  {
    [key in keyof T]: T[key];
  } & {
    [key in K]: T[key];
  }
) {
  const properties = isArray(property)
    ? property
    : [property];

  return properties.every(
    thisProperty => isPlainObject(object) &&
      Object.hasOwnProperty.call(object, thisProperty),
  );
}
