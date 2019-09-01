import { isPlainObject } from '@said-m/common';
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
  property: K,
): object is (
  {
    [key in keyof T]: T[key];
  } &
  Record<K, T[K]>
) {
  if (!isPlainObject(object)) {
    return false;
  }

  return Object.hasOwnProperty.call(object, property);
}
