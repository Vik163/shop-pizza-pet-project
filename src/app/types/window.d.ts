/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ConfirmationResult, type RecaptchaVerifier } from 'firebase/auth';

declare global {
   interface Window {
      recaptchaVerifier: RecaptchaVerifier;
      confirmationResult: ConfirmationResult;
      recaptchaWidgetId: number;
   }
}

declare global {
   interface Window {
      YaAuthSuggest: any;
      YaSendSuggestToken: any;
   }
}

declare global {
   interface Window {
      map: any;
   }
}
