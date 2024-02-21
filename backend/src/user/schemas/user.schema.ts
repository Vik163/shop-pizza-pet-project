import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Birthday, Roles } from '../dto/user.dto';
import { RefreshTokenData } from './refreshToken.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: string;
  @Prop()
  createDate?: Date;
  @Prop()
  name: string;
  @Prop({ type: Object })
  birthday?: Birthday;
  @Prop()
  role?: Roles;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
  @Prop()
  refreshTokenData: RefreshTokenData;
}

export const UserSchema = SchemaFactory.createForClass(User);
