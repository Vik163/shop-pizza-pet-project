import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('/csrf')
export class CsrfController {
  constructor() {}

  @Get()
  async getCsrfToken(@Req() req: Request, @Res() res: Response) {
    const csrf = req.csrfToken(true);

    res.send({ csrf: csrf });
  }
}
