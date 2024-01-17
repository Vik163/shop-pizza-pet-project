import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { doubleCsrfProtection } from '../csrf.config';
import * as passport from 'passport';
import { AppModule } from './app.module';

// https сертификаты
const httpsOptions = {
  key: readFileSync('./security/pizzashop163.ru+4-key.pem'),
  cert: readFileSync('./security/pizzashop163.ru+4.pem'),
};
const option = ['https://pizzashop163.ru, https://127.0.0.1:3000'];

// const expiresIn = 60 * 60 * 24 * 1000;

async function bootstrap() {
  // c https
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: option,
    methods: 'HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    session({
      name: 'sessPizza',
      secret: 'this is a secret msg',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.use(doubleCsrfProtection);
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8000);
  console.log('server listen port 8000');
}
bootstrap();
