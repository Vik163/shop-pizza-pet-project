declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FIREBASE_SERVICE_ACCOUNT_KEY: string;
      MONGO_DB: string;
      YA_CLIENT_ID: string;
      YA_CLIENT_SECRET: string;
      SESSION_SECRET_KEY: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
      CSRF_SECRET: string;
      TIME_REFRESH: number;
    }
  }
}
export {};