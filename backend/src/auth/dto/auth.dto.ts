// import {
//   IsEmail,
//   IsNotEmpty,
//   MaxLength,
//   MinLength,
//   Matches,
//   IsEnum,
//   IsAlpha,
//   IsOptional,
// } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';
import { TokensDto } from './tokens.dto';

export enum Roles {
  ADMIN = 'ADMIN',
  STANDART = 'STANDART',
  DEVELOPER = 'DEVELOPER',
}

export class AuthDto {
  user: UserDto;
  tokens: TokensDto;
  // @IsOptional()
  // @IsEmail()
  // // @IsNotEmpty()
  // email?: string;
  // @IsNotEmpty()
  // @Matches(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g, {
  //   message: 'неправильный формат телефона',
  // })
  // phoneNumber: string;
  // @IsNotEmpty()
  // @MinLength(8)
  // @MaxLength(20)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}$/, {
  //   message: 'password too weak',
  // })
  // password: string;
  // @IsNotEmpty()
  // @IsOptional()
  // @MinLength(2)
  // @MaxLength(20)
  // @IsAlpha()
  // name?: string;
  // @IsNotEmpty()
  // @MinLength(2)
  // @MaxLength(20)
  // @IsAlpha()
  // lastName: string;
  // @IsNotEmpty()
  // @IsEnum(Roles, { each: true })
  // role: Roles[];
}
