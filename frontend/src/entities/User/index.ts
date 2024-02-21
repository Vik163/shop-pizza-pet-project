export { userReducer, userAction } from './model/slice/userSlice';
export type { UserData, UserSchema, Birthday } from './model/types/user';
export type { TokenSchema } from './model/types/token';
export {
   getInited,
   getUserData,
   getUserEmail,
   getUserName,
   getUserBirthday,
   getUserPhone,
} from './model/selectors/userDataSelector';
export { initAuthData } from './model/services/initAuthData';
export { firebaseApi } from './api/firebaseApi';
export { csrfTokenReducer, csrfTokenActions } from './model/slice/tokenSlice';
export { fetchCsrfToken } from './model/services/fetchCsrfToken';
export { getTokenSelector } from './model/selectors/getTokenSelector';
