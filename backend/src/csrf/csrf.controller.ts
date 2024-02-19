import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/csrf')
export class CsrfController {
  constructor() {}

  @Get()
  async csrf(
    // если res, то отправка через res.send(), иначе не возвращает значение
    @Req() req: Request,
    // @Res() res: Response,
  ): Promise<string> {
    const csrf = req.csrfToken(true);
    return csrf;
  }
}
