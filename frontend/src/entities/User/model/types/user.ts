import { type UserParameters } from './userParameters';

enum RoleUser {
   ADMIN = 'ADMIN',
   USER = 'USER',
   DEVELOPER = 'DEVELOPER',
}

export interface UserData {
   _id: string;
   name?: string;
   phoneNumber: number;
   email?: string;
   role: RoleUser;
   userParameters?: UserParameters;
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
