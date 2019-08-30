import { isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';

/**
 * Indicating whether the object has the
 * specified property as its own property
 */
export default function hasProperty<
  T extends ObjectInterface,
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

  return object.hasOwnProperty(property);
}
