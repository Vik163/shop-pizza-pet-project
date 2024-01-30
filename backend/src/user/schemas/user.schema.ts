import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from '../dto/user.dto';
import { Token } from './token.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id?: string;
  @Prop()
  createDate?: Date;
  @Prop()
  name: string;
  @Prop()
  role?: Roles;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
  @Prop()
  token: Token;
}

export const UserSchema = SchemaFactory.createForClass(User);
