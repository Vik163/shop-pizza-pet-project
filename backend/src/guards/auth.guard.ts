import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Request } from 'express';

import { FirebaseAdmin } from '../../firebaseconfig/firebase.setup';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly admin: FirebaseAdmin,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.admin.setup();
    const req = context.switchToHttp().getRequest();
    // const idToken = context.getArgs()[0]?.headers?.authorization;
    // console.log(req.cookies);

    try {
      // Rsession - имя токена
      const sessionCookie = req.cookies.sessionToken || '';
      if (!sessionCookie) {
        console.log('!sessionCookie');
      }
      const claims = await app.auth().verifySessionCookie(sessionCookie, true);
      // const claims = await app.auth().verifyIdToken(idToken);

      // if (claims.role === permissions[0]) {
      //   return true;
      // }
      if (claims) return true;

      // throw new UnauthorizedException();
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
