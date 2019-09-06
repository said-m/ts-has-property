# ts-has-property

Better typed `hasOwnProperty` for better IntelliSense - code hinting. Supports checking multiple keys at a time and optionally checks if the value(s) belongs to the specified type (interface).

[![npm version](https://badge.fury.io/js/ts-has-property.svg)](https://badge.fury.io/js/ts-has-property)
[![Build Status](https://travis-ci.com/said-m/ts-has-property.svg?branch=master)](https://travis-ci.com/said-m/ts-has-property)
[![Coverage Status](https://coveralls.io/repos/github/said-m/ts-has-property/badge.svg?branch=master)](https://coveralls.io/github/said-m/ts-has-property?branch=master)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

**RU**: Более типизированный аналог `hasOwnProperty` для **улучшения подсказок** при работе в IDE-шках (редакторах кода). Также, метод позволяет перечислить сразу **несколько ключей** для проверки и корректно проверяет коллекции, созданные через `Object.create(null)`.

> * Do not use `any` type, please.
> * Use `unknown` if you thought about `any`.
> * If you working with third party module and have to suffer from `any`, so `ts-has-property` may be very useful, may-be...

## Navigation / Навигация

> [Read on repo-page](./README.md)

* [Installing / Установка](#Installing--Установка)
* Usage / Использование
  * [The basics / Основы](#Usage--Использование)
  * [`Required<>` values / Обязательность значений](#Required-values--Обязательность-значений)
  * [Value type check / Принадлежность значения типу](#Value-type-check--Принадлежность-значения-типу)
* [Demo / Демонстрация](#Demo--Демонстрация)
  * [`Enum` member values / Пример с `Enum`-ом](#Enum-member-values--Пример-с-Enum-ом)
  * [Multiple keys / Несколько ключей](#Multiple-keys--Несколько-ключей)
* [Note / Замечание](#Note--Замечание)
* [Author / Автор](#Author--Автор)
* [License / Лицензия](#License--Лицензия)

## Installing / Установка

```bash
yarn add ts-has-property -T
```
or, if you prefer `npm`:
```bash
npm i ts-has-property -E
```

> **EN**: `SemVer` is not guaranteed; \
> **RU**: Соблюдение `SemVer` не гарантируется.

## Usage / Использование

Function arguments / Аргументы функции:
1. the value to inspect / проверяемый объект
2. the key to check / искомый ключ

```ts
import hasProperty from 'ts-has-property';

const data = anyThing(/* ... */);

if (hasProperty(data, 'someKey')) {
  data.someKey; // <- 100% exists
  // @see "Demo / Демонстрация" 👇
}
```

> **EN**: If 1st argument is not an object => `false`; tsc will inform you about typing errors if possible. @see [Note](#note--замечание). \
> **RU**: Если первым аргументом передан не объект, то функция вернёт `false`; tsc сообщит об ошибке, если сможет проверить тип передаваемого значения до рантайма. Подробнее: см. [Замечание](#note--замечание).

### `Required<>` values / Обязательность значений

> **[ℹ️]**: `any` === 👎 && `unknown` === 👍

**EN**: If you only need non-`null`/`undefined` property, there is shortcut for you, see listing below; \
**RU**: В обычном режиме проверяется только наличие ключа, однако, если его значение может быть `undefined` или `null`, то в большинстве условиях потребуется дополнительная проверка для осуществления дальнейшего чейнинга значения. Поэтому, в функции предусмотрен шорткат, позволяющий проверить свойство на нененулевое значение:
```ts
const data: {
  title: string;
  description?: string; // string | undefined
  // ...
} = getData(/* ... */);

data.description = undefined; // - `data` has property `description`

if (
  hasProperty(data, 'description', true) // 👈 `true`
) {
  // ...
  console.log(data.description.toString());
} else {
  console.log(`Data's own property 'description' has no value`);
}
```

### Value type check / Принадлежность значения типу

> **[ℹ️]**: `any` === 👎 && `unknown` === 👍

**EN**: If we have a value that has a [`union type`](union-types), but only a certain one is required, there is a shortcut - 3rd argument, see listing below; \
**RU**: Если значение свойства может принадлежать одному из нескольких типов, а требуется только определённый, то и на этот случай имеется шорткат:
```ts
const data: Record<       // - object
  string,                 // - type of key
  number | Array<number>  // - type of value
> = getData(/* ... */);

const sum = hasProperty(data, 'key', 'array')   // 👈 `'array'`
  ? data.key.reduce((prev, cur) => prev + cur)  // `data.key: Array<number>`
  : data.key                                    // `data.key: number`
```

Possible argument values / Возможные значения:
* `'string'`
* `'number'`
* `'object'`
* `'array'`

> see [gif demo](#Type-check--Проверка-типа)

## Demo / Демонстрация

![После проверки стандартным `Object.hasOwnProperty`, VSCode не предлагает проверенного ключа, а после проверки при помощи `hasProperty` ключ в подсказках предлагается](assets/demo.gif)

> Не обязательно явной строкой указывать название ключа, как это демонстрируется в gif-ке, ключ также может храниться в `const`-те или `enum`-е. Главное, чтобы IDE была точно уверенна в содержимом передаваемого параметра.

### `Enum` member values / Пример с `Enum`-ом

```ts
const obj: {
  [key: string]: Array<string>,
} = {};

enum Keys {
  sth = 'something',
}

if (hasProperty(obj, Keys.sth)) {
  obj./* IDE: something */; // см. изображение ниже
}
```

![Названия ключа из `enum`-а](assets/demo-enum.png)

### Multiple keys / Несколько ключей

```ts
// ...

if (hasProperty(obj, ['someKey', 'yetAnotherKey'])) {
  obj./* IDE:               */;
      /*     someKey        */
      /*     yetAnotherKey  */
}
```

### Type check / Проверка типа

![При проверке на базовые типы, функция возвращает `true` только значения, которое соответствует ему. При этом сохраняются пользовательские интерфейсы.](assets/demo-type-check.gif)

## Note / Замечание

![Не объект первым аргументом - ts-ошибка](assets/demo-not-object.png)

**EN**: `hasProperty` checks if 1st argument is a 'plain' object. \
**RU**: Данная функция также проверяет, является ли первый аргумент - обычным объектом.

## Author / Автор

Said Magomedov - [GitHub][github] // [NPM][npm] // [VK][vk]

## License / Лицензия

**EN**: This project is licensed under the [**MIT License**](LICENSE). \
**RU**: Данный проект распространяется по [MIT License](LICENSE).


[github]: https://github.com/said-m
[npm]: https://www.npmjs.com/~said-m
[vk]: https://vk.com/id266788473

[union-types]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types
