import { SerializedError } from '@reduxjs/toolkit';

export interface AuthPhoneSchema {
   phoneNumber?: string;
   isLoading?: boolean;
   error?: SerializedError;
}
