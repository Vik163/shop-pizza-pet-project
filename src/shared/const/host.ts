export const host: string = __IS_DEV__
   ? process.env.HOST_API_DEV
   : process.env.HOST_API_PROD;
