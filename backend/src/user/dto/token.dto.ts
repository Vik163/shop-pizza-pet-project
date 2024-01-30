import {} from //   IsEmail,
//   IsNotEmpty,
//   MaxLength,
//   MinLength,
//   Matches,
//   IsAlpha,
//   IsOptional,
'class-validator';

export class TokenDto {
  createToken: Date;
  refreshToken: string | null;
}
