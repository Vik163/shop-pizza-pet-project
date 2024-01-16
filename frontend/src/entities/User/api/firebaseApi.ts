import {
   Auth,
   getAuth,
   RecaptchaVerifier,
   signInWithPhoneNumber,
   signOut,
   User,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../shared/config/firebase/firebaseConfig';
import { Dispatch, SetStateAction } from 'react';
import { useCookie } from '@/shared/lib/hooks/useCookie/useCookie';

//! global 'window'  from 'app/types/window.d.ts'
initializeApp(firebaseConfig);

const { deleteCookie, setCookie } = useCookie();

class FirebaseApi {
   private _auth: Auth;
   constructor() {
      this._auth = getAuth();
   }

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
   verifyCode(code: string) {
      const confirmationResult = window.confirmationResult;

      return confirmationResult
         .confirm(code)
         .then(async (result: { user: User }) => {
            // успешная регистрация в firebase.
            const user = result.user;
            console.log('verifyCode', user);

            user && this.setTokens(user);

            return user;
         })
         .catch((error: string) => {
            console.log('Неверный код', error);
            // setErrorAuthPhone(error);
         });
   }
   // --------------------------------------------------------------------

   // устанавливаем токены -----------------------------------------------
   setTokens(user: User) {
      const rToken = localStorage.getItem('refreshToken');
      !rToken && localStorage.setItem('refreshToken', user.refreshToken);

      user.getIdToken().then((token) => {
         setCookie('accessToken', token, { secure: true, samesite: 'strict' });
         // document.cookie = `accessToken=${token}; secure; samesite`;
      });
   }
   // --------------------------------------------------------

   signout() {
      return signOut(this._auth)
         .then((data) => {
            return true;
         })
         .catch((error) => {
            console.log('Пользователь не удален (firebase)', error);
         });
   }

   resetRecaptcha(captchaRef: React.RefObject<HTMLDivElement>) {
      // Or, if you haven't stored the widget ID:
      if (captchaRef.current && window.recaptchaVerifier) {
         window.recaptchaVerifier.clear();
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
