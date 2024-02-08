import {} from //   IsEmail,
//   IsNotEmpty,
//   MaxLength,
//   MinLength,
//   Matches,
//   IsAlpha,
//   IsOptional,
'class-validator';

export class RefreshTokenDto {
  createToken: Date;
  refreshToken: string | null;
}
