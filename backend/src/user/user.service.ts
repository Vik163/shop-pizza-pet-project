import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FirebaseAdmin } from '../../firebaseconfig/firebase.setup';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<UserDocument>,
    private readonly admin: FirebaseAdmin,
  ) {}

  async getUser() {
    // const { email, phoneNumber, name, role } = userRequest;
    // const app = this.admin.setup();
    // console.log(app.auth().listUsers());
    return this.userModal.find().exec();
  }

  // async getUserById(id: string, req: Request, res: Response) {
  //   const app = this.admin.setup();
  //   console.log(app.auth());

  //   const idToken = req.headers.authorization;

  //   const csrfToken = req.body.csrfToken.toString();
  //   console.log(req.body);
  //   // Guard against CSRF attacks.
  //   if (csrfToken !== req.cookies.csrfToken) {
  //     res.status(401).send('UNAUTHORIZED REQUEST!');
  //     return;
  //   }
  //   // Set session expiration to 5 days.
  //   const expiresIn = 60 * 60 * 24 * 5 * 1000;
  //   // Create the session cookie. This will also verify the ID token in the process.
  //   // The session cookie will have the same claims as the ID token.
  //   // To only allow session cookie setting on recent sign-in, auth_time in ID token
  //   // can be checked to ensure user was recently signed in before creating a session cookie.
  //   app
  //     .auth()
  //     .createSessionCookie(idToken, { expiresIn })
  //     .then(
  //       (sessionCookie) => {
  //         console.log(sessionCookie);
  //         // Set cookie policy for session cookie.
  //         const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  //         res.cookie('Tsession', sessionCookie, options);
  //         res.end(JSON.stringify({ status: 'success' }));
  //       },
  //       (error) => {
  //         res.status(401).send('UNAUTHORIZED REQUEST!');
  //       },
  //     );

  //   return this.userModal.findById(id);
  // }

  // async getUserById(id: string) {
  //   const app = this.admin.setup();

  //   console.log(app.auth().);
  //   return this.userModal.findById(id);
  // }

  // async createUser(userRequest: UserDto) {
  //   // добавляю в firebase роль
  //   const app = this.admin.setup();
  //   app.auth().setCustomUserClaims(userRequest._id, { role: userRequest.role });

  //   const newUser = new this.userModal(userRequest);
  //   return newUser.save();

  //   // try {
  //   //   const createdUser = await app.auth().createUser({
  //   //     email,
  //   //     phoneNumber,
  //   //     displayName: name,
  //   //   });
  //   //   console.log(createdUser);
  //   //   await app.auth().setCustomUserClaims(createdUser.uid, { role });
  //   //   return createdUser;
  //   // } catch (error) {
  //   //   console.log(error);
  //   //   throw new BadRequestException(error.message);
  //   // }
  // }
}
