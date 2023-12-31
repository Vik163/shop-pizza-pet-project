import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Permissions } from '../dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  role: Permissions;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
