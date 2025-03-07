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
    - [Логика:](#логика)
      - [Авторизация](#авторизация)
      - [Состояние приложения](#состояние-приложения)
      - [Запросы](#запросы)
      - [Обмен данными с сервером](#обмен-данными-с-сервером)
      - [Роутинг](#роутинг)
      - [Ленивая загрузка](#ленивая-загрузка)
      - [Анимация](#анимация)
      - [Скролл](#скролл)
      - [Яндекс карта](#яндекс-карта)
    - [Безопасность приложения](#безопасность-приложения)
    - [Eslint и Prettier](#eslint-и-prettier)
    - [Тестирование](#тестирование)
    - [Установленные пакеты](#установленные-пакеты)

---

### <a id="верстка">Верстка</a>

О верстке писать много не буду.  
Основное из макета и что-то добавил сам (для дополнительной функциональности).

-  стили SCSS c CSS Modules.
-  приложение выполнено в двух разрешениях: Desktop и Mobile.
-  применил SCSS и глобальные CSS переменные.
-  добавил функцию classNames для объединения имен классов `shared/lib/classNames`.
-  в мобильной версии часть изображений сделал формата `.webp` для быстрой загрузки.
-  использовал для анимации две библиотеки `"react-spring/web"` и `use-gesture/react`

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
Проект старался по максимуму типизировать. Прописывал как глобальные типы, так и типы всех компонентов.  
Со сложными типами не легко, но я пытаюсь.

[_Вернуться к списку_](#goBack)

---

### <a id="логика">Логика:</a>

#### <a id="авторизация">Авторизация</a>

Используемые сервисы:

-  Firebase (по телефону):
   Когда начинал проект, авторизация по телефону от firebase была в бесплатном пакете с ограничениями. На сегодняшний она отключена, за исключением номера для тестов. Менять не стал, а добавил авторизацию через Яндекс ID. Ничего интересного о ней не расскажу. При создании запросов использовал документацию. Файл находится `src/entities/User/api/firebaseApi.ts`

-  Яндекс ID:  
    Использую способ с кодом подтверждения [из документации](https://yandex.ru/dev/id/doc/ru/codes/code-and-token) (основная логика выполняется на бекенде).
   -  на клиенте создается ссылка `<a href="https://oauth.yandex.ru/authorize?...">` c query параметрами в которые вложена личный _id_, _state_ (сгенерированный токен, который яндекс возвращает без изменения), _Redirect URI_ для веб-сервисов `'https://pizzashop63.online/api/yandex'` (настраивается при регистрации проекта)
   -  по клику происходят: запрос на сервер по адресу `'https://pizzashop63.online/api/yandex'`, с отправкой дополнительной защиты _state_, вложенной в _headers_, и переход по созданной ссылке на сервис яндекса (`src/features/AuthByPhone/ui/PhoneFormComponent`).
   -  после верификации на сервисе происходит переадресация на бекенд `'https://pizzashop63.online/api/yandex'`, куда в _query_ приходят _state_ и код подтверждения.
   -  после логики на бэкенде происходит переадресация на клиент с отправкой данных пользователя в _query_ параметрах.

Логика авторизации основана да двух токенах (access и refresh, получаемых с бэкенда), которые храняться в куках.  
На защищенных маршрутах происходит проверка аccess на стороне клиента (два пакета _'jwt-decode'_ и _'dayjs'_) и по результатам обновление refresh токена (`src/shared/api/rtkApi`)

[_Вернуться к списку_](#goBack)

---

#### <a id="состояние-приложения">Состояние приложения</a>

-  **Props**
-  **Context** - использовал в двух случаях:

   -  изменение темы
   -  изменение размера экрана (адаптивная верстка)

   Файлы: `shared/lib/context/` и `app/providers/`.  
    В _ThemeProvider_ добавил компонент _withTheme_, чтобы не передавать напрямую данные из redux в provider

-  **Redux** - основная часть состояния приложения. Использовал библиотеку _Redux Toolkit_  
    Конфигурация redux:

   -  `app/providers/StoreProvider/config/` - _store_, _StateSchema_ - типы и _reducerManager_ для удаления и добавления ассинхронных редьюсеров
   -  `app/providers/StoreProvider/ui/`

   Применение:

   -  стандартный набор: selector, slice (reducers, extraReducers), asyncThunk (для запросов axios)
   -  reselect - меняет массив названий добавок и их общую стоимость (добавляет, удаляет) `entities/Additives/model/selectors`
   -  createEntityAdapter - использовал _нормализацию_ для карточек товара (ради ознакомления)

   -  <a id="rtk-query">rtk query</a> - для части запросов, в качестве ознакомления, применил rtk
      -  экземпляр `shared/api/rtkApi.ts`, в котором:
         -  создана функция _baseQuery_ (fetchBaseQuery) и в ней, через параметр _prepareHeaders_, добавляются в заголовки токены
         -  добавлена функция _baseQueryWithError_ (BaseQueryFn), в которой происходит проверка access токена и последующие запросы по результатам, с помощью _baseQuery_, возвращающая или ответ или ошибку.
         -  объявлен экземпляр _rtkApiTokens_ с `baseQuery: baseQueryWithError`
      -  добавил эндпоинты для запросов `entities/User/api/userApi`
      -  использовал их где нужно, при необходимости данные добавлял в стейт

[_Вернуться к списку_](#goBack)

---

#### <a id="запросы">Запросы</a>

-  axios - хорошая библиотека, часто пользуюсь, здесь применил для asyncThunk
-  [rtk query](#rtk-query)

[_Вернуться к списку_](#goBack)

---

#### <a id="обмен-данными-с-сервером">Обмен данными с сервером</a>

-  данные пользователей.
   Данные пользователей добавляются в БД при регистрации:
   -  firebase - после ввода данных происходит верификация по коду доступа и далее вызывается asyncThunk `entities/User/model/services/fetchSignupUser.ts`, в которой происходят два запроса:
      -  запрос на получение токена CSRF (подделка межсайтовых запросов)
      -  после получения CSRF он добавляется в заголовки к POST-запросу на сервер (данные регистрации)
   -  яндекс ID - происходит GET-запрос, в котором отправляется сгенерированный токен безопасности на сервер и сразу переход по ссылке на сервис яндекса, в который также отправляется этот токен (яндекс возвращает его без изменений). После верификации данных на сервисе яндекса и бэкенде данные пользователя возвращаются на клиент в query параметрах.
   -  первоначальный запрос на пользователя происходит если в localStorage хранится его ID, который при выходе из аккаунта удаляется
   -  обновление данных на странице `pages/ProfilePage/ui/PersonalData/ui/PersonalData/` через rtk query, в которых добавляется запрос CSRF и проверка access токена (по результатам запрос refresh)
-  данные карточек товара

   -  для добавления карточек использовал пагинацию (запрос добавляет по 8 карт)
   -  данные запроса отправляются на сервер в query-параметрах

      ```javascript
      const params = {
         _expand: userId || 'user',
         view, // вид продукта
         _limit: paginateElements, // количество карточек
         _page: page, // номер запрашиваемой страницы
         _replace: replace, // флаг указывает, что меняется вид продукта
      };
      ```

   -  после ответа данные сохраняются в стейте и последующие запросы эти данные дополняют

-  корзина
   -  получение данных происходит сразу при открытии приложения если пользователь авторизован
   -  управление корзиной происходит, через запросы, с проверкой токенов: access, refresh, csrf (`shared/api/rtkApi.ts`)
-  cookies - храняться токены:
   -  accessToken - слабая защита, короткий срок жизни,
   -  refreshToken - максимальная защита,
   -  \_\_Host-psifi.x-csrf-token - (csrf) максимальная защита,
   -  sessPizza - (сессии) максимальная защита
-  localStorage - храняться дополнительные данные:
   -  products - вид отображаемого продукта,
   -  theme - пользовательская тема,
   -  userId - id пользователя,
   -  viewLoad - вид загрузки карточек (бесконечный скролл или страницы)

[_Вернуться к списку_](#goBack)

---

#### <a id="роутинг">Роутинг</a>

_react-router-dom: 6_

-  создан файл с переменными, в которых указаны пути `shared/const/router.ts`
-  создан файл _routeConfig_ с конфигурацией роутов, в который экспортированы пути и компоненты `app/providers/router/config/`
-  создан файл _AppRouter_ настраивает систему маршрутизации для приложения `app/providers/router/ui/`

[_Вернуться к списку_](#goBack)

---

#### <a id="ленивая-загрузка">Ленивая загрузка</a>

-  компоненты - _lazy_
-  reducers

   -  в типах прописаны как необязательные,
   -  создан файл `src\app\providers\StoreProvider\config\reducerManager.ts` с функцией _createReducerManager_, которая возвращает объект с методами управления редьюсерами (инициализация, добавление, удаление),
   -  создал компонент обёртку _DynamicReducersLoader_ `src\shared\lib\components\DynamicReducersLoader.tsx`, для компонентов с ассинхронными редьсерами,
   -  оборачиваю нужный компонент, куда пропсом передаю нужный редьюсер

-  библиотеки - в этом проекте не нужно было, сделал для ознакомления на компоненте _Drower_ `src\shared\ui\Drawer\Drawer.tsx`
   -  создал файл `src\shared\lib\components\AnimationProvider.tsx`
   -  в нем создаю провайдер (не глобальный, для Drower), поэтому контекст там же
   -  оборачиваю компонент провайдером. После загрузки библиотек возвращается компонент

[_Вернуться к списку_](#goBack)

---

#### <a id="анимация">Анимация</a>

применил две библиотеки `@react-spring/web`, `@use-gesture/react`

-  горизонтальный скроллинг - `src\features\HorizontalScrolling\ui\HorizontalScrolling.tsx`
-  _Drower_ - `src\shared\ui\Drawer\Drawer.tsx`

[_Вернуться к списку_](#goBack)

---

#### <a id="скролл">Скролл</a>

-  бесконечный скролл и сохранение положения скролла
   -  использовал в компоненте `src\widgets\Page\Page.tsx` (обёртка для отображения страниц)
   -  создал два хука:
      -  `src\shared\lib\hooks\useInfiniteScroll.ts` - бесконечный скролл
      -  `src\shared\lib\hooks\useMoveScroll.ts` - сохранение положения скролла

[_Вернуться к списку_](#goBack)

---

#### <a id="яндекс-карта">Яндекс карта</a>

-  `config\build\buildPlugins.ts` - загрузка скрипта в _HtmlWebpackPlugin_
-  `src\shared\lib\ymaps\ymaps.ts` - загрузка библиотеки
-  `src\shared\ui\Maps\Maps.tsx` - переиспользуемый компонент

[_Вернуться к списку_](#goBack)

---

### <a id="безопасность-приложения">Безопасность приложения</a>

Применил для ознакомления.

-  _Content-Security-Policy_ (CSP) - внедрение скриптов (XSS) и выполнение нежелательного кода (инъекция).  
    Происходит добавление сгенерированных _nonce_ токенов в скрипты, которые меняются при каждой перезагрузке страницы.
   -  отправка _nonce_ настроена в NGINX, где происходит замена _"\_NONCE\_"_ (временное значение ), который добавляется на клиенте, на сгенерированный в nginx _nonce_.
   -  применил только для загрузки скриптов (script-src). Хотел добавить еще для стилей, но пришлось отказаться из-за встроенных стилей. В проекте их много, переделывать не стал (в будущем исправлюсь)
   -  на клиенте в конфигурацию webpack добавлен кастомный плагин `config\build\plugins\nonceInjector.ts` который добавляет в теги _script_ атрибут `nonce="_NONCE_"`
-  _Сross Site Request Forgery_ (CSRF) - межсайтовая подделка запроса
   -  не применяется в GET-запросах.
   -  при отправке данных на сервер:
      -  сначала происходит запрос на получение токена, который сохраняется в стейте.
      -  затем он добавляется в заголовки и отправляется с действующим запросом
   -  на сервере происходит проверка и возвращается ошибка, если токен не действительный

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
