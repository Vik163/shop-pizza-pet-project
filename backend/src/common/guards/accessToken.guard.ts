import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  // добавляется по надобности
  handleRequest(err: any, user: any, info: any, status: any) {
    console.log('status:', status.getResponse().statusCode);
    console.log('info:', info);
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.log('AccessTokenGuard', err);
      status.getResponse().statusCode = 401;
      console.log('status:', status.getResponse().statusCode);
      // return status;

      throw err || new UnauthorizedException('lkerjdig');
    }
    return user;
  }
}
