import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';

import { PizzaModule } from './products/pizzas/pizza.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CsrfModule } from './csrf/csrf.module';

@Module({
  imports: [
    // вместо localhost 127.0.0.1
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/storedb'),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../public/images'),
    }),
    PizzaModule,
    UserModule,
    AuthModule,
    CsrfModule,
  ],
})
export class AppModule {}
