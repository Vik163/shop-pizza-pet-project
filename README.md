# О проекте (не завершен)

свободный макет figma - интернет-магазин по продаже пиццы  
[https://pizzashop63.online](https://pizzashop63.online)

После курсов:

-  Тимур Ульби - "Продвинутый фронтенд",
-  Яндекс Практикум - "Веб-разработчик" и "React-разработчик"

делаю проект , чтобы закрепить полученные знания и добавить в копилку новые.  
Backend собрал свой на NestJS и MongoDB [ссылка на GitHub](https://github.com/Vik163/shop-pizza-pet-project_api)  
Деплой - виртуальный сервер spaceWeb на Ubuntu, база данных - MongoDB, Nginx, Pm2

## <a id="goBack">Что и как делал</a>

- [О проекте (не завершен)](#о-проекте-не-завершен)
  - [Что и как делал](#что-и-как-делал)
    - [Верстка](#верстка)
    - [Webpack](#webpack)
    - [Архитектура](#архитектура)
    - [TypeScript](#typescript)
    - [Eslint и Prettier](#eslint-и-prettier)
    - [Тестирование](#тестирование)
    - [Установленные пакеты](#установленные-пакеты)

---

### <a id="верстка">Верстка</a>

О верстке писать много не буду.  
Основное из макета и что-то добавил сам (для дополнительной функциональности).  
Стили SCSS c CSS Modules.  
Приложение выполнено в двух разрешениях: Desktop и Mobile.  
Применил SCSS и глобальные CSS переменные.  
Добавил функцию classNames для объединения имен классов `shared/lib/classNames`.  
В мобильной версии часть изображений сделал формата `.webp` для быстрой загрузки.  
Использовал для анимации две библиотеки `"react-spring/web"` и `use-gesture/react`

[_Вернуться к списку_](#goBack)

---

### <a id="webpack">Webpack</a>

Входной файл `webpack.config.ts` определяет основные переменные, необходимые для сборки.  
Остальные файлы лежат в папке `config/build/`:

-  `buildWebpackConfig.ts` - основная функция _buildWebpackConfig_ определяет точки входа, выхода и вызывает функции:
   -  `buildPlugins(options)` (_buildPlugin.ts_):
      -  `HtmlWebpackPlugin` - добавляет фавикон и два тега `script` для яндекс ID и яндекс карты,
      -  `ProgressPlugin` - отчетs о ходе выполнения во время компиляции,
      -  `DefinePlugin` - прокидывает глобальные переменные,
      -  `CircularDependencyPlugin` - кольцевые зависимости,
      -  `ForkTsCheckerWebpackPlugin` - проводит проверку типов TypeScript и проверку ESLint, перемещая их в отдельные процессы,
      -  `NonceInjector("_NONCE_")` - кастомная функция для внедрения в теги аттрибута `nonce` - Content Security Policy,
      -  `ReactRefreshWebpackPlugin`,
      -  `MiniCssExtractPlugin` - создаёт файл CSS с хешем для каждого JS-файла, содержащего CSS.
   -  `buildLoaders(options)` (_buildLoaders.ts_):
      -  `@svgr/webpack`,
      -  `file-loader`,
      -  `css-loader` - вынес в отдельный файл _buildCssLoader.ts_,
      -  `babel-loader` - находится в файле _buildBabelLoader.ts_, вызывается два раза с расширением `tsx` или `ts`.
   -  `buildResolvers(options)` (_buildResolvers.ts_) - добавляет alias `@`, заменяя путь до папки src,
   -  `isDev ? buildDevServer(options) : undefined` (_buildDevServer.ts_)
-  Development сборка по url _`https://pizzashop163.ru/api`_, production - _`https://pizzashop63.online/api`_

[_Вернуться к списку_](#goBack)

---

### <a id="архитектура">Архитектура</a>

Feature-Sliced Design (FSD)

[_Вернуться к списку_](#goBack)

---

### <a id="typescript">TypeScript</a>

Считаю TypeScript необходимым и без него уже не пишу.  
Проект старался по максимуму типизировать, `any` для меня, как красная тряпка для быка.  
Прописывал как глобальные типы, так и типы для всех компонентов.  
Со сложными типами тяжело, но я пытаюсь.

[_Вернуться к списку_](#goBack)

---

### <a id="eslint-и-prettier">Eslint и Prettier</a>

Eslint настроен не строго. Проект учебный.  
Использовал плагины Тимура Ульби, с его курса, для проверки путей импортов при использовании архитектуры FSD

[_Вернуться к списку_](#goBack)

---

### <a id="тестирование">Тестирование</a>

На курсах разбирали Jest, React Testing Library, Cypress.  
В планах 1 компонент поверхностно Jest и React Testing Library

[_Вернуться к списку_](#goBack)

---

### <a id="установленные-пакеты">Установленные пакеты</a>

```
    "devDependencies": {
      "@babel/core": "^7.26.0",
      "@babel/plugin-transform-runtime": "^7.22.10",
      "@babel/plugin-transform-typescript": "^7.22.11",
      "@babel/preset-env": "^7.26.0",
      "@babel/preset-react": "^7.22.5",
      "@babel/preset-typescript": "^7.26.0",
      "@pmmmwh/react-refresh-webpack-plugin": "^0.5.11",
      "@svgr/webpack": "^8.1.0",
      "@types/circular-dependency-plugin": "^5.0.5",
      "@types/grecaptcha": "^3.0.7",
      "@types/jest": "^29.5.14",
      "@types/jwt-decode": "^3.1.0",
      "@types/node": "^20.5.6",
      "@types/react": "^18.2.21",
      "@types/react-dom": "^18.2.7",
      "@types/react-router-dom": "^5.3.3",
      "@types/webpack": "^5.28.2",
      "@types/webpack-bundle-analyzer": "^4.6.0",
      "@types/webpack-dev-server": "^4.7.2",
      "@typescript-eslint/eslint-plugin": "^6.21.0",
      "@typescript-eslint/parser": "^6.21.0",
      "@vitejs/plugin-react": "^4.3.4",
      "@yandex/ymaps3-types": "^0.0.22",
      "babel-jest": "^29.7.0",
      "babel-loader": "^9.1.3",
      "circular-dependency-plugin": "^5.2.2",
      "concurrently": "^8.2.1",
      "css-loader": "^6.8.1",
      "eslint": "^8.56.0",
      "eslint-config-airbnb": "^19.0.4",
      "eslint-config-prettier": "^9.1.0",
      "eslint-config-standard-with-typescript": "^43.0.1",
      "eslint-plugin-import": "^2.29.1",
      "eslint-plugin-n": "^16.6.2",
      "eslint-plugin-prettier": "^5.1.3",
      "eslint-plugin-promise": "^6.1.1",
      "eslint-plugin-react": "^7.33.2",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-ulbi-eslint-plugin": "^0.0.17",
      "eslint-plugin-ulbi-tv-plugin": "^0.0.10",
      "eslint-plugin-unused-imports": "^3.0.0",
      "file-loader": "^6.2.0",
      "fork-ts-checker-webpack-plugin": "^8.0.0",
      "html-webpack-plugin": "^5.5.3",
      "jest": "^29.7.0",
      "jest-environment-jsdom": "^29.7.0",
      "latest": "^0.2.0",
      "mini-css-extract-plugin": "^2.7.6",
      "msw": "^2.7.0",
      "prettier": "3.2.5",
      "react-refresh": "^0.14.0",
      "sass": "^1.66.1",
      "sass-loader": "^13.3.2",
      "style-loader": "^3.3.3",
      "ts-loader": "^9.4.4",
      "ts-morph": "^19.0.0",
      "ts-node": "^10.9.1",
      "tsconfig-paths-webpack-plugin": "^4.1.0",
      "typescript": "^5.3.3",
      "webpack": "^5.88.2",
      "webpack-bundle-analyzer": "^4.9.1",
      "webpack-cli": "^5.1.4",
      "webpack-dev-server": "^4.15.1"
   },
   "dependencies": {
      "@pbe/react-yandex-maps": "^1.2.5",
      "@react-spring/web": "^9.7.3",
      "@reduxjs/toolkit": "^1.9.7",
      "@use-gesture/react": "^10.2.27",
      "axios": "^1.7.9",
      "dayjs": "^1.11.10",
      "dotenv": "^16.3.1",
      "firebase": "^10.6.0",
      "jwt-decode": "^4.0.0",
      "react": "^18.3.1",
      "react-dadata": "^2.23.1",
      "react-dom": "^18.2.0",
      "react-redux": "^8.1.3",
      "react-router-dom": "^6.15.0",
      "react-visibility-sensor": "^5.1.1",
      "uid": "^2.0.2"
   }
```

[_Вернуться к списку_](#goBack)
