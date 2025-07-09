import { TQueryParam, TResponseRedux } from "@/types/global.types";
import { baseApi } from "../../api/baseApi";

interface GetCategoryQueryArgs {
  id: string;
  filters?: any;
  page?: number;
  limit?: number;
}

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoriesProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "category/products",
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
      providesTags: ["categories"],
    }),

    getCategoriesTree: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "category/tree",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return response.data;
      },
      providesTags: ["categories"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesProductsQuery, useGetCategoriesTreeQuery } =
  categoriesApi;
