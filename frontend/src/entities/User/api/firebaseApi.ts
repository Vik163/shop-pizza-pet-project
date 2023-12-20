import {
   Auth,
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
import { StateSchema } from '@/app/providers/StoreProvider';
import { ThunkExtraArg } from '@/app/providers/StoreProvider/config/StateSchema';
import { ThunkDispatch, CombinedState, AnyAction } from '@reduxjs/toolkit';
//! global 'window'  from 'app/types/window.d.ts'

const { deleteCookie, setCookie } = useCookie();
initializeApp(firebaseConfig);

class FirebaseApi {
   private _auth: Auth;
   private _userData: User | null;
   constructor() {
      this._auth = getAuth();
      this._userData = this._auth.currentUser;
   }

   // инициализация пользователя при запуске ===================
   getCurrentUser(
      dispatch: ThunkDispatch<
         CombinedState<StateSchema>,
         ThunkExtraArg,
         AnyAction
      > &
         Dispatch<AnyAction>,
   ) {
      const userId = localStorage.getItem('userId');

      onAuthStateChanged(this._auth, (user) => {
         if (userId && user) {
            this._setTokens(user);
            dispatch(initAuthData());
         }
      });
   }
   //================================================================

   //* АВТОРИЗАЦИЯ ------------------------------------------

   // 1 получает номер - проверка captcha и отправка номера на верификацию ------
   phoneSignIn(
      phoneNumber: string,
      setIsConfirmCode?: Dispatch<SetStateAction<boolean>>,
   ) {
      this._recaptchaInvisible();
      const appVerifier = window.recaptchaVerifier;
      // [START auth_phone_signin]
      signInWithPhoneNumber(this._auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
            setIsConfirmCode && setIsConfirmCode(true);
            // SMS отправляет. Приходит код подтвержения, меняем окно логина
            window.confirmationResult = confirmationResult;
         })
         .catch((error) => {
            console.log('sms не отправлена', error);
            // setErrorAuthPhone(error);
         });
   }
   // ------------------------------------------------------------------

   // 2  После проверки позволяет запустить [START auth_phone_signin]
   // стилизуем контейнер в абсолют и невидимый
   // [START auth_phone_recaptcha_verifier_invisible]
   _recaptchaInvisible() {
      window.recaptchaVerifier = new RecaptchaVerifier(
         this._auth,
         'recaptcha-container',
         {
            size: 'invisible',
            callback: (response: string) => {
               // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
         },
      );
   }
   // ------------------------------------------------------------------------

   // 3 получает код подтверждения и верификация --------------------------
   verifyCode(code: string, createUser?: (user: User) => void) {
      const confirmationResult = window.confirmationResult;

      confirmationResult
         .confirm(code)
         .then((result: { user: User }) => {
            // успешная регистрация в firebase.
            const user = result.user;
            // создание пользователя в БД
            const data = user && createUser && createUser(user);
            // user && createUser && createUser(user);
            data && this._setTokens(user);
         })
         .catch((error: string) => {
            console.log('Неверный код', error);
            // setErrorAuthPhone(error);
         });
   }
   // --------------------------------------------------------------------

   // устанавливаем токены -----------------------------------------------
   _setTokens(user: User) {
      const rToken = localStorage.getItem('refreshToken');
      !rToken && localStorage.setItem('refreshToken', user.refreshToken);

      user.getIdToken().then((token) => {
         setCookie('accessToken', token, { secure: true, samesite: 'strict' });
         // document.cookie = `accessToken=${token}; secure; samesite`;
      });
   }
   // --------------------------------------------------------

   // function recaptchaVerifierVisible() {
   //    // [START auth_phone_recaptcha_verifier_visible]
   //    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
   //       size: 'normal',
   //       callback: (response: string) => {
   //          console.log(response);
   //          // reCAPTCHA solved, allow signInWithPhoneNumber.
   //          // ...
   //       },
   //       'expired-callback': () => {
   //          // Response expired. Ask user to solve reCAPTCHA again.
   //          // ...
   //       },
   //    });
   //    // [END auth_phone_recaptcha_verifier_visible]
   // }

   // function recaptchaVerifierSimple() {
   //    // [START auth_phone_recaptcha_verifier_simple]
   //    window.recaptchaVerifier = new RecaptchaVerifier(
   //       auth,
   //       'recaptcha-container',
   //    );
   //    // [END auth_phone_recaptcha_verifier_simple]
   // }

   // function recaptchaRender() {
   //    const recaptchaVerifier = window.recaptchaVerifier;

   //    // [START auth_phone_recaptcha_render]
   //    recaptchaVerifier.render().then((widgetId) => {
   //       window.recaptchaWidgetId = widgetId;
   //    });
   //    // [END auth_phone_recaptcha_render]
   // }
}

export const firebaseApi = new FirebaseApi();
