import { use, useEffect, useState } from "react";
import { IProduct } from "@/types/products.types";
import ReviewForm from "./ReviewForm";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ReviewItem from "./ReviewItem";
import { useGetAllReviewsQuery } from "@/redux/features/products/review.api";
import { Pagination, Skeleton } from "@heroui/react";
import { TQueryParam } from "@/types/global.types";
import Link from "next/link";

interface ProductReviewsProps {
  product: IProduct;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  const user = useAppSelector(selectCurrentUser);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [params, setParams] = useState<TQueryParam[]>([]);
  useEffect(() => {
    if (product) {
      setParams([
        { name: "page", value: page.toString() },
        { name: "limit", value: limit.toString() },
        { name: "product", value: product._id },
      ]);
    }
  }, [product, page]);

  const {
    data: reviewsData,
    isLoading,
    refetch,
  } = useGetAllReviewsQuery(product ? params : [], {
    skip: !product,
  });

  if (!product) return null;

  const totalReviews = reviewsData?.meta?.total || 0;

  return (
    <>
      <div className="max-h-[550px] overflow-y-scroll custom-scrollbar">
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex space-x-4 items-center mb-4">
                <Skeleton className="mb-4 h-10 rounded" />
              </div>
            ))
          : reviewsData?.data?.map((review) => (
              <ReviewItem
                key={review._id}
                review={review}
                user={user}
                refetchReviews={refetch}
              />
            ))}
      </div>

      {totalReviews > limit && (
        <div className="mt-4 z-0">
          <Pagination
            total={Math.ceil(totalReviews / limit)}
            initialPage={page}
            onChange={(page) => setPage(page)}
            color="warning"
            className="z-0"
            size="sm"
          />
        </div>
      )}

      {user ? (
        <div className="">
          <ReviewForm
            productId={product._id}
            userId={user?.userId as string}
            refetchReviews={refetch}
          />
        </div>
      ) : (
        <div className="">
          <p className="text-sm text-gray-500">
            Please{" "}
            <Link href="/login" className="text-brand-main hover:underline">
              login
            </Link>{" "}
            to leave a review.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
