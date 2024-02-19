import { applyDecorators, UseGuards } from '@nestjs/common';
import { CsrfGuard } from '../guards/csrf.guard';

export function Csrf() {
  return applyDecorators(UseGuards(CsrfGuard));
}
