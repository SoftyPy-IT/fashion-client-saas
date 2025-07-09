import { baseApi } from "@/redux/api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
      query: (coupon) => {
        return {
          url: "/coupon/apply",
          method: "POST",
          body: coupon,
        };
      },
    }),

    createOrder: builder.mutation({
      query: (order) => {
        return {
          url: "/order/create",
          method: "POST",
          body: order,
        };
      },
      invalidatesTags: ["orders", "profile"],
    }),
    getOrder: builder.query({
      query: (orderId) => {
        return {
          url: `/order/${orderId}`,
          method: "GET",
        };
      },
    }),

    orderTracking: builder.query({
      query: (id) => {
        return {
          url: `/order/track/${id}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useApplyCouponMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
  useOrderTrackingQuery,
} = orderApi;
