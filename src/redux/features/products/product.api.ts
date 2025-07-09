import { TQueryParam, TResponseRedux } from "@/types/global.types";
import { baseApi } from "../../api/baseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/product/all",
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
      providesTags: ["products"],
      keepUnusedDataFor: 60,
    }),

    getProductDetails: builder.query({
      query: (id: string) => {
        return {
          url: `/product/details/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return response.data;
      },
      providesTags: ["products"],
      keepUnusedDataFor: 60,
    }),
    getShopProducts: builder.query({
      query: ({
        filters,
        page,
        limit,
      }: {
        filters?: any;
        page?: number;
        limit?: number;
      }) => {
        const params = new URLSearchParams();

        if (filters) {
          params.append("filter", JSON.stringify(filters));
        }
        if (page) {
          params.append("page", page.toString());
        }
        if (limit) {
          params.append("limit", limit.toString());
        }

        return {
          url: "/product/shop",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return response.data;
      },
      providesTags: ["products"],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllProductsQuery,
  useGetProductDetailsQuery,
  useGetShopProductsQuery,
} = productsApi;
