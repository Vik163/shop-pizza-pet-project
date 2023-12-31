import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsAlpha,
  IsOptional,
} from 'class-validator';

export enum Permissions {
  ADMIN = 'ADMIN',
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
}

export class AuthDto {
  @IsNotEmpty()
  _id: string;

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

  @IsNotEmpty()
  @IsEnum(Permissions, { each: true })
  role: Permissions[];
}
