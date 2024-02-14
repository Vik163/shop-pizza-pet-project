import React from 'react';
import {
   type Auth,
   getAuth,
   RecaptchaVerifier,
   signInWithPhoneNumber,
   signOut,
   type User,
   ConfirmationResult,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { type Dispatch, type SetStateAction } from 'react';
import { firebaseConfig } from '../../../shared/config/firebase/firebaseConfig';

//! global 'window'  from 'app/types/window.d.ts'
initializeApp(firebaseConfig);

class FirebaseApi {
   private readonly _auth: Auth;

   private _confirmationResult: ConfirmationResult;

   private _recaptchaVerifier: RecaptchaVerifier;

   constructor() {
      this._auth = getAuth();
      this._confirmationResult = window.confirmationResult;
      this._recaptchaVerifier = window.recaptchaVerifier;
   }

   //* АВТОРИЗАЦИЯ ------------------------------------------

   // 1 получает номер - проверка captcha и отправка номера на верификацию ------
   phoneSignIn(
      phoneNumber: string,
      setIsConfirmCode?: Dispatch<SetStateAction<boolean>>,
   ) {
      this._recaptchaInvisible();

      const appVerifier = this._recaptchaVerifier;
      // [START auth_phone_signin]
      signInWithPhoneNumber(this._auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
            if (setIsConfirmCode) setIsConfirmCode(true);
            // SMS отправляет. Приходит код подтвержения, меняем окно логина
            this._confirmationResult = confirmationResult;
            if (typeof grecaptcha === 'undefined') {
               console.error('reCAPTCHA API key is incorrect or missing');
            } else {
               console.log('reCAPTCHA');
            }
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
      this._recaptchaVerifier = new RecaptchaVerifier(
         this._auth,
         'recaptcha-container',
         {
            size: 'invisible',
            callback: () => {
               // reCAPTCHA solved, allow signInWithPhoneNumber.
            },
         },
      );
   }
   // ------------------------------------------------------------------------

   // 3 получает код подтверждения и верификация --------------------------
   async verifyCode(code: string) {
      // const { confirmationResult } = window;

      return this._confirmationResult
         .confirm(code)
         .then(async (result: { user: User }) => {
            // успешная регистрация в firebase.
            const { user } = result;

            return user;
         })
         .catch((error: string) => {
            console.log('Неверный код', error);
         });
   }
   // --------------------------------------------------------------------

   async signout() {
      return signOut(this._auth)
         .then(() => {
            return true;
         })
         .catch((error) => {
            console.log('Пользователь не удален (firebase)', error);
         });
   }

   resetRecaptcha(captchaRef: React.RefObject<HTMLDivElement>) {
      // Or, if you haven't stored the widget ID:
      if (captchaRef.current && this._recaptchaVerifier) {
         this._recaptchaVerifier.clear();
         // eslint-disable-next-line no-param-reassign
         captchaRef.current.innerHTML = `<div id='recaptcha-container'></div>`;
      }
   }
}

export const firebaseApi = new FirebaseApi();

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
