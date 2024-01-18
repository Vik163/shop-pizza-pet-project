import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FirebaseAdmin } from '../../firebaseconfig/firebase.setup';
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
  ertu?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly admin: FirebaseAdmin,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // создаем сессионный куки по accessToken полученному из firebase клиента
  async _setTokens(req: Request, res: Response, user: User) {
    const app = this.admin.setup();

    console.log('setTokens user', user);
    const sess: ISession = req.session;
    console.log('visits', sess.visits);
    req.sessionStore.clear();
    sess.userId = user._id;
    sess.visits = sess.visits ? sess.visits + 1 : 1;

    // sess.save();
    // console.log(sess);

    // console.log('sessionID', req.sessionID);
    // console.log('sessionStore', req.sessionStore);

    const idToken = req.headers.authorization;
    // console.log('idToken', idToken);

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    if (idToken) {
      app
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
          (sessionCookie) => {
            console.log('sessionCookie', sessionCookie);
            // Set cookie policy for session cookie.
            const options = { maxAge: expiresIn, httpOnly: true, secure: true };
            res.cookie('sessionToken', sessionCookie, options);
            res.end(JSON.stringify(user));
          },
          (error) => {
            console.log(error);

            res.status(401).send('Пользователь не авторизован!');
          },
        );
    }
  }

  // получаем пользователя по id (firebase) и создаем сессионный куки или возвращаем "не найден"
  async getInitialUserById(id: string, req: Request, res: Response) {
    console.log('getInitialUserById', id);
    const user = await this.userModal.findById(id);

    user
      ? this._setTokens(req, res, user)
      : res.send({ message: 'Id Пользователь не найден' });
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
          // console.log('userYaDataFull', userYaDataFull);
          // console.log('data', data);

          const userYaData = userYaDataFull && {
            email: userYaDataFull.default_email,
            phoneNumber: userYaDataFull.default_phone.number,
            // role: Roles.CLIENT,
          };

          if (userYaData) {
            const newUser = await this.createUser(userYaData, req, res);

            if (newUser) {
              res.redirect(
                `https://pizzashop163.ru?user=${JSON.stringify(newUser)}`,
              );
            }
          }
        }
      }
    }
  }

  async createUser(userRequest: UserDto, req: Request, res: Response) {
    // добавляю в firebase роль
    // const app = this.admin.setup();
    // if (app && userId)
    //   app.auth().setCustomUserClaims(userId, { role: userRequest.role });

    // Ищем в БД, если нет создаем, если есть устанавливаем токены
    const user = await this._getInitialUserByPhone(userRequest.phoneNumber);

    if (user) {
      this._setTokens(req, res, user);
    } else {
      userRequest._id = uuidv4();
      const newUser = new this.userModal(userRequest);
      newUser && this._setTokens(req, res, newUser);

      return await newUser.save();
    }
    return user;
  }

  // async signout(req: Request, res: Response) {
  //}
}
