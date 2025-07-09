import { tagTypesArray } from "@/types/tagTypes";
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { getSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import { logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../hooks";

const productionURL = process.env.NEXT_PUBLIC_API_URL;
const developmentURL = process.env.NEXT_PUBLIC_API_URL;
const mode = process.env.NODE_ENV;
export const baseURL = mode === "production" ? productionURL : developmentURL;

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.error === "RefreshAccessTokenError") {
    signOut();
  }

  if (session?.user?.accessToken) {
    headers.set("authorization", session.user.accessToken);
  }
  return headers;
};

const baseQuery = fetchBaseQuery({
  baseUrl: mode === "production" ? productionURL : developmentURL,
  prepareHeaders: (headers, { getState }) => {
    return addTokenToRequest(headers, { getState });
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 404) {
    toast.error((result.error.data as { message: string }).message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as { message: string }).message);
  }

  if (result?.error?.status === 401) {
    const session: any = await getSession();
    if (session?.user?.accessToken) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: tagTypesArray,
});
