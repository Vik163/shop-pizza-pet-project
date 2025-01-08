import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Address, Delivery, OrderSchema, TypeDelivery } from '../types/order';

const initialState: OrderSchema = {
   isLoading: false,
   error: '',
   typeDelivery: 'Доставка',
   delivery: undefined,
   address: {
      city: '',
      street: '',
      house: '',
      apartment: '',
      entrance: '',
      floor: '',
   },
};

const orderSlice = createSlice({
   name: 'basketPage',
   initialState,
   reducers: {
      setTypeDelivery: (state, { payload }: PayloadAction<TypeDelivery>) => {
         state.typeDelivery = payload;
      },
      setAddress: (state, { payload }: PayloadAction<Address>) => {
         state.address = payload;
      },
      setDeliveryInfo: (state, { payload }: PayloadAction<Delivery>) => {
         state.delivery = payload;
      },
   },
});

export const { actions: orderActions } = orderSlice;
export const { reducer: orderReducer } = orderSlice;
