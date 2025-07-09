import React from "react";
import { IProduct } from "@/types/products.types";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Card from "@/components/Card/Card";

interface RelatedProductsProps {
  products: IProduct[] | any;
  isLoading: boolean;
}

const RelatedProducts = ({ products, isLoading }: RelatedProductsProps) => {
  return (
    <div className="mx-auto  w-full  bg-white  my-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 ">
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          products?.map((product: IProduct) => (
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
                category: product.category as unknown as string,
                mainCategory: product.mainCategory as unknown as string,
                subCategory: product.subCategory as unknown as string,
                reviewCount: product.reviews.length,
                discount: product.discount_price,
                rating: product.rating,
                availableStock: product.quantity,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
