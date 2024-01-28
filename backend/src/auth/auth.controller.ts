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

// import { LocalAuthGuard } from './local.auth.guard';
// import { AuthGuard } from '@nestjs/passport';

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

  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))

  @Get('yandex')
  async authUserByYandex(@Res() res: Response, @Req() req: Request) {
    await this.userService.authUserByYandex(req, res);
  }

  @Post('firebase')
  async handleUser(
    @Body(ValidationPipe) userRequest: UserDto,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    // отправляю user в _setTokens (auth.service)
    await this.userService.handleUser(userRequest, req, res);
  }

  @Get('signout')
  async signout(
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    await this.userService.signout(req, res);
  }
}
