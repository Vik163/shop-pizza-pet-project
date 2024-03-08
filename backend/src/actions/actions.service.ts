import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Actions, ActionsDocument } from './schema/actions.schema';
import { ActionsDto } from './dto/actions.dto';

@Injectable()
export class ActionsService {
  constructor(
    @InjectModel(Actions.name)
    private readonly actionsModel: Model<ActionsDocument>,
  ) {}

  async getActions(): Promise<ActionsDto[]> {
    return await this.actionsModel.find().exec();
  }
}
