import { type UserSettings } from './userSettings';

enum RoleUser {
   ADMIN = 'ADMIN',
   USER = 'USER',
   DEVELOPER = 'DEVELOPER',
}

export interface Birthday {
   day: string;
   month: string;
   year: string;
}

export interface UserData {
   _id: string;
   name?: string;
   phoneNumber: number;
   email?: string;
   birthday?: Birthday;
   role?: RoleUser;
   userSettings?: UserSettings;
}

export interface ValidationErrors {
   errorMessage: string;
   field_errors?: Record<string, string>;
}

export interface UserSchema {
   authData: UserData | null;
   _userUid?: string;

   _inited?: boolean;
   message?: string;
   error: string | null | undefined;
}
