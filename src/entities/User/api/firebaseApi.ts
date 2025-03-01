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
import { firebaseConfig } from '@/shared/config/firebase/firebaseConfig';

//! global 'window'  from 'app/types/window.d.ts'
initializeApp(firebaseConfig);

class FirebaseApi {
   private readonly _auth: Auth;

   private _confirmationResult: ConfirmationResult;

   private _recaptchaVerifier: RecaptchaVerifier;

   constructor() {
      this._auth = getAuth();
      // отключает проверку recaptcha для тестов (временное решение. при сбросе recaptcha выбрасывает ошибку)
      // this._auth.settings.appVerificationDisabledForTesting = true;
      this._confirmationResult = window.confirmationResult;
      this._recaptchaVerifier = window.recaptchaVerifier;
   }

   //* АВТОРИЗАЦИЯ ===================================================

   // 1 получает номер - проверка captcha и отправка номера на верификацию ======
   async phoneSignIn(phoneNumber: string): Promise<string> {
      this._recaptchaInvisible();

      const appVerifier = this._recaptchaVerifier;
      // [START auth_phone_signin]
      return signInWithPhoneNumber(this._auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
            // SMS отправляет. Приходит код подтвержения, меняем окно логина
            this._confirmationResult = confirmationResult;

            if (typeof grecaptcha === 'undefined') {
               throw new Error('sms не отправлена');
            }
            return 'успешно';
         })
         .catch((error: Error) => {
            return error.message;
         });
   }

   // 2  После проверки позволяет запустить [START auth_phone_signin] =====
   // стилизуем контейнер в абсолют и невидимый
   // [START auth_phone_recaptcha_verifier_invisible]
   _recaptchaInvisible() {
      try {
         this._recaptchaVerifier = new RecaptchaVerifier(
            this._auth,
            'recaptcha-container',
            {
               size: 'invisible',
            },
         );
      } catch (err) {
         throw new Error('reCaptchaInvisible');
      }
   }

   // 3 получает код подтверждения и верификация =======================
   async verifyCode(code: string) {
      return this._confirmationResult
         .confirm(code)
         .then(async (result: { user: User }) => {
            // успешная регистрация в firebase.
            const { user } = result;

            return user;
         })
         .catch((error: string) => {
            console.log('Неверный код', error);
            // Для обработки ошибки
            return null;
         });
   }

   // ====================================================================
   async signout() {
      return signOut(this._auth)
         .then(() => {
            return true;
         })
         .catch((error) => {
            console.log('Пользователь не удален (firebase)', error);
            return false;
         });
   }

   // сброс recaptcha ====================================================
   resetRecaptcha(captchaRef: React.RefObject<HTMLDivElement>) {
      try {
         // Or, if you haven't stored the widget ID:
         if (captchaRef.current && this._recaptchaVerifier) {
            this._recaptchaVerifier.clear();
            // eslint-disable-next-line no-param-reassign
            captchaRef.current.innerHTML = `<div id='recaptcha-container'></div>`;

            return true;
         }
      } catch (err) {
         throw new Error('reCaptcha');
      }
   }
}

export const firebaseApi = new FirebaseApi();
