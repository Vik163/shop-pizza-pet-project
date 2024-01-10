import { Controller, Post, Body, Get, Param, Req, Res } from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// import * as passport from 'passport';
// import { Strategy } from 'passport-yandex';
// import { PassportStrategy } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  // получаем пользователя по id (firebase) из localstorage и создаем сессионный куки
  @Get('auth/:id')
  async getInitialUserById(
    @Param('id') id: string,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    // отправляю user в _setTokens (auth.service)
    await this.userService.getInitialUserById(id, req, res);
  }

  @Get('yandex')
  async getUserYandex(@Res() res: Response, @Req() req: Request) {
    await this.userService.getUserYandex(req, res);
  }

  @Post('auth')
  signup(
    @Body() authRequest: AuthDto,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    // отправляю user в _setTokens (auth.service)
    this.userService.createUser(authRequest, req, res);
  }

  @Get('signout')
  async signout(
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    res.clearCookie('sessionToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.clearCookie('__Host-psifi.x-csrf-token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    // res.clearCookie('accessToken', {
    //   sameSite: 'strict',
    //   secure: true,
    // });
    res.send({ status: 'success' });
  }
}
