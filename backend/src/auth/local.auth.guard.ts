import {
  ExecutionContext,
  Injectable,
  //   UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context);

    // await super.canActivate(context);
    // console.log('context');

    const request = context.switchToHttp().getRequest() as Request;
    console.log('LocalAuthGuard', request.headers);

    await super.logIn(request);

    return true;
  }
}
