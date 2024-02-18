import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserDto } from 'src/user/dto/user.dto';
import session from 'express-session';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

type TSess = session.Session & Partial<session.SessionData>;
interface ISession extends TSess {
  userId?: string;
  visits?: number;
  provider?: string;
  sessId?: string;
  csrf?: string;
}

@Injectable()
export class SessionsService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async handleSession(
    req: Request,
    res: Response,
    user: UserDto,
    yaProvider?: boolean,
  ) {
    const csrf = req.csrfToken();
    console.log('csrf:', csrf);
    // console.log('sess:', req.cookies['__Host-psifi.x-csrf-token']);

    const sess: ISession = req.session;
    // sess.csrf = csrf;
    if (yaProvider) {
      const sessId = (await this.cacheManager.get('sessionId')) as string;
      if (sessId) {
        req.sessionStore.get(sessId, async (err, session: ISession) => {
          // console.log('errget', err);
          if (session) {
            session.userId = user._id;
            session.sessId = sessId;
            session.visits = session.visits ? session.visits + 1 : 1;
            session.provider = 'yandex';

            req.sessionStore.set(sessId, session, () => {
              // console.log('errset', err);
            });
            req.sessionStore.destroy(req.session.id, async () => {
              // console.log('errdestroy', err);
              await this.cacheManager.del('sessionId');

              res.cookie('__Host-psifi.x-csrf-token', csrf, {
                path: '/',
                sameSite: true, // Recommend you make this strict if posible
                secure: true,
              });

              res.redirect(
                `https://pizzashop163.ru?user=${JSON.stringify(user)}`,
              );
            });
          } else {
            this._updateSession(res, sess, user, csrf, yaProvider);
          }
        });
      } else {
        this._updateSession(res, sess, user, csrf, yaProvider);
      }
    } else {
      this._updateSession(res, sess, user, csrf);
    }
  }

  _updateSession(
    res: Response,
    sess: ISession,
    user: UserDto,
    csrf: string,
    yaProvider?: boolean,
  ) {
    sess.userId = user._id;
    sess.sessId = sess.id;
    sess.visits = sess.visits ? sess.visits + 1 : 1;

    sess.provider = yaProvider ? 'yandex' : 'firebase';
    sess.save();

    res.cookie('__Host-psifi.x-csrf-token', csrf, {
      path: '/',
      sameSite: true, // Recommend you make this strict if posible
      secure: true,
    });

    yaProvider &&
      res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`);
  }
}
