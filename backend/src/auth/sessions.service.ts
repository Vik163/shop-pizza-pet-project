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
    const sess: ISession = req.session;
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
              res.redirect(
                `https://pizzashop163.ru?user=${JSON.stringify(user)}`,
              );
            });
          } else {
            this._updateSession(res, sess, user, yaProvider);
          }
        });
      } else {
        this._updateSession(res, sess, user, yaProvider);
      }
    } else {
      this._updateSession(res, sess, user);
    }
  }

  _updateSession(
    res: Response,
    sess: ISession,
    user: UserDto,
    yaProvider?: boolean,
  ) {
    sess.userId = user._id;
    sess.sessId = sess.id;
    sess.visits = sess.visits ? sess.visits + 1 : 1;

    sess.provider = yaProvider ? 'yandex' : 'firebase';
    sess.save();

    yaProvider
      ? res.redirect(`https://pizzashop163.ru?user=${JSON.stringify(user)}`)
      : res.send(user);
  }
}
