import { baseURL } from "@/redux/api/baseApi";
import axios from "axios";
import { UserRole } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Define an interface for the user object to improve type safety
interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  accessToken: string;
  refreshToken: string;
  address?: string;
  dateOfBirth?: string;
  isVerified?: boolean;
}

// Define an interface for the decoded token
interface DecodedToken {
  exp?: number;
  [key: string]: any;
}

export const authOptions: any = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const { data } = await axios.post(`${baseURL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (data.success && data.data.user) {
            const user: User = {
              id: data.data.user._id,
              name: `${data.data.user.firstName} ${data.data.user.lastName}`,
              firstName: data.data.user.firstName,
              lastName: data.data.user.lastName,
              email: data.data.user.email,
              phone: data.data.user.phone,
              avatar: data.data.user.avatar,
              role: data.data.user.role,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              address: data.data.user.address,
              dateOfBirth: data.data.user.dateOfBirth,
              isVerified: data.data.user.isVerified,
            };
            return user;
          }
          return null;
        } catch (error) {
          console.error("Something went wrong !");
          throw new Error("Invalid credentials! Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: User;
      trigger: string;
      session: any;
    }) {
      // If it's a new login, add user details to the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user?.phone || "";
        token.avatar = user.avatar;
        token.isVerified = user.isVerified;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.address = user.address;
        token.dateOfBirth = user.dateOfBirth;

        // Decode and set access token expiration
        const decodedAccessToken = decodeAccessToken(user.accessToken);
        if (decodedAccessToken?.exp) {
          token.accessTokenExpires = decodedAccessToken.exp * 1000;
        } else {
          console.error("Something went wrong !");
        }
      }

      // Handle token refresh when access token is expired
      if (
        token.accessTokenExpires &&
        Date.now() >= Number(token.accessTokenExpires)
      ) {
        try {
          const response = await axios.post(`${baseURL}/auth/refresh-token`, {
            refreshToken: token.refreshToken,
          });

          const { data } = response;

          if (data.success) {
            token.accessToken = data.data.accessToken;
            token.refreshToken = data.data.refreshToken;

            const decodedAccessToken = decodeAccessToken(data.data.accessToken);
            if (decodedAccessToken?.exp) {
              token.accessTokenExpires = decodedAccessToken.exp * 1000;
            } else {
              console.error("Something went wrong !");
            }
          } else {
            throw new Error("RefreshAccessTokenError");
          }
        } catch (error) {
          console.error("Something went wrong !");
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }

      // Handle session update
      if (trigger === "update" && session) {
        token.id = session.user.id;
        token.name = session.user.name;
        token.email = session.user.email;
        token.avatar = session.user.avatar;
        token.role = session.user.role;
        token.firstName = session.user.firstName;
        token.lastName = session.user.lastName;
        token.phone = session.user.phone;
        token.isVerified = session.user.isVerified;
        token.accessToken = session.user.accessToken;
        token.refreshToken = session.user.refreshToken;
        token.address = session.user.address;
        token.dateOfBirth = session.user.dateOfBirth;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Modify session to include all necessary user information
      session.expires = String(token.accessTokenExpires || Date.now());

      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          avatar: token.avatar,
          role: token.role,
          phone: token.phone,
          accessToken: token.accessToken,
          address: token.address,
          dateOfBirth: token.dateOfBirth,
          isVerified: token.isVerified,
        },
        error: token.error,
      };
    },
  },
};

function decodeAccessToken(token: string): DecodedToken | null {
  try {
    // Use Buffer.from().toString('base64') for encoding, Buffer.from(str, 'base64') for decoding
    const base64Payload = token.split(".")[1];
    return JSON.parse(Buffer.from(base64Payload, "base64").toString("utf-8"));
  } catch (error) {
    console.error("Something went wrong !");
    return null;
  }
}
