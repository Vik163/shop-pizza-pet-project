import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
// import { UserDto } from 'src/user/dto/user.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { TokensDto } from './dto/tokens.dto';

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

  // Счетчик времени хранения токена в БД =======================================
  handleTimeToken(date: Date) {
    //Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = date.getTime();
    const date2_ms = new Date().getTime();

    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }

  // Получаю токены: из куки запроса и хешированный из БД
  // верифицуруются argon2
  // Проверяю время токена в БД и если вышло то возвращаю новые токены иначе только access
  async updateTokens(userId: string, req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    const user = await this.userService.findById(userId);
    // хешированный из БД
    const token = user.refreshTokenData.refreshToken;
    if (!user || !token) throw new ForbiddenException('Доступ отклонён');
    // верификация
    const refreshTokenMatches = await argon2.verify(token, refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Доступ отклонён');
    const tokens = await this.getTokens(user.id, user.phoneNumber);

    const timeToken = this.handleTimeToken(user.refreshTokenData.createToken);
    console.log('timeToken:', timeToken);
    // время вышло => обновляем токен в БД и отправляем токены в куки
    if (timeToken > process.env.TIME_REFRESH - 2) {
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      this.sendTokens(res, tokens);
    } else {
      tokens.refreshToken = undefined;
      this.sendTokens(res, tokens);
    }
  }

  async updateRefreshToken(user: UserDto, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    user.refreshTokenData = {
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
        // secret: process.env.REFRESH_SECRET,
        expiresIn: `${this.configService.get<number>('TIME_REFRESH')}d`,
        // expiresIn: `${process.env.TIME_REFRESH}d`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // Отправка токенов ========================================================
  sendTokens(res: Response, tokens: TokensDto) {
    res.cookie('accessToken', tokens.accessToken, { secure: true });
    tokens.refreshToken &&
      res.cookie('refreshToken', tokens.refreshToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 68 * 24 * 1000 * process.env.TIME_REFRESH,
      });
  }
}
