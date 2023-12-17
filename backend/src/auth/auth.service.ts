import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { User, UserDocument } from './schemas/auth.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FirebaseAdmin } from '../../firebaseconfig/firebase.setup';
import { Model } from 'mongoose';
// import { validateRequest } from '../../csrf.config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}

  // создаем сессионный куки по accessToken полученному из firebase клиента
  async _setTokens(req, res, user: User) {
    const app = this.admin.setup();

    const idToken = req.headers.authorization;

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    app
      .auth()
      .createSessionCookie(idToken, { expiresIn })
      .then(
        (sessionCookie) => {
          // Set cookie policy for session cookie.
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };
          res.cookie('sessionToken', sessionCookie, options);
          res.send(user);
        },
        () => {
          res.status(401).send('Пользователь не авторизован!');
        },
      );
  }

  // получаем пользователя по id (firebase) из localstorage и создаем сессионный куки
  async getInitialUserById(id: string, req: Request, res: Response) {
    const user = await this.userModal.findById(id);

    user && this._setTokens(req, res, user);
  }

  async createUser(userRequest: AuthDto) {
    console.log(userRequest);
    // добавляю в firebase роль
    const app = this.admin.setup();
    app.auth().setCustomUserClaims(userRequest._id, { role: userRequest.role });

    const newUser = new this.userModal(userRequest);
    console.log(newUser);
    return newUser.save();

    // try {
    //   const createdUser = await app.auth().createUser({
    //     email,
    //     phoneNumber,
    //     displayName: name,
    //   });
    //   console.log(createdUser);
    //   await app.auth().setCustomUserClaims(createdUser.uid, { role });
    //   return createdUser;
    // } catch (error) {
    //   console.log(error);
    //   throw new BadRequestException(error.message);
    // }
  }
}
