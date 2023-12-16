import { Controller, Post, Body, Get, Param, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  // получаем пользователя по id (firebase) из localstorage и создаем сессионный куки
  @Get(':id')
  async getInitialUserById(
    @Param('id') id: string,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    await this.userService.getInitialUserById(id, req, res);
  }

  @Post()
  signup(@Body() authRequest: AuthDto) {
    return this.userService.createUser(authRequest);
  }
}
