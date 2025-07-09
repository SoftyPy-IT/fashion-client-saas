"use client";

import Card from "@/components/Card/Card";
import Preloader from "@/components/common/Preloader";
import { useGetAllComboProductsQuery } from "@/redux/features/products/combo.api";
import { TQueryParam } from "@/types/global.types";
import { Pagination } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import ProductsFilterHeader from "../products/ProductsFilterHeader";

const ComboPageLayout = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

  const { data, isLoading, isFetching } = useGetAllComboProductsQuery(params);

  const setPage = (page: number) => {
    setParams((prev) => [
      ...prev.filter((item) => item.name !== "page"),
      { name: "page", value: page.toString() },
    ]);
  };
  if (isLoading) return <Preloader />;
  const products = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="my-24 relative top-10">
      <main>
        <div className="flex items-center justify-between border-b border-gray200 pb-6 pt-6">
          <h1 className="text-xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Combo Products
          </h1>
          <ProductsFilterHeader />
        </div>

        <section aria-labelledby="products-heading" className="pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="flex flex-col lg:flex-row gap-x-8">
            <div className="flex-1 t top-2/4">
              {isFetching ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
                  {Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <ProductCardSkeleton key={index} />
                    ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 sticky top-0">
                    {products.map((product: any) => (
                      <Card
                        key={product._id}
                        item={{
                          id: product._id,
                          name: product.name,
                          code: product?.code,
                          price: product.price,
                          img1: product.thumbnail,
                          img2: product?.images && product.images[0],
                          slug: product.slug,
                          category: "Combo",
                          link: `/products/combo/${product.slug}`,
                          rating: product.rating,
                          reviewCount: product.reviews.length,
                          availableStock: product.quantity,
                        }}
                      />
                    ))}
                  </div>
                  {meta && meta.total > meta.limit && (
                    <div className="my-8 flex justify-center">
                      <Pagination
                        total={Math.ceil(meta.total / meta.limit)}
                        initialPage={meta.page}
                        onChange={(page) => setPage(page)}
                        color="warning"
                        size="sm"
                        className="-z-0"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center col-span-full">
                  <p className="text-lg text-gray-500">
                    No products found in this category.
                  </p>
                  <div className="mt-4">
                    <Link href="/products">
                      <span className="text-purple-600 hover:underline">
                        View all products
                      </span>
                    </Link>
                    <Link href="/">
                      <span className="text-purple-600 hover:underline ml-4">
                        Go back home
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ComboPageLayout;
