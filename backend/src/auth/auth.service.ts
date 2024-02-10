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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly sesionsService: SessionsService,
    private readonly tokensService: TokensService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // получаем пользователя по id или возвращаем "не найден"
  // получаем время хранения =====================================================
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user: UserDto = await this.userModal.findById(id);

    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );

      const timeToken = this.tokensService.handleTimeToken(
        user.refreshTokenData.createToken,
      );
      // время вышло => обновляем токен в БД и отправляем токены в куки
      if (timeToken > process.env.TIME_REFRESH - 2) {
        await this.tokensService.updateRefreshToken(user, tokens.refreshToken);
        this.tokensService.sendTokens(res, tokens);
      } else {
        // время не вышло отправляю в куки accessToken
        res.cookie('accessToken', tokens.accessToken, { secure: true });
      }
      // устанавливаю сессию и отправляю данные пользователя
      this.sesionsService.handleSession(req, res, user);
      user.refreshTokenData = null;

      res.send(user);
    } else {
      res.send({ message: 'Пользователь по id не найден' });
    }
  }

  // Авторизация через Яндекс ======================================================
  async authUserByYandex(req: Request, res: Response) {
    // сохраняю в кеше значение сессионого id и  state -----------------------------
    // приходят два запроса первый с id и state, второй undefined (из-за переадресации)
    const sessPizzaId = req.cookies.sessPizza;
    const sessId = sessPizzaId && sessPizzaId.split(':')[1].split('.')[0];
    sessId && (await this.cacheManager.set('sessionId', sessId));

    const token = {
      state: req.headers['x-yandex-state'] as string,
    };
    token.state && (await this.cacheManager.set('state', token.state));
    // --------------------------------------------------------------------

    if (req.url.length > 10) {
      // получение кода и токена из query параметров
      const code = req.query.code;
      const stateQuery = req.query.state;

      // верификация state при сравнении с state из кеша
      const stateHeaders = await this.cacheManager.get('state');
      const state = stateHeaders === stateQuery;

      if (code && state) {
        await this.cacheManager.del('state');
        const clientSecret = process.env.YA_CLIENT_SECRET;
        const clientId = process.env.YA_CLIENT_ID;

        const body = `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}`;
        const response = await fetch('https://oauth.yandex.ru/token', {
          method: 'POST',
          body: body,
        });

        const data = await response.json();
        if (data.access_token) {
          const userYaDataResponse = await fetch(
            `https://login.yandex.ru/info?&format=json`,
            {
              method: 'GET',
              headers: { Authorization: `OAuth ${data.access_token}` },
            },
          );
          const userYaDataFull = await userYaDataResponse.json();
          // ---------------------------------------------------

          const userYaData = userYaDataFull && {
            email: userYaDataFull.default_email,
            phoneNumber: userYaDataFull.default_phone.number,
            // role: Roles.CLIENT,
          };
          const yaProvider = true;

          if (userYaData) {
            const { tokens } = await this.handleUser(
              userYaData,
              req,
              res,
              yaProvider,
            );
            console.log('userYaData:', userYaData);

            // Отправка данных клиенту в сессиях (переадресация)
            this.tokensService.sendTokens(res, tokens);
          }
        }
      }
    }
  }

  // Определить пользователя
  // Ищем в БД, если нет создаем
  // устанавливаем токены и сессию ===========================================
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
    console.log('user:', user);
    if (user) {
      const tokens = await this.tokensService.getTokens(
        user._id,
        user.phoneNumber,
      );

      await this.tokensService.updateRefreshToken(user, tokens.refreshToken);

      userData = { user, tokens };
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

  // Создание пользователя =====================================================
  private async createUser(user: UserDto) {
    // Добавляем в БД доп. инфо
    user._id = uuidv4();
    user.createDate = new Date();

    // генерирую токены
    const tokens = await this.tokensService.getTokens(
      user._id,
      user.phoneNumber,
    );

    // хешируем refresh и создаем user.refreshTokenData для БД
    const hashedRefreshToken = await this.tokensService.hashData(
      tokens.refreshToken,
    );
    user.refreshTokenData = {
      refreshToken: hashedRefreshToken,
      createToken: new Date(),
    };

    const newUser = new this.userModal(user);

    await newUser.save();

    return { user: newUser, tokens };
  }

  // Выход ===================================================================
  async signout(req: Request, res: Response) {
    res.clearCookie('__Host-psifi.x-csrf-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.clearCookie('refreshToken', {
      secure: true,
      httpOnly: true,
      maxAge: 60 * 68 * 24 * 1000 * process.env.TIME_REFRESH,
    });
    res.clearCookie('accessToken', {
      secure: true,
    });
    res.send({ status: 'success' });
  }
}
