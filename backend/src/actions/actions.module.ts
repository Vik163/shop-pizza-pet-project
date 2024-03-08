import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActionsController } from './actions.controller';
import { ActionsService } from './actions.service';
import { Actions, ActionsSchema } from './schema/actions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Actions.name, schema: ActionsSchema }]),
  ],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
