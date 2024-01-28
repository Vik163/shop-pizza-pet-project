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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly sesionsService: SessionsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
        console.log(data);
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
            await this.handleUser(userYaData, req, res, yaProvider);
          }
        }
      }
    }
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user = await this.userModal.findById(id);

    user
      ? this.sesionsService.handleSession(req, res, user)
      : res.send({ message: 'Пользователь по id не найден' });
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async _getInitialUserByPhone(phone: string) {
    const user = await this.userModal.findOne({ phoneNumber: phone });

    return user;
  }

  async handleUser(
    userRequest: UserDto,
    req: Request,
    res: Response,
    yaProvider?: boolean,
  ) {
    // Ищем в БД, если нет создаем, если есть, устанавливаем токены и сессию
    const user = await this._getInitialUserByPhone(userRequest.phoneNumber);

    if (user) {
      this.sesionsService.handleSession(req, res, user, yaProvider);
    } else {
      userRequest._id = uuidv4();
      const newUser = new this.userModal(userRequest);
      newUser &&
        this.sesionsService.handleSession(req, res, newUser, yaProvider);

      return await newUser.save();
    }
  }

  async signout(req: Request, res: Response) {
    res.clearCookie('__Host-psifi.x-csrf-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.send({ status: 'success' });
  }
}
