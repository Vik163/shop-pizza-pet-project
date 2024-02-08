import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsAlpha,
  IsOptional,
} from 'class-validator';
import session from 'express-session';
import { RefreshTokenDto } from './refreshToken.dto';

export enum Roles {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  DEVELOPER = 'DEVELOPER',
}

type TSess = session.Session & Partial<session.SessionData>;
export interface ISession extends TSess {
  userId?: string;
  visits?: number;
  provider?: string;
  pro?: string;
}

export class UserDto {
  _id?: string;

  @IsOptional()
  @IsEmail()
  // @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  @Matches(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g, {
    message: 'неправильный формат телефона',
  })
  phoneNumber: string;

  // @IsNotEmpty()
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
  //   message: 'password too weak',
  // })
  // password: string;

  // @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  @MaxLength(20)
  @IsAlpha()
  name?: string;

  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(20)
  // @IsAlpha()
  // lastName: string;

  // @IsEnum(Roles, { each: true })
  role?: Roles;
  refreshTokenData?: RefreshTokenDto | null;
  createDate?: Date;
}

export class UserFirebaseDto {
  state: string;
}
