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

  async setSession(req: Request, res: Response, user: UserDto, ya?: boolean) {
    // console.log('setSession user', user);

    const sess: ISession = req.session;
    // console.log('req.session.id.service:', req.session.id);
    if (ya) {
      const sessOldYaId = (await this.cacheManager.get('sessionId')) as string;
      if (sessOldYaId) {
        req.sessionStore.get(sessOldYaId, async (err, session: ISession) => {
          console.log('errget', err);
          if (session) {
            session.userId = user._id;
            session.visits = session.visits ? session.visits + 1 : 1;
            session.provider = 'yandex';
            // console.log('sessOldYa:', session);

            console.log('sess.id.token', req.session.id);
            req.sessionStore.set(req.session.id, session, () => {
              // console.log('errset', err);
            });
            req.sessionStore.destroy(sessOldYaId, (err?: any) => {
              console.log('errdestroy', err);
            });
          }
        });

        res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`);
      } else {
        sess.userId = user._id;
        sess.visits = sess.visits ? sess.visits + 1 : 1;

        sess.provider = 'yandex';
        sess.save();
        res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`);
      }
      // Обновление новой сессии данными со старой (для яндекса из-за переадресации)
    } else {
      sess.userId = user._id;
      sess.visits = sess.visits ? sess.visits + 1 : 1;
      sess.pro = 'jhsudllkm;lk';

      sess.provider = 'firebase';
      sess.save();

      res.send(user);
    }
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user = await this.userModal.findById(id);

    user
      ? this.setSession(req, res, user)
      : res.send({ message: 'Пользователь по id не найден' });
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async _getInitialUserByPhone(phone: string) {
    const user = await this.userModal.findOne({ phoneNumber: phone });

    return user;
  }

  async authUserByYandex(req: Request, res: Response) {
    if (req.session.id) {
      req.sessionStore.get(req.session.id, async (err, session: ISession) => {
        // console.log('errget', err);
        if (session) {
          console.log('session:', req.session.id);
          const sessOldYaId = (await this.cacheManager.get(
            'sessionId',
          )) as string;
          if (!sessOldYaId)
            await this.cacheManager.set('sessionId', req.session.id);
        }
      });
    }

    const token = {
      state: req.headers['x-yandex-state'] as string,
    };
    // сохраняю в кеше
    token.state && (await this.cacheManager.set('state', token.state));
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
            ya: true,
            email: userYaDataFull.default_email,
            phoneNumber: userYaDataFull.default_phone.number,
            // role: Roles.CLIENT,
          };

          if (userYaData) {
            await this.cacheManager.del('sessionId');

            await this.createUser(userYaData, req, res);
          }

          // const userYaData = userYaDataFull && {
          //   session: sessOldYaId,
          //   email: userYaDataFull.default_email,
          //   phoneNumber: userYaDataFull.default_phone.number,
          //   // role: Roles.CLIENT,
          // };

          // if (userYaData) {
          //   await this.cacheManager.del('sessionId');

          //   await this.createUser(userYaData, req, res);
          // }
        }
      }
    }
  }

  async createUser(userRequest: UserDto, req: Request, res: Response) {
    // Ищем в БД, если нет создаем, если есть устанавливаем токены
    const user = await this._getInitialUserByPhone(userRequest.phoneNumber);

    if (user) {
      this.setSession(req, res, user, userRequest.ya);
    } else {
      userRequest._id = uuidv4();
      const newUser = new this.userModal(userRequest);
      newUser && this.setSession(req, res, newUser, userRequest.ya);

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
