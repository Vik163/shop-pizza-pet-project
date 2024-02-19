import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { validateRequest } from 'src/csrf/config/csrf.config';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    console.log('req:', req.headers);

    // Guard against CSRF attacks.
    // Проверяю валидацию токена csrf.
    const isValidateCsrf = validateRequest(req);
    if (!isValidateCsrf) {
      throw new UnauthorizedException('Запрос неавторизованного пользователя!');
    }
    return isValidateCsrf;
  }
}
