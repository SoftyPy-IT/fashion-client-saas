import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart";
import { globalReducer } from "./features/global";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/authSlice";
import storefrontReducer from "./features/storefront/storeSlice";
import orderReducer from "./features/orders/orderSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { baseApi } from "./api/baseApi";

const persistConfig = {
  key: "auth",
  storage,
};

const persistConfigStore = {
  key: "store",
  storage,
};

const persistConfigCart = {
  key: "cart",
  storage,
};
const persistConfigOrders = {
  key: "orders",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedStore = persistReducer(persistConfigStore, storefrontReducer);
const persistedCartReducer = persistReducer(persistConfigCart, cartReducer);
const persistedOrdersReducer = persistReducer(
  persistConfigOrders,
  orderReducer,
);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCartReducer,
    global: globalReducer,
    auth: persistedAuthReducer,
    store: persistedStore,
    orders: persistedOrdersReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

export default store;
