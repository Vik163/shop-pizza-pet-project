// import { uid } from 'uid';

import { host } from '@/shared/api/api';

// const state = uid(32);

export const yandexIdConfig = {
   options: {
      client_id: process.env.REACT_APP_YA_CLIENT_ID,
      response_type: 'token',
      // state,
   },
   urlPage: host,
};
