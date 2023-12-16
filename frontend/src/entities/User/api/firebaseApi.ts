import {
   deleteUser,
   getAuth,
   onAuthStateChanged,
   RecaptchaVerifier,
   signInWithPhoneNumber,
   User,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../shared/config/firebase/firebase';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import { UserData } from '@/entities/User/model/types/user';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';
import { initAuthData } from '../model/services/initAuthData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import axios from 'axios';
import { $api } from '@/shared/api/api';
import { userAction } from '../model/slice/userSlice';
//! global 'window'  from 'app/types/window.d.ts'

interface FirebaseApi {
   createUser?: (user: User) => void;
   setIsConfirmCode?: Dispatch<SetStateAction<boolean>>;
}

export const firebaseApi = (props: FirebaseApi) => {
   const { createUser, setIsConfirmCode } = props;

   const dispatch = useAppDispatch();
   const [errorAuthPhone, setErrorAuthPhone] = useState('');
   const { deleteCookie, setCookie } = useCookie();

   initializeApp(firebaseConfig);
   const auth = getAuth();
   const userData = auth.currentUser;

   // инициализация пользователя при запуске
   const getCurrentUser = async () => {
      const userId = localStorage.getItem('userId');

      onAuthStateChanged(auth, async (user) => {
         if (userId && user) {
            const guardKey = await $api.get('/guard');
            if (guardKey) {
               dispatch(userAction.setToken(guardKey.data.guard));
               setTokens(user);
               dispatch(initAuthData());
            }
         }
      });
   };

   // 1  После проверки позволяет запустить [START auth_phone_signin]
   // стилизуем контейнер в абсолют и невидимый
   // [START auth_phone_recaptcha_verifier_invisible]
   const recaptchaInvisible = () => {
      window.recaptchaVerifier = new RecaptchaVerifier(
         auth,
         'recaptcha-container',
         {
            size: 'invisible',
            callback: (response: string) => {
               // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
         },
      );
   };
   // ------------------------------------------------------------------------

   // 2 получает номер - проверка captcha и отправка номера на верификацию ------
   const phoneSignIn = (phoneNumber: string) => {
      recaptchaInvisible();
      const appVerifier = window.recaptchaVerifier;
      // [START auth_phone_signin]
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
            setIsConfirmCode && setIsConfirmCode(true);
            // SMS отправляет. Приходит код подтвержения, меняем окно логина
            window.confirmationResult = confirmationResult;
         })
         .catch((error) => {
            console.log('sms не отправлена', error);
            setErrorAuthPhone(error);
         });
   };
   // ------------------------------------------------------------------

   //
   const logout = (e: SyntheticEvent) => {
      // e.preventDefault();
      if (!userData) return;
      deleteUser(userData)
         .then((res) => {
            localStorage.deleteItem('refreshToken');
            localStorage.deleteItem('userId');
            deleteCookie('accessToken');
         })
         .catch((error) => {
            console.log(error);
            // An error ocurred
            // ...
         });
   };

   function recaptchaVerifierVisible() {
      // [START auth_phone_recaptcha_verifier_visible]
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
         size: 'normal',
         callback: (response: string) => {
            console.log(response);
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
         },
         'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
         },
      });
      // [END auth_phone_recaptcha_verifier_visible]
   }

   function recaptchaVerifierSimple() {
      // [START auth_phone_recaptcha_verifier_simple]
      window.recaptchaVerifier = new RecaptchaVerifier(
         auth,
         'recaptcha-container',
      );
      // [END auth_phone_recaptcha_verifier_simple]
   }

   function recaptchaRender() {
      const recaptchaVerifier = window.recaptchaVerifier;

      // [START auth_phone_recaptcha_render]
      recaptchaVerifier.render().then((widgetId) => {
         window.recaptchaWidgetId = widgetId;
      });
      // [END auth_phone_recaptcha_render]
   }

   // 3 получает код подтверждения и верификация --------------------------
   function verifyCode(code: string) {
      const confirmationResult = window.confirmationResult;

      confirmationResult
         .confirm(code)
         .then((result: { user: User }) => {
            // успешная регистрация в firebase.
            const user = result.user;
            // создание пользователя в БД
            const data = user && createUser && createUser(user);
            // user && createUser && createUser(user);
            data && setTokens(user);
         })
         .catch((error: string) => {
            console.log('Неверный код', error);
            setErrorAuthPhone(error);
         });
   }
   // --------------------------------------------------------------------

   // устанавливаем токены -----------------------------------------------
   function setTokens(user: User) {
      const rToken = localStorage.getItem('refreshToken');
      !rToken && localStorage.setItem('refreshToken', user.refreshToken);

      user.getIdToken().then((token) => {
         setCookie('accessToken', token, { secure: true, samesite: 'strict' });
         // document.cookie = `accessToken=${token}; secure; samesite`;
      });
   }
   // --------------------------------------------------------

   // function getRecaptchaResponse() {
   //    const recaptchaWidgetId = '...';
   //    const grecaptcha = {};

   //    // [START auth_get_recaptcha_response]
   //    const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
   //    // [END auth_get_recaptcha_response]
   // }

   return {
      phoneSignIn,
      verifyCode,
      logout,
      errorAuthPhone,
      userData,
      setTokens,
      getCurrentUser,
   };
};
