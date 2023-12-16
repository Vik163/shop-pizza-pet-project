export { userReducer, userAction } from './model/slice/userSlice';
export type { UserSchema } from './model/types/user';
export { getInited } from './model/selectors/userDataSelector';
export { initAuthData } from './model/services/initAuthData';
