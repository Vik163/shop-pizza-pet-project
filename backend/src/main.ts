import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { doubleCsrfProtection } from '../csrf.config';
import * as passport from 'passport';
import { Strategy as YandexStrategy } from 'passport-yandex';

import { AppModule } from './app.module';

// https сертификаты
const httpsOptions = {
  key: readFileSync('./security/pizzashop163.ru+4-key.pem'),
  cert: readFileSync('./security/pizzashop163.ru+4.pem'),
};
const option = ['https://pizzashop163.ru, https://127.0.0.1:3000'];

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.YA_CLIENT_ID,
      clientSecret: process.env.YA_CLIENT_SECRET,
      callbackURL: 'https://pizzashop163.ru',
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        // To keep the example simple, the user's Yandex profile is returned
        // to represent the logged-in user.  In a typical application, you would
        // want to associate the Yandex account with a user record in your
        // database, and return that user instead.
        return done(null, profile);
      });
    },
  ),
);

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
      name: 'session',
      secret: 'this is a secret msg',
      resave: false,
      saveUninitialized: false,
      cookie: {},
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
