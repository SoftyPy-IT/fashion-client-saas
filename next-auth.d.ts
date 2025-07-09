import NextAuth from "next-auth";
import type { User } from "next-auth";
import "next-auth/jwt";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }

  interface User {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    accessToken: string;
    refreshToken: string;
  }
}
export declare module "next-auth" {}
