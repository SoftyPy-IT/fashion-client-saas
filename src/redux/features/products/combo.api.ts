import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types/global.types";

const comboApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComboProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/combo/all",
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
      providesTags: ["combos"],
      keepUnusedDataFor: 60,
    }),

    getComboProductDetails: builder.query({
      query: (id: string) => {
        return {
          url: `/combo/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return response.data;
      },
      providesTags: ["products"],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const { useGetAllComboProductsQuery, useGetComboProductDetailsQuery } =
  comboApi;
