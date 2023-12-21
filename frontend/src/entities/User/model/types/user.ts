import { UserParameters } from './userParameters';

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
   message?: string;
}

export interface UserSchema {
   authData?: UserData;
   _userUid?: string;

   _inited?: boolean;
   message?: string;
}
