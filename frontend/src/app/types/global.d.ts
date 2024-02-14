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
