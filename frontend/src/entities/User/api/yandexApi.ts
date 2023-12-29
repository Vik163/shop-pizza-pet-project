import { yandexIdConfig } from '@/shared/config/yandex/yandexConfig';

export function getDataYandex() {
   window.YaAuthSuggest.init(
      yandexIdConfig.options,
      yandexIdConfig.urlPage,
      yandexIdConfig.buttonOptions,
   )
      .then((result: any) => result.handler())
      .then((data: any) => console.log('Сообщение с токеном', data))
      .catch((error: any) => console.log('Обработка ошибки', error));
}

export function handleLoginPage() {
   console.log('i');

   window.YaSendSuggestToken('https://127.0.0.1:3000', {
      kek: true,
   });
}
