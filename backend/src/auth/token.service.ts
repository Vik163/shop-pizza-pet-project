import { Inject, Injectable } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { UserDto } from 'src/user/dto/user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TokensService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async handleSession() {}
}
