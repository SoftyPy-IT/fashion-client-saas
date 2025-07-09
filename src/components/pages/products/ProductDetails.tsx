import { Fragment, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "@/utils/classNames";
import { IProduct } from "@/types/products.types";
import ReviewForm from "./ReviewForm";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import ReviewItem from "./ReviewItem";
import { useGetAllReviewsQuery } from "@/redux/features/products/review.api";
import { Pagination, Skeleton } from "@heroui/react";
import { TQueryParam } from "@/types/global.types";

const tabs = [
  { id: 1, name: "Description" },
  { id: 2, name: "Customer Reviews" },
  { id: 3, name: "FAQ" },
];

interface ProductDetailsProps {
  product: IProduct;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
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
    skip: !product, // Skip query execution when product is undefined
  });

  if (!product) return null;

  const totalReviews = reviewsData?.meta?.total || 0;

  return (
    <div className="mx-auto my-8 w-full bg-white p-4">
      <div className="mx-auto mt-16 w-full lg:col-span-4 lg:mt-0 lg:max-w-none">
        <Tab.Group as="div">
          <div className="border-b border-gray200">
            <Tab.List className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? "border-yellow text-yellow"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none",
                    )
                  }
                >
                  {tab.name}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            <Tab.Panel className="pt-10 w-full  lg:max-w-3xl">
              <h3 className="sr-only">Description</h3>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="sr-only">Customer Reviews</h3>
              <div className="max-h-[550px] overflow-y-scroll custom-scrollbar">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex space-x-4 items-center mb-4"
                      >
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
              {user && (
                <div className="mt-10 border-t border-gray-200 pt-10">
                  <ReviewForm
                    productId={product._id}
                    userId={user?.userId as string}
                    refetchReviews={refetch}
                  />
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel className="text-sm text-gray-500">
              <h3 className="sr-only">Frequently Asked Questions</h3>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="mb-4 h-20 " />
                ))
              ) : (
                <dl>
                  {product.faq.map((faq) => (
                    <Fragment key={faq.question}>
                      <dt className="mt-10 font-medium text-gray-900">
                        {faq.question}
                      </dt>
                      <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                        <p>{faq.answer}</p>
                      </dd>
                    </Fragment>
                  ))}
                </dl>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProductDetails;
