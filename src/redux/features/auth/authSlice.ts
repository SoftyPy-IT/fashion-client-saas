import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import cookie from "js-cookie";
export type TUser = {
  userId: string;
  user?: Record<string, any>;
  role: string;
  iat: number;
  exp: number;
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
  verificationToken: null | string;
  profile: null | Record<string, any>;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  verificationToken: null,
  profile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.verificationToken = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.verificationToken = null;
      state.profile = null;
      cookie.remove("refreshToken");
      cookie.remove("accessToken");
    },
    setVerificationToken: (state, action) => {
      state.verificationToken = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setUser, logout, setVerificationToken, setProfile } =
  authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectProfile = (state: RootState) => state.auth.profile;
