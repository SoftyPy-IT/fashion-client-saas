"use client";

import Preloader from "@/components/common/Preloader";
import ServerErrorMessage from "@/components/common/ServerErrorMessage";
import { useGetStorefrontDataQuery } from "@/redux/features/storefront/storefront.api";
import { setStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppDispatch } from "@/redux/hooks";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";

const NextuiProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const {
    data: storefrontData,
    error: storefrontError,
    isLoading: storefrontLoading,
    isSuccess: storefrontSuccess,
  } = useGetStorefrontDataQuery(undefined);

  useEffect(() => {
    if (storefrontSuccess && storefrontData) {
      dispatch(setStorefrontData(storefrontData as any));
    }
  }, [storefrontSuccess, storefrontData, dispatch]);

  if (storefrontLoading) return <Preloader />;
  if (storefrontError) return <ServerErrorMessage />;

  return <HeroUIProvider>{children}</HeroUIProvider>;
};

export default NextuiProvider;
