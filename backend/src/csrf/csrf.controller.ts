import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/guard')
export class CsrfController {
  constructor() {}

  @Get()
  async getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const csrf = req.csrfToken(true);

    // res.cookie('XSRF-TOKEN', csrf, {
    //   httpOnly: false,
    //   secure: true,
    //   sameSite: 'strict',
    // });

    // Подтвердить отправку куки иначе не отправиться
    res.send({ guard: csrf });
  }
}
