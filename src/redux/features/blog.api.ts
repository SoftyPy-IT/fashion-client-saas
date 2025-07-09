import { TQueryParam, TResponseRedux } from "@/types/global.types";
import { baseApi } from "../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/blog/all",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["blogs"],
    }),

    getSingleBlog: builder.query({
      query: (id) => {
        return {
          url: `/blog/${id}`,
          method: "GET",
        };
      },

      transformResponse: (response: TResponseRedux<[]>) => response.data,

      providesTags: ["blogs"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllBlogQuery, useGetSingleBlogQuery } = blogApi;
