import { uid } from 'uid';

const state = uid(32);

export const yandexIdConfig = {
   options: {
      client_id: process.env.REACT_APP_YA_CLIENT_ID,
      response_type: 'token',
      redirect_uri: 'https://oauth.yandex.ru/verification_code',
      state: state,
   },
   urlPage: 'https://localhost:3000',
   buttonOptions: {
      view: 'button',
      parentId: 'container_ya',
      buttonView: 'additional',
      buttonTheme: 'light',
      buttonSize: 'xs',
      buttonBorderRadius: 8,
   },
};
