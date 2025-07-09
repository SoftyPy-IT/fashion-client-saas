import { TResponseRedux } from "@/types/global.types";
import { baseApi } from "../../api/baseApi";

const storefrontApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStorefrontData: builder.query({
      query: () => {
        return {
          url: "storefront/all",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return response.data;
      },
      providesTags: ["storefront"],
      keepUnusedDataFor: 60,
    }),

    getAllSections: builder.query({
      query: () => {
        return {
          url: "section/all?status=active",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["sections"],
      keepUnusedDataFor: 60,
    }),

    getAllOffers: builder.query({
      query: () => {
        return {
          url: "offers/all?status=active",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offers"],
      keepUnusedDataFor: 60,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetStorefrontDataQuery,
  useGetAllSectionsQuery,
  useGetAllOffersQuery,
} = storefrontApi;
