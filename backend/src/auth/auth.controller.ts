import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Res,
  // Redirect,
} from '@nestjs/common';
// npm install node-fetch@2; import fetch from 'node-fetch';
import fetch from 'node-fetch';
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
  // @Redirect('https://docs.nestjs.com', 302)
  async get(@Res() res: Response, @Req() req: Request) {
    const code = req.headers.code;
    if (code) {
      const clientId = process.env.YA_CLIENT_ID;
      const clientSecret = process.env.YA_CLIENT_SECRET;
      const body = `grant_type=authorization_code&code=${code}&client_id=${clientId}&client_secret=${clientSecret}`;
      const response = await fetch('https://oauth.yandex.ru/token', {
        method: 'POST',
        body: body,
      });

      const data = await response.json();
      console.log(data);
    }
    console.log(code);

    // res.send(passYa);
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
