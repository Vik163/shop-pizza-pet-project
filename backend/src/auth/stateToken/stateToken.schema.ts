import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StateTokenDocument = HydratedDocument<StateToken>;

@Schema()
export class StateToken {
  @Prop()
  state: string;
}

export const StateTokenSchema = SchemaFactory.createForClass(StateToken);
