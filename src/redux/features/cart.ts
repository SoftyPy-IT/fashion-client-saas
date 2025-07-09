import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  name: string;
  code: string;
  thumbnail: string;
  price: number;
  quantity: number;
  totalPrice: number;
  availableStock: number;
  variants?: {
    name: string;
    value: string;
    availableStock?: string;
  }[];
}

interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  isAdded: boolean;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === newItem.productId,
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        existingItem.variants = newItem.variants;
        existingItem.availableStock = newItem.availableStock;
      } else {
        if (newItem.availableStock === undefined) {
          newItem.availableStock = 0;
        }
        state.cartItems.push(newItem);
      }

      state.isAdded = true;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload,
      );
    },
    changeItemQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        variants?: {
          name: string;
          value: string;
        }[];
        availableStock?: number;
      }>,
    ) => {
      const { productId, quantity, availableStock } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        existingItem.variants = action.payload.variants;
        if (availableStock !== undefined) {
          existingItem.availableStock = availableStock;
        }
      }
    },
    resetAddedFlag: (state) => {
      state.isAdded = false;
    },
    removeAllFromCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeItemQuantity,
  resetAddedFlag,
  removeAllFromCart,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;

export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;
