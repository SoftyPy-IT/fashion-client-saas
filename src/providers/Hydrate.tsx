"use client";

import Preloader from "@/components/common/Preloader";
import { ReactNode, useEffect, useState } from "react";

const Hydrate = ({ children }: { children: ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return <>{isHydrated ? children : <Preloader />}</>;
};

export default Hydrate;
