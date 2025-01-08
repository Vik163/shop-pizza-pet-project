/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunkAction, DeepPartial } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (
   arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
   dispatch: jest.MockedFn<any>;

   getState: () => StateSchema;

   actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

   // 5_6 - 22 min
   api: jest.MockedFunctionDeep<AxiosStatic>;

   navigate: jest.MockedFn<any>;

   constructor(
      actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
      state?: DeepPartial<StateSchema>, // 6_3 17min
   ) {
      this.actionCreator = actionCreator;
      this.dispatch = jest.fn();
      this.getState = jest.fn(() => state as StateSchema); // 6_3 17min

      this.api = mockedAxios;
      this.navigate = jest.fn();
   }

   async callThunk(arg: Arg) {
      const action = this.actionCreator(arg);
      const result = await action(
         this.dispatch,
         this.getState,
         // 5_6 - 22 min
         { api: this.api, navigate: this.navigate },
      );

      return result;
   }
}
