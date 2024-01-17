import { Module } from '@nestjs/common';
import { FirebaseAdmin } from 'firebaseconfig/firebase.setup';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({
      session: true,
    }),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAdmin, UserSerializer, LocalStrategy],
})
export class AuthModule {}
