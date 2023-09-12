/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ICart = {
  products: IProduct[];
  total: number;
};
const initialState: ICart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const isProductExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isProductExist) {
        isProductExist.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      state.total += action.payload.price;
    },
    reduceQuantity: (state, action: PayloadAction<IProduct>) => {
      const isProductExist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isProductExist && isProductExist.quantity! > 1) {
        isProductExist.quantity! -= 1;
        state.total -= action.payload.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, reduceQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
