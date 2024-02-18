import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as csurf from 'csurf';
import * as passport from 'passport';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MongoStore = require('connect-mongo');

// https сертификаты
const httpsOptions = {
  key: readFileSync('./security/pizzashop163.ru+4-key.pem'),
  cert: readFileSync('./security/pizzashop163.ru+4.pem'),
};
const option = ['https://pizzashop163.ru, https://127.0.0.1:3000'];

const expiresIn = 60 * 60 * 24 * 1000 * 30;

async function bootstrap() {
  // c https
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors({
    origin: option,
    methods: 'HEAD,PUT,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
        // 30 дней
        ttl: 30 * 24 * 60 * 60,
      }),
      name: 'sessPizza',
      secret: process.env.SESSION_SECRET_KEY || 'this is a secret msg',
      // указывает, нужно ли пересохранять сессию в хранилище, если она не изменилась (по умолчанию false);
      resave: false,
      // если true, то в хранилище будут попадать пустые сессии;
      saveUninitialized: false,
      cookie: {
        secure: true,
        signed: true,
        sameSite: 'strict',
        // 30 дней
        maxAge: expiresIn,
      },
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  // csrf ?? спорный, лучше не нашел
  // куки обновляются вместе с установкой сессии (секрет попадает в сессию)
  app.use(
    csurf(),
    //   {
    //   cookie: false,
    //   // value: (req) => req.cookies['__Host-psifi.x-csrf-token'],
    //   // cookie: {
    //   //   key: '__Host-psifi.x-csrf-token',
    //   //   secure: true,
    //   //   sameSite: 'strict',
    //   // },
    // }
  );

  app.use(passport.initialize());

  await app.listen(8000);
  console.log('server listen port 8000');
}
bootstrap();
