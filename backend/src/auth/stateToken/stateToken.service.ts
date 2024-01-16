import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateTokenDocument } from './stateToken.schema';
import { StateToken } from './stateToken.schema';
import { StateTokenDto } from './stateToken.dto';

@Injectable()
export class StateTokenService {
  constructor(
    @InjectModel(StateToken.name)
    private readonly stateTokenModal: Model<StateTokenDocument>,
  ) {}

  async setStateYandex(req: Request) {
    const token: StateTokenDto = {
      state: req.headers['x-yandex-state'] as string,
    };
    const state = new this.stateTokenModal(token);
    return await state.save();
  }

  async _getAndRemoveStateYandex(state: string) {
    const tokenData: StateToken = await this.stateTokenModal.findOneAndRemove({
      state: state,
    });
    const token = tokenData.state;

    return token;
  }
}
