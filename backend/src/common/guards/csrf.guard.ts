import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { validateRequest } from '../../../csrf.config';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Guard against CSRF attacks.
    // Проверяю валидацию токена csrf.
    const isValidateCsrf = validateRequest(req);
    if (!isValidateCsrf) {
      throw new UnauthorizedException('Запрос неавторизованного пользователя!');
    }
    return isValidateCsrf;
  }
}
