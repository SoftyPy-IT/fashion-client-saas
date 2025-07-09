"use client";

import React, { useState, useEffect } from "react";
import ProductsFilterDesktop from "@/components/pages/products/ProductsFilterDesktop";
import Link from "next/link";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import { Button, Pagination } from "@heroui/react";
import ProductFilterMobile from "../products/ProductFilterMobile";
import ProductsFilterHeader from "../products/ProductsFilterHeader";
import { useGetShopProductsQuery } from "@/redux/features/products/product.api";
import Preloader from "@/components/common/Preloader";
import Card from "@/components/Card/Card";
import PaginationControls from "@/components/shared/PaginationControls";
import { useSearchParams } from "next/navigation";

const ProductsPageLayout = () => {
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const searchParams = useSearchParams();

  // Sync currentPage with URL params on initial load and when URL changes
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const pageFromUrl = pageParam ? parseInt(pageParam, 10) : 1;
    if (pageFromUrl !== currentPage && pageFromUrl > 0) {
      setCurrentPage(pageFromUrl);
    }
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetShopProductsQuery({
    filters,
    page: currentPage,
    limit: 15,
  });

  const handleOnPageChange = (page: number) => {
    setCurrentPage(page);
    // Remove the manual URL updating since PaginationControls handles it
    // Scroll to products section
    document.getElementById("products-heading")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Reset to page 1 when filters change
    setCurrentPage(1);
  };

  if (isLoading) return <Preloader />;

  const products = data?.data || [];
  const meta = data?.meta;
  const filterOptions = data?.filterOptions;

  return (
    <div className="my-24 relative top-10">
      {data && (
        <ProductFilterMobile
          filters={filterOptions}
          onFilterChange={handleFilterChange}
        />
      )}
      <main>
        {/* <Breadcrumbs
      pages={[
        { name: "Home", href: "/", current: false },
        { name: "Products", href: "/products", current: true },
      ]}
    /> */}
        <div className="flex items-center justify-between border-b border-gray200 pb-6 pt-6">
          <h1 className="text-xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Products
          </h1>
          <ProductsFilterHeader />
        </div>

        <section aria-labelledby="products-heading" className="pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="flex flex-col lg:flex-row gap-x-8">
            {data && (
              <div className="w-3/12">
                <ProductsFilterDesktop
                  filters={filterOptions}
                  onFilterChange={handleFilterChange}
                />
              </div>
            )}

            <div className="flex-1">
              {products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product: any) => (
                      <Card
                        key={product._id}
                        item={{
                          id: product._id,
                          name: product.name,
                          code: product.code,
                          price: product.price,
                          img1: product.thumbnail,
                          img2: product?.images && product.images[0],
                          slug: product.slug,
                          category: product.category,
                          subCategory: product.subCategory,
                          mainCategory: product.mainCategory,
                          rating: product.rating,
                          reviewCount: product.reviewCount,
                          discount: product.discount_price,
                          availableStock: product.quantity,
                        }}
                      />
                    ))}
                  </div>
                  {meta && meta.total > meta.limit && (
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={meta.totalPages}
                      totalItems={meta.total}
                      itemsPerPage={meta.limit}
                      scrollTarget="#products-heading"
                      color="secondary"
                      showInfo={true}
                      onPageChange={handleOnPageChange}
                    />
                  )}
                </>
              ) : (
                <div className="text-center col-span-full py-10">
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

export default ProductsPageLayout;
