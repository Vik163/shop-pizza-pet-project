import { Module } from '@nestjs/common';
import { FirebaseAdmin } from 'firebaseconfig/firebase.setup';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';
import { SessionsService } from './sessions.service';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './token.service';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UserService } from 'src/user/user.service';
import { AuthProvidersService } from './authProviders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      session: true,
    }),
    // объект пустой, так как ключ не один
    JwtModule.register({}),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthProvidersService,
    FirebaseAdmin,
    SessionsService,
    TokensService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UserService,
  ],
})
export class AuthModule {}
