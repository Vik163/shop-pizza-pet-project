import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/user/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

type TSess = session.Session & Partial<session.SessionData>;
interface ISession extends TSess {
  userId?: string;
  visits?: number;
  provider?: string;
  pro?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async _setSession(
    req: Request,
    res: Response,
    user: UserDto,
    yaAuth?: boolean,
  ) {
    console.log('setSession user', user);

    const sess: ISession = req.session;
    const sessYaAuth = (await this.cacheManager.get('sessionId')) as string;
    if (sessYaAuth) {
      console.log('sessYaAuth:', sessYaAuth);
      req.sessionStore.get(sessYaAuth, (err, session: ISession) => {
        console.log('errget', err);
        console.log('session:', session);

        if (session) {
          req.sessionStore.set(req.sessionID, session, (err) => {
            console.log('errset', err);
          });
          req.sessionStore.destroy(sessYaAuth, (err?: any) => {
            console.log('errdestroy', err);
          });
          console.log(session);
        }
      });
      sess.userId = user._id;
      sess.visits = sess.visits ? sess.visits + 1 : 1;
      sess.provider = 'yandex';
      sess.save();
      res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`);
    } else {
      console.log('sess.id', sess.id);
      sess.userId = user._id;
      sess.visits = sess.visits ? sess.visits + 1 : 1;

      if (yaAuth) {
        sess.provider = 'yandex';
        sess.save();

        res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`);
      } else {
        sess.pro = 'jhsudllkm;lk';

        sess.provider = 'firebase';
        sess.save();

        res.send(user);
      }
    }
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user = await this.userModal.findById(id);

    user
      ? this._setSession(req, res, user)
      : res.send({ message: 'Пользователь по id не найден' });
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async _getInitialUserByPhone(phone: string) {
    const user = await this.userModal.findOne({ phoneNumber: phone });

    return user;
  }

  async authUserByYandex(req: Request, res: Response) {
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

          const userYaData = userYaDataFull && {
            yaAuth: true,
            email: userYaDataFull.default_email,
            phoneNumber: userYaDataFull.default_phone.number,
            // role: Roles.CLIENT,
          };

          if (userYaData) {
            await this.createUser(userYaData, req, res);
          }
        }
      }
    }
  }

  async createUser(userRequest: UserDto, req: Request, res: Response) {
    // Ищем в БД, если нет создаем, если есть устанавливаем токены
    const user = await this._getInitialUserByPhone(userRequest.phoneNumber);

    if (user) {
      this._setSession(req, res, user, userRequest.yaAuth);

      // if (userRequest.yaAuth) {
      // } else {
      //   this._setSession(req, res, user);
      // }
    } else {
      userRequest._id = uuidv4();
      const newUser = new this.userModal(userRequest);
      newUser && this._setSession(req, res, newUser, userRequest.yaAuth);

      return await newUser.save();
    }
    return user;
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
