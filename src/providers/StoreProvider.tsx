"use client";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux/store";
import { ReactNode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import Preloader from "@/components/common/Preloader";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        {children}
      </PersistGate>
      <Toaster />
    </Provider>
  );
};

export default StoreProvider;
