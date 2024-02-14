import { yandexIdConfig } from '@/shared/config/yandex/yandexConfig';

export function getDataYandex() {
   window.onload = function () {
      window.YaAuthSuggest.init(
         yandexIdConfig.options,
         yandexIdConfig.urlPage,
         yandexIdConfig.buttonOptions,
      )
         .then((result: any) => {
            return result.handler();
         })
         .then((data: any) => {
            console.log('Сообщение с токеном: ', data);
         })
         .catch((error: any) => {
            console.log('Что-то пошло не так: ', error);
         });
   };
}
