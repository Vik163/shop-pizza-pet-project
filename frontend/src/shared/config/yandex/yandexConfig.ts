export const yandexIdConfig = {
   options: {
      client_id: process.env.REACT_APP_YA_CLIENT_ID,
      response_type: 'token',
      redirect_uri: 'https://127.0.0.1:3000/ya_login',
      // redirect_uri: 'https://oauth.yandex.ru/verification_code',
   },
   urlPage: 'https://127.0.0.1:3000',
   buttonOptions: {
      view: 'button',
      parentId: 'container_ya',
      buttonView: 'additional',
      buttonTheme: 'light',
      buttonSize: 'xs',
      buttonBorderRadius: 8,
   },
};
