### Firebase

-  [По телефону](https://firebase.google.com/docs/auth/web/phone-auth?hl=ru&authuser=0)
   -  [Зарегистрировать проект](https://firebase.google.com/docs/web/setup?authuser=0&hl=ru)
   -  Плюс регистрация на бекенде (если он есть)
   -  Создаю файл firebaseConfig в shared/config и переношу туда инициализационные данные (с .env)
   -  Создаю класс FirebaseApi, где использую запросы на firebase
   -  recaptcha делаю невидимую, при отмене дествия ее надо сбрасывать
      -  можно отключать для тестов `getAuth().settings.appVerificationDisabledForTesting = true;` (не рекомендуется)

### Yandex ID

-  [Зарегистрировать проект](https://oauth.yandex.ru/)
-  [Документация](https://yandex.ru/dev/id/doc/ru/?utm_source=yandex&utm_medium=yandex-id&utm_campaign=link-owners-sites)
   -  Создаю yandexConfig в shared/config для инициализации
   -  Использую [Альтернативный способ с кодом подтверждения](https://yandex.ru/dev/id/doc/ru/codes/code-and-token) основная логика выполняется на бекенде
   -  На фронте создается ссылка `<a href="https://oauth.yandex.ru/authorize?...">` c query параметрами в которые вложена личный id, state, Redirect URI для веб-сервисов `'https://pizzashop163.ru/api/yandex'` (настраивается при регистрации проекта) и вызывается по клику запрос с отправкой дополнительной защиты state, вложенной в headers, на адрес `'https://pizzashop163.ru/api/yandex'`
   -  после верификации происходит переадресация на бекенд `'https://pizzashop163.ru/api/yandex'` где в query приходят state и код подтверждения
   -  после логики на беке происходит переадресация на фронт с отправкой данных пользователя в query параметрах

### Токены

#### access and refresh

-  отправляются в куки: access - короткий срок, refresh - httpOnly
-  логика в интерцепторе shared/api axios.request
-  access вкладывается в headers
-  для проверки access устанавливаются два пакета _'jwt-decode'_ и _'dayjs'_ проверяют срок годности токена
-  если не проходит проверку отправляется запрос `https://pizzashop163.ru/api/refresh/${userId}` для обновления токена

#### csrf

-  храниться по умолчанию в куки - httpOnly, и после запроса, при инициализации, в стейте откуда и берется
-  для запросов с отправкой данных на бекенд
