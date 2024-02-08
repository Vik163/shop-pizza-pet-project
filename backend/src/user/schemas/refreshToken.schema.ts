import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<RefreshTokenData>;

@Schema()
export class RefreshTokenData {
  @Prop()
  createToken: Date;
  @Prop()
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(RefreshTokenData);
