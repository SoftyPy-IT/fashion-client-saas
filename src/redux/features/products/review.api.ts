import { TQueryParam, TResponseRedux } from "@/types/global.types";
import { baseApi } from "../../api/baseApi";

// Define the types for the review-related requests and responses
type Review = {
  _id: string;
  rating: number;
  comment: string;
  product: string;
  user: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
  isHidden: boolean;
};

type Reply = {
  _id: string;
  user: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  isHidden: boolean;
};

type CreateReviewRequest = {
  rating: number;
  comment: string;
  product: string;
  user: string;
};

type UpdateReviewRequest = {
  rating?: number;
  comment?: string;
  isHidden?: boolean;
};

type AddReplyRequest = {
  user: string;
  comment: string;
};

type HideReviewOrReplyRequest = {
  isHidden: boolean;
};

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "review/all",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<Review[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["reviews"],
      keepUnusedDataFor: 60,
    }),
    getReviewById: builder.query({
      query: (id: string) => ({
        url: `review/${id}`,
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<Review>) => response.data,
      providesTags: ["reviews"],
      keepUnusedDataFor: 60,
    }),
    createReview: builder.mutation({
      query: (data: CreateReviewRequest) => ({
        url: "review/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }: { id: string; data: UpdateReviewRequest }) => ({
        url: `review/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id: string) => ({
        url: `review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
    hideReview: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: HideReviewOrReplyRequest;
      }) => ({
        url: `review/hide/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    addReply: builder.mutation({
      query: ({ id, data }: { id: string; data: AddReplyRequest }) => ({
        url: `review/reply/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    hideReply: builder.mutation({
      query: ({
        reviewId,
        replyId,
        data,
      }: {
        reviewId: string;
        replyId: string;
        data: HideReviewOrReplyRequest;
      }) => ({
        url: `review/reply/${reviewId}/hide/${replyId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),
    deleteReply: builder.mutation({
      query: ({
        reviewId,
        replyId,
      }: {
        reviewId: string;
        replyId: string;
      }) => ({
        url: `review/reply/${reviewId}/${replyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["reviews"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllReviewsQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useHideReviewMutation,
  useAddReplyMutation,
  useHideReplyMutation,
  useDeleteReplyMutation,
} = reviewsApi;
