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
import { AuthProvidersService } from './authProviders.service';
import { TokensService } from './token.service';
import { RefreshToken } from 'src/common/decorators/refreshToken.decorator';

// import { LocalAuthGuard } from './local.auth.guard';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(
    private readonly userService: AuthService,
    private readonly authProvidersService: AuthProvidersService,
    private readonly tokensService: TokensService,
  ) {}

  @Get('auth/:id')
  async getInitialUserById(
    @Param('id') id: string,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    await this.userService.getInitialUserById(id, req, res);
  }

  @RefreshToken()
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this.tokensService.refreshTokens(userId, refreshToken);
  }

  // @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))

  @Get('yandex')
  async authUserByYandex(@Res() res: Response, @Req() req: Request) {
    await this.authProvidersService.authUserByYandex(req, res);
  }

  @Post('firebase')
  async authUserByFirebase(
    @Body(ValidationPipe) userRequest: UserDto,
    @Req() req: Request,
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Res() res: Response,
  ) {
    await this.authProvidersService.authUserByFirebase(userRequest, req, res);
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
