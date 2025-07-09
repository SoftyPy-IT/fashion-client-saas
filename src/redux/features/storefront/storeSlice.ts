import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStorefront } from "../../../types/storefront.types";

type TStoreState = {
  data: null | IStorefront;
};

const initialState: TStoreState = {
  data: null,
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStorefrontData: (state, action: PayloadAction<IStorefront>) => {
      state.data = action.payload;
    },
  },
});

export const { setStorefrontData } = storeSlice.actions;

export default storeSlice.reducer;

export const selectStorefrontData = (state: { store: TStoreState }) =>
  state.store.data;
export const useStorefrontData = (state: { store: TStoreState }) =>
  state.store.data;
