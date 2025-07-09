import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import { ICoupon } from "@/types/order.type";

type TOrderState = {
  isCouponApplied: boolean;
  coupon: ICoupon | null;
  orderSummary: {
    subTotal: number;
    discount: number;
    shippingCharge: number;
    total: number;
  };
};

const initialState: TOrderState = {
  isCouponApplied: false,
  coupon: null,
  orderSummary: {
    subTotal: 0,
    discount: 0,
    shippingCharge: 0,
    total: 0,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    applyCouponState: (state, action) => {
      state.isCouponApplied = true;
      state.coupon = action.payload;
    },
    removeCouponState: (state) => {
      state.isCouponApplied = false;
      state.coupon = null;
    },

    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    clearOrderData: (state) => {
      state.isCouponApplied = false;
      state.coupon = null;
      state.orderSummary = {
        subTotal: 0,
        discount: 0,
        shippingCharge: 0,
        total: 0,
      };
    },
  },
});

export const {
  applyCouponState,
  removeCouponState,
  setOrderSummary,
  clearOrderData,
} = orderSlice.actions;

export default orderSlice.reducer;

export const selectIsCouponApplied = (state: RootState) =>
  state.orders.isCouponApplied;

export const selectCoupon = (state: RootState) => state.orders.coupon;

export const selectOrderSummary = (state: RootState) =>
  state.orders.orderSummary;
