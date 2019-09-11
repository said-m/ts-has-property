import hasProperty from '../src';

/**
 * Откройте в IDE и проверьте типы констант `value`
 */

const key = 'someKey';
const data: Record<
  string,
  string |
  number |
  boolean |
  Array<string | number> |
  {
    value: string;
    count?: number;
  } |
  undefined |
  null
> = {};

if (hasProperty(data, key, 'object')) {
  const value = data.someKey;
  const orValue = data[key];
}

if (hasProperty(data, key, 'array')) {
  const value = data.someKey;
}

if (hasProperty(data, key, 'string')) {
  const value = data.someKey;
}

if (hasProperty(data, key, 'boolean')) {
  const value = data.someKey;
}

if (hasProperty(data, key, 'number')) {
  const value = data.someKey;
}

if (hasProperty(data, key, true)) {
  const value = data.someKey;
}

if (hasProperty(data, key)) {
  const value = data.someKey;
}
