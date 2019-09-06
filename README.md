# ts-has-property

Better typed `hasOwnProperty` for better IntelliSense - code hinting. Supports checking multiple keys at a time and optionally checks if the value(s) belongs to the specified type (interface).

[![npm version](https://badge.fury.io/js/ts-has-property.svg)](https://badge.fury.io/js/ts-has-property)
[![Build Status](https://travis-ci.com/said-m/ts-has-property.svg?branch=master)](https://travis-ci.com/said-m/ts-has-property)
[![Coverage Status](https://coveralls.io/repos/github/said-m/ts-has-property/badge.svg?branch=master)](https://coveralls.io/github/said-m/ts-has-property?branch=master)
[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

**RU**: Более типизированный аналог `hasOwnProperty` для **улучшения подсказок** при работе в IDE-шках (редакторах кода). Также, метод позволяет перечислить сразу **несколько ключей** для проверки и корректно проверяет коллекции, созданные через `Object.create(null)`.

## Navigation / Навигация

> [Read on repo-page](./README.md)

* [Installing / Установка](#Installing--Установка)
* [Usage / Использование](#Usage--Использование)
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
