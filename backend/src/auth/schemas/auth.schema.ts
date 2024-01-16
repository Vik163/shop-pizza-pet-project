import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Roles } from '../dto/auth.dto';

export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop()
  name: string;
  @Prop()
  role: Roles;
  @Prop()
  phoneNumber: string;
  @Prop()
  email: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
