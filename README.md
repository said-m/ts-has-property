# has-property

Better typed `hasOwnProperty` for better IntelliSense - code hinting. Indicating whether the object has the specified property as its own property.

**RU**: Более типизированный аналог `hasOwnProperty` для улучшения подсказок при работе в IDE-шках (редакторах кода).

## Usage / Использование

```ts
import hasProperty from 'has-property';

const data = anyThing(/* ... */);

if (hasProperty(data, 'someKey')) {
  data.someKey; // <- 100% exists
  // @see "Demo / Демонстрация" 👇
}
```

## Demo / Демонстрация

![После проверки стандартным `Object.hasOwnProperty`, VSCode не предлагает проверенного ключа, а после проверки при помощи `hasProperty` ключ в подсказках предлагается](assets/demo.gif)

> Не обязатель явной строкой указывать названия ключа, как это демонстрируется в gif-ке, ключ также может храниться в `const`-те или `enum`-е. Главное, чтобы IDE имела была точно уверенно в передаваемом.

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

## Note / Замечание

![Не объект первым аргументом - ts-ошибка](assets/demo-not-object.png)

**EN**: `hasProperty` checks is if 1st argument is a plain object.

**RU**: Данная функция также проверяет, является ли первый аргумент - обычным объектом.

## Author / Автор

Said Magomedov - [GitHub][github] // [NPM][npm] // [VK][vk]

## License / Лицензия

**EN**: This project is licensed under the [**MIT License**](LICENSE).

**RU**: Данный проект распространяется по [MIT License](LICENSE).


[github]: https://github.com/said-m
[npm]: https://www.npmjs.com/~said-m
[vk]: https://vk.com/id266788473
