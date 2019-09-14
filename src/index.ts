import { isArray, isPlainObject } from '@said-m/common';
import { ObjectInterface } from '@said-m/common/dist/interfaces';
import { ExtractTypeOrSet, HasPropertyExistInterface, HasPropertyExistTypeInterface, KeyValuesInterface } from './interfaces';

/**
 * Интерфейс первого аргумента функции
 */
// tslint:disable-next-line: no-any
type CheckedInterface = any;

/**
 * Indicating whether the value has the
 * specified property as its own property.
 *
 * Проверка наличия **ключа**
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: void,
): object is (
  KeyValuesInterface<Value> &
  {
    [key in Key]: Value[key];
  }
);

/**
 * Indicating whether the value has the
 * specified property of non-`Null`/`Undefined`.
 *
 * Проверка наличия **ключа** и его **значения**
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: true,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: Exclude<
      Value[key],
      undefined | null | void
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property of type `Boolean`.
 *
 * Проверка наличия ключа с **булевым** значением
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: HasPropertyExistTypeInterface<
    Value[Key],
    boolean,
    'boolean'
  >,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: ExtractTypeOrSet<
      Value[key],
      boolean
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property of type `String`.
 *
 * Проверка наличия ключа со **строковым** значением
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: HasPropertyExistTypeInterface<
    Value[Key],
    string,
    'string'
  >,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: ExtractTypeOrSet<
      Value[key],
      string
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property of type `Number`.
 *
 * Проверка наличия ключа с **числовым** значением
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: HasPropertyExistTypeInterface<
    Value[Key],
    number,
    'number'
  >,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: ExtractTypeOrSet<
      Value[key],
      number
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property of type `Object`.
 *
 * Проверка наличия ключа с **объектом** в значении
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: HasPropertyExistTypeInterface<
    Value[Key],
    ObjectInterface<unknown>,
    'object'
  >,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: ExtractTypeOrSet<
      Value[key],
      ObjectInterface<unknown>
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property of type `Array`.
 *
 * Проверка наличия ключа с **массивом** в значении
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isExist: HasPropertyExistTypeInterface<
    Value[Key],
    Array<unknown>,
    'array'
  >,
): object is (
  KeyValuesInterface<Value> &
  Required<{
    [key in Key]: ExtractTypeOrSet<
      Value[key],
      Array<Value[key][0]>
    >;
  }>
);

/**
 * Indicating whether the value has the
 * specified property as its own property.
 */
function hasProperty<
  Value extends CheckedInterface,
  Key extends keyof Extract<Value, ObjectInterface>
>(
  object: Value,
  property: Key | Array<Key>,
  isRequired: HasPropertyExistInterface | void,
) {
  const properties = isArray(property)
    ? property
    : [property];

  return properties.every(
    thisProperty => {
      try {
        const hasStatus = Object.hasOwnProperty.call(
          object,
          thisProperty,
        );

        if (isRequired && hasStatus) {
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
      } catch {
        return false;
      }
    },
  );
}

export default hasProperty;
