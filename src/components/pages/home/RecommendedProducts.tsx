"use client";

import Card from "@/components/Card/Card";
import Container from "@/components/common/Container";
import { useGetAllProductsQuery } from "@/redux/features/products/product.api";
import { TQueryParam } from "@/types/global.types";
import { IProduct } from "@/types/products.types";
import React from "react";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import CardSkeleton from "@/components/Card/CardSkeleton";

const RecommendedProducts = () => {
  const [params, setParams] = React.useState<TQueryParam[]>([]);
  const { data, isLoading } = useGetAllProductsQuery([...params]);

  const products = data?.data as IProduct[];
  const meta = data?.meta;

  return (
    <>
      <Container>
        <section className="flex flex-col my-16 ">
          <div className="flex justify-center">
            <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
              <h2 className="mb-4 text-3xl">Just for you</h2>
              <span>
                Explore our wide range of recommended products and find the
                perfect product for you or your loved ones.
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 mb-10 sm:grid-cols-3  lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-y-6">
            {isLoading ? (
              <>
                {[...Array(5)].map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </>
            ) : (
              products.map((product: IProduct) => (
                <Card
                  key={product._id}
                  item={{
                    id: product._id,
                    name: product.name,
                    code: product.code,
                    price: product.price,
                    img1: product.thumbnail,
                    img2: product.images[0],
                    slug: product.slug,
                    category: product.category.name,
                    availableStock: product.quantity,
                  }}
                />
              ))
            )}
          </div>
        </section>
      </Container>
      <div className="border-b-2 border-gray100"></div>
    </>
  );
};

export default RecommendedProducts;
