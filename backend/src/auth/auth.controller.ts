import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Res,
  ValidationPipe,
  // UseGuards,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { StateTokenService } from './stateToken/stateToken.service';
// import { LocalAuthGuard } from './local.auth.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: AuthService,
    private readonly stateTokenService: StateTokenService,
  ) {}

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

  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Get('yatoken')
  async stateYandex(@Res() res: Response, @Req() req: Request) {
    await this.stateTokenService.setStateYandex(req);
  }

  @Get('yandex')
  async authUserByYandex(@Res() res: Response, @Req() req: Request) {
    await this.userService.authUserByYandex(req, res);
  }

  @Post('firebase')
  async createUser(
    @Body(ValidationPipe) userRequest: UserDto,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    // отправляю user в _setTokens (auth.service)
    await this.userService.createUser(userRequest, req, res);
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
    res.send({ status: 'success' });
  }
}
