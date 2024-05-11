/* eslint-disable @typescript-eslint/no-explicit-any */

declare module '*.scss' {
   type IClassNames = Record<string, string>;
   const classNames: IClassNames;
   export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
   import type React from 'react';

   const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
   export default SVG;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest';

// 5_6 6-7 min
// подразумевает, что все поля становятся необязательными
// вместо DeepPartial из redux
type DeepPartial<T> = T extends object
   ? {
        [P in keyof T]?: DeepPartial<T[P]>;
     }
   : T;

// 9_1 10min
type OptionalRecord<K extends keyof any, T> = {
   [P in K]?: T;
};

declare namespace NodeJS {
   interface ProcessEnv {
      REACT_APP_FIREBASE_API_KEY: string;
      REACT_APP_FIREBASE_AUTH_DOMAIN: string;
      REACT_APP_FIREBASE_PROJECT_ID: string;
      REACT_APP_FIREBASE_STORAGE_BUCKET: string;
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID: string;
      REACT_APP_FIREBASE_APP_ID: string;

      REACT_APP_YA_MAP_KEY: string;
      REACT_APP_YA_CLIENT_ID: string;
      REACT_APP_YA_CLIENT_SECRET: string;

      REACT_APP_DADATA_API_KEY: string;
      REACT_APP_DADATA_CLIENT_SECRE: string;

      WDS_SOCKET_PORT: string;
   }
}
