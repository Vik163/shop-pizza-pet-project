import { Module } from '@nestjs/common';
import { FirebaseAdmin } from 'firebaseconfig/firebase.setup';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UserSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { StateTokenService } from './stateToken/stateToken.service';
import { StateToken, StateTokenSchema } from './stateToken/stateToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: StateToken.name, schema: StateTokenSchema },
    ]),
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseAdmin,
    UserSerializer,
    LocalStrategy,
    StateTokenService,
  ],
})
export class AuthModule {}
