import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/user/schemas/user.schema';
// import { User } from 'src/user/schemas/user.schema';
@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: any) {
    console.log(user);
    done(null, user.name);
  }

  deserializeUser(username: string, done: any) {
    // const user = this.authService.findByUsername(username);

    if (!username) {
      return done(
        `Could not deserialize user: user with ${username} could not be found`,
        null,
      );
    }

    done(null, username);
  }
}
