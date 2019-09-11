
export type ExtractTypeOrSet<
  Source,
  Type
> = Source extends Type
  ? Source
  : Extract<Type, Source>;

export type HasPropertyExistInterface = true |
  'boolean' |
  'string' |
  'number' |
  'object' |
  'array';

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
