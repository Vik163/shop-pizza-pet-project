import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SessionsService } from './sessions.service';
import { TokensService } from './token.service';
import { AuthDto } from './dto/auth.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly sesionsService: SessionsService,
    private readonly tokensService: TokensService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // Счетчик времени хранения токена в БД
  private handleTimeToken(date: Date) {
    //Get 1 day in milliseconds
    const one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    const date1_ms = date.getTime();
    const date2_ms = new Date().getTime();

    const difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
  }

  // получаем пользователя по id или возвращаем "не найден"
  // получаем время хранения
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user: UserDto = await this.userModal.findById(id);

    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );

      const timeToken = this.handleTimeToken(user.token.createToken);
      // время вышло => обновляем токен в БД и отправляем токены в куки
      if (timeToken >= process.env.TIME_REFRESH - 1) {
        await this.tokensService.updateRefreshToken(user, tokens.refreshToken);
        this.sendTokens(res, tokens);
      } else {
        // время не вышло отправляю в куки accessToken
        res.cookie('accessToken', tokens.accessToken, { secure: true });
      }
      // устанавливаю сессию и отправляю данные пользователя
      this.sesionsService.handleSession(req, res, user);
      user.token = null;

      res.send(user);
    } else {
      res.send({ message: 'Пользователь по id не найден' });
    }
  }

  // Определить пользователя
  // Ищем в БД, если нет создаем
  // устанавливаем токены и сессию
  async handleUser(
    userRequest: UserDto,
    req: Request,
    res: Response,
    yaProvider?: boolean,
  ) {
    let userData: AuthDto;
    // проверяем по телефону в БД
    const user: UserDto = await this.userModal.findOne({
      phoneNumber: userRequest.phoneNumber,
    });

    // Если есть, генерируем токены, обновляем в БД токен и создаем сессию
    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );
      userData = { user, tokens };
      await this.tokensService.updateRefreshToken(user, tokens.refreshToken);

      this.sesionsService.handleSession(req, res, user, yaProvider);
      // Если нет создаем все
    } else {
      const newUserData = await this.createUser(userRequest);

      if (newUserData.user) {
        userData = newUserData;
        this.sesionsService.handleSession(req, res, userData.user, yaProvider);
      }
    }
    // Возвращаем токены и пользователя
    return userData;
  }

  sendTokens(res: Response, tokens: TokensDto) {
    res.cookie('accessToken', tokens.accessToken, { secure: true });
    res.cookie('refreshToken', tokens.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 68 * 24 * 1000 * process.env.TIME_REFRESH,
    });
  }

  // Создание пользователя
  private async createUser(user: UserDto) {
    // Добавляем в БД доп. инфо
    user._id = uuidv4();
    user.createDate = new Date();

    const tokens = await this.tokensService.getTokens(
      user._id,
      user.phoneNumber,
    );
    user.token = {
      refreshToken: tokens.refreshToken,
      createToken: new Date(),
    };

    const newUser = new this.userModal(user);

    await newUser.save();

    return { user: newUser, tokens };
  }

  // Выход
  async signout(req: Request, res: Response) {
    res.clearCookie('__Host-psifi.x-csrf-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ status: 'success' });
  }
}
