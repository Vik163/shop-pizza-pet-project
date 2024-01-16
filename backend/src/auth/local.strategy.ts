import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    //   {
    //     usernameField: 'email'
    // }
  }

  // вызывается автоматически passport при запросе аутентификации
  async validate(phone: string): Promise<any> {
    console.log('i');

    const user = await this.authService._getInitialUserByPhone(phone);
    console.log('LocalStrategy', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
