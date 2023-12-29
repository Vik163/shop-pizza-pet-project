import { ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';

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
