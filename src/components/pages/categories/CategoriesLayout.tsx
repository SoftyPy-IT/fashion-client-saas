"use client";

import Card from "@/components/Card/Card";
import Preloader from "@/components/common/Preloader";
import ProductNotFound from "@/components/common/ProductNotFound";
import { useGetCategoriesProductsQuery } from "@/redux/features/products/category.api";
import { TQueryParam } from "@/types/global.types";
import { Pagination } from "@heroui/react";
import { useState } from "react";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import ProductsFilterHeader from "../products/ProductsFilterHeader";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { usePathname } from "next/navigation";
import PaginationControls from "@/components/shared/PaginationControls";

interface CategoriesLayoutProps {
  slug: string;
}

const CategoriesLayout = ({ slug }: CategoriesLayoutProps) => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const pathName = usePathname();

  const handleOnPageChange = (newPage: number) => {
    setPage(newPage);
  };

  const { data, isLoading, isFetching } = useGetCategoriesProductsQuery([
    { name: "main", value: slug[0] },
    { name: "cat", value: slug[1] },
    { name: "sub", value: slug[2] },
    ...params,
    { name: "page", value: String(page) },
  ]);

  if (isLoading) return <Preloader />;

  const products = data?.data || [];
  const meta = data?.meta;

  const generateBreadcrumbs = (slug: string) => {
    const breadcrumbPaths = [
      { name: "Home", href: "/", current: false },
      { name: "Categories", href: "/categories", current: false },
    ];

    // Dynamically generate the breadcrumb based on slug
    if (slug[0]) {
      breadcrumbPaths.push({
        name: slug[0],
        href: `/categories/${slug[0]}`,
        current: pathName === `/categories/${slug[0]}`,
      });
    }

    if (slug[1]) {
      breadcrumbPaths.push({
        name: slug[1],
        href: `/categories/${slug[0]}/${slug[1]}`,
        current: pathName === `/categories/${slug[0]}/${slug[1]}`,
      });
    }

    if (slug[2]) {
      breadcrumbPaths.push({
        name: slug[2],
        href: `/categories/${slug[0]}/${slug[1]}/${slug[2]}`,
        current: pathName === `/categories/${slug[0]}/${slug[1]}/${slug[2]}`,
      });
    }

    return breadcrumbPaths;
  };

  const breadcrumbs = generateBreadcrumbs(slug);
  return (
    <div className="my-20 py-24 relative">
      <main>
        <Breadcrumbs pages={breadcrumbs} />

        <div className="flex items-center justify-between border-b border-gray200 pb-6 pt-6">
          <h1 className="text-xl lg:text-4xl capitalize font-bold tracking-tight text-gray-900">
            {/* {id} */}
          </h1>
          <ProductsFilterHeader />
        </div>

        <section aria-labelledby="products-heading" className="pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="flex flex-col lg:flex-row gap-x-8">
            <div className="flex-1">
              {isFetching ? (
                <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                  <ProductCardSkeleton />
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 sticky top-0 mb-40">
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
                          category: product.category?.name,
                          subCategory: product.subCategory?.name,
                          mainCategory: product.mainCategory?.name,
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
                      currentPage={page}
                      totalPages={meta.totalPage}
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
                <ProductNotFound />
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CategoriesLayout;
