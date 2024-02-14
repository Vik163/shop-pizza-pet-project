//* document.cookie - чтение куки
//* document.cookie = "user=John" - Запись куки
// document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT" - пример

//* path - URL-префикс пути. Должен быть абсолютным. По умолчанию используется текущий путь.
// Если куки установлено с path=/admin, то оно будет доступно на страницах /admin и /admin/something,
// но не на страницах /home или /adminpage

//* domain - определяет, где доступен файл куки
// domain=site.com (other.com никогда не получит куки, установленный по адресу site.com)
// по умолчанию файл куки также не передаётся поддомену, например forum.site.com

//* expires, max-age - По умолчанию, если куки не имеют ни одного из этих параметров,
// то они удалятся при закрытии браузера
// Максимальный возраст файла cookie в секундах (например, 60*60*24*365 или 31536000 в течение года), не более 400 дней
// expires=Tue, 19 Jan 2038 03:14:07 GMT устанавливает дату
// max-age=3600 устанавливает время в секундах

//* secure - С этой настройкой, если куки будет установлено на сайте https://site.com,
// то оно не будет доступно на том же сайте с протоколом HTTP, как http://site.com.

//* samesite=strict или samesite - Куки никогда не отправятся, если пользователь пришёл не с этого же сайта.
// Другими словами, если пользователь переходит по ссылке из почты, отправляет форму с evil.com или
// выполняет любую другую операцию, происходящую с другого домена, то куки не отправляется.
// samesite=lax Это более мягкий вариант, который также защищает от XSRF (подробности в нете)
// samesite=none

//* httpOnly - такие Cookies читать и писать может только сервер. Делает он это через заголовки cookie и set-cookie соответственно
// Эта настройка запрещает любой доступ к куки из JavaScript. Мы не можем видеть такое куки или манипулировать им с помощью document.cookie.
// Эта настройка используется в качестве меры предосторожности от определённых атак, когда хакер внедряет свой собственный JavaScript-код
// в страницу и ждёт, когда пользователь посетит её

//* __Secure
// Cookies с именем, начинающимся с __Secure- (подчёркивание является частью префикса )
// должны быть установлены вместе с флагом secure, и должны быть с безопасной страницы (HTTPS).
//* __Host
// Cookies с именем, начинающимся с __Host- должны быть установлены с флагом secure secure,
// должны быть с безопасной страницы (HTTPS), не должны иметь определённый домен
// (и, следовательно, не не посылаются поддоменами), а также параметр Path должен быть "/".

// Пример использования:
// setCookie('user', 'John', {
//    path: '/admin',
//    secure: true,
//    samesite: 'strict',
//    expires: 'Fri Dec 31 2024 23:59:59 GMT',
// }),

interface OptionsCookie {
   'max-age'?: number;
   expires?: DateConstructor | string;
   path?: string;
   secure?: boolean;
   samesite?: string;
   domain?: string;
}

export const useCookie = () => {
   function getCookie(name: string) {
      const matches = document.cookie.match(
         new RegExp(
            `(?:^|; )${name.replace(
               // eslint-disable-next-line no-useless-escape
               /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
               '\\$1',
            )}=([^;]*)`,
         ),
      );

      return matches ? decodeURIComponent(matches[1]) : undefined;
   }

   function setCookie(
      name: string,
      value: string,
      options: OptionsCookie = {},
   ) {
      options = {
         // path: '/',
         // при необходимости добавьте другие значения по умолчанию
         ...options,
      };

      if (options.expires instanceof Date) {
         options.expires = options.expires.toUTCString();
      }

      let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      // for (const optionKey in options) {
      //    updatedCookie += `; ${optionKey}`;
      //    const optionValue = (options as any)[optionKey];
      //    if (optionValue !== true) {
      //       updatedCookie += `=${optionValue}`;
      //    }
      // }

      Object.keys(options).forEach((optionKey) => {
         updatedCookie += `; ${optionKey}`;
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         const optionValue = (options as any)[optionKey];
         if (optionValue !== true) {
            updatedCookie += `=${optionValue}`;
         }
      });

      document.cookie = updatedCookie;
   }

   function deleteCookie(name: string) {
      setCookie(name, '', {
         'max-age': -1,
      });
   }

   return { getCookie, setCookie, deleteCookie };
};
