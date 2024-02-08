import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TokensService } from './token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthProvidersService {
  constructor(
    @InjectModel(User.name)
    private readonly authService: AuthService,
    private readonly tokensService: TokensService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
            const { tokens } = await this.authService.handleUser(
              userYaData,
              req,
              res,
              yaProvider,
            );
            // Отправка данных клиенту в сессиях (переадресация)
            this.tokensService.sendTokens(res, tokens);
          }
        }
      }
    }
  }

  // Авторизация через Firebase ================================================
  async authUserByFirebase(userRequest: UserDto, req: Request, res: Response) {
    const { user, tokens } = await this.authService.handleUser(
      userRequest,
      req,
      res,
    );
    user.refreshTokenData = null;

    this.tokensService.sendTokens(res, tokens);
    res.send(user);
  }
}
