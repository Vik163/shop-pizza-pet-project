import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { Request, Response } from 'express';
// import { UserDto } from 'src/user/dto/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokensService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  hashData(data: string) {
    return argon2.hash(data);
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    const token = user.token.refreshToken;
    if (!user || !token) throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(token, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.phoneNumber);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(user: UserDto, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    user.token = {
      refreshToken: hashedRefreshToken,
      createToken: new Date(),
    };

    await this.userService.update(user._id, user);
  }

  async getTokens(userId: string, phoneNumber: string) {
    const payload = { userId, phoneNumber };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_SECRET'),
        // secret: process.env.ACCESS_SECRET,
        expiresIn: '15s',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: `${this.configService.get<number>('TIME_REFRESH')}d`,
        // expiresIn: `${process.env.TIME_REFRESH}d`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
