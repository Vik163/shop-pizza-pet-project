import { $api } from '@/shared/api/api';
import { csrfTokenActions } from '../slice/tokenSlice';
// eslint-disable-next-line ulbi-tv-plugin/layer-imports
import { type AppDispatch } from '@/app/providers/StoreProvider/config/store';

// export const fetchTokenForm = (dispatch: AppDispatch): void => {
//    $api.get('/csrf').then((data) => {
//       const token = data.data.csrf;
//       if (token) {
//          dispatch(csrfTokenActions.setToken(token));
//       }
//    });
// };

export const fetchTokenForm = async (
   dispatch: AppDispatch,
): Promise<string> => {
   return $api.get('/csrf').then((data) => {
      const token = data.data.csrf;
      if (token) {
         dispatch(csrfTokenActions.setToken(token));
      }
      return token;
   });
};
