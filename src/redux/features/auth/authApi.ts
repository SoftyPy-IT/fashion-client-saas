import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    registration: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `/auth/verify-email`,
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forget-password`,
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `${data.token}`,
        }),
      }),
    }),

    updateAvatar: builder.mutation({
      query: (file) => ({
        url: `/user/update-profile`,
        method: "PUT",
        body: file,
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-profile`,
        method: "PUT",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/user/change-password`,
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),

      providesTags: ["profile"],
    }),

    addOrRemoveWishlist: builder.mutation({
      query: (data) => ({
        url: `/user/wishlist`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
  useAddOrRemoveWishlistMutation,
  useLogoutMutation,
} = authApi;
