import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
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

  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  // @IsNotEmpty()
  email?: string;

  @IsNotEmpty()
  @Matches(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g, {
    message: 'неправильный формат телефона',
  })
  @IsOptional()
  phoneNumber?: string;
  birthday?: string;

  // @IsNotEmpty()
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
  //   message: 'password too weak',
  // })
  // password: string;
  @IsNotEmpty()
  @IsOptional() // @IsOptional() и @IsNotEmpty() указывает, что поле "name", если оно присутствует, не должно быть пустым
  @MinLength(2)
  @MaxLength(20)
  name?: string;

  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(20)
  // lastName: string;

  // @IsEnum(Roles, { each: true })
  role?: Roles;
  refreshTokenData?: RefreshTokenDto | null;
  createDate?: Date;
}

export class UserFirebaseDto {
  state: string;
}
