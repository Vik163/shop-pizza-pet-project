import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { APP_GUARD } from '@nestjs/core';

import { PizzaModule } from './products/pizzas/pizza.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // вместо localhost 127.0.0.1
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../public/images'),
    }),
    PizzaModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
