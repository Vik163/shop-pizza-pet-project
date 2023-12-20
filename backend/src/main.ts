import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { doubleCsrfProtection } from '../csrf.config';

import { AppModule } from './app.module';

// https сертификаты
const httpsOptions = {
  key: readFileSync('./security/cert.key'),
  cert: readFileSync('./security/cert.pem'),
};
const option = ['https://localhost:3000'];

async function bootstrap() {
  // c https
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: option,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    session({
      name: 'session',
      secret: 'this is a secret msg',
      resave: false,
      saveUninitialized: false,
      cookie: {},
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.use(doubleCsrfProtection);

  await app.listen(3001);
  console.log('server listen port 3001');
}
bootstrap();
