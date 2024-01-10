import { yandexIdConfig } from '@/shared/config/yandex/yandexConfig';

export function getDataYandex() {
   window.onload = function () {
      window.YaAuthSuggest.init(
         yandexIdConfig.options,
         yandexIdConfig.urlPage,
         yandexIdConfig.buttonOptions,
      )
         .then(function (result: any) {
            return result.handler();
         })
         .then(function (data: any) {
            console.log('Сообщение с токеном: ', data);
         })
         .catch(function (error: any) {
            console.log('Что-то пошло не так: ', error);
         });
   };
}

export function handleLoginPage() {
   console.log('i');

   window.YaSendSuggestToken('https://127.0.0.1:3000', {
      kek: true,
   });
}

// .then(function (result: any) {
//    return result.handler();
// })
// .then(function (data: any) {
//    console.log('Сообщение с токеном: ', data);
//    document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(
//       data,
//    )}`;
// })
// .catch(function (error: any) {
//    console.log('Что-то пошло не так: ', error);
//    document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(
//       error,
//    )}`;
