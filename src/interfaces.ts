
/**
 * Вытягивает оригинальный интерфейс из `Source`,
 * который соответствует `Type`.
 * Если в `Source` его нет, объекту присваивается `Type`.
 */
export type ExtractTypeOrSet<
  Source,
  Type
> = unknown extends Source
  ? Type
  : Extract<Source, Type>;

/**
 * Допустимые значения 3-го аргумента функции.
 */
export type HasPropertyExistInterface = true |
  'boolean' |
  'string' |
  'number' |
  'object' |
  'array';

/**
 * Проверяет `Value` на соответствие `Extend`,
 * если совпадают, то возвращается `Type`.
 */
export type HasPropertyExistTypeInterface<
  Value,
  Extend,
  Type
> = Extend extends Value
  ? Type
  : (
    Value extends Extend
      ? Type
      : never
  );

export type KeyValuesInterface<Value> = {
  [key in keyof Value]: Value[key];
};
