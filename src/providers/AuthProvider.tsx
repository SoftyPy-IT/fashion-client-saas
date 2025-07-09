"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider session={null} refetchInterval={300}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
