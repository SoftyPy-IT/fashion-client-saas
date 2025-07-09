import { Divider, Skeleton } from "@heroui/react";
import { StarIcon } from "@heroicons/react/24/outline";

const ProductOverviewSkeleton = () => {
  return (
    <div className="bg-white mt-10 ">
      <div className="pb-16 pt-6 sm:pb-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 relative">
            <div className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-36">
              <div>
                <div className="flex justify-between ">
                  <h1 className="text-xl font-medium text-gray-900">
                    <Skeleton className="h-6 w-3/4 rounded-lg" />
                  </h1>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                  </p>
                </div>

                <div className="mt-4">
                  <p className="mt-2 text-2xl text-gray-500 truncate">
                    <span className="line-through text-orange-500 mr-2">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </span>
                    <span className="text-gray-900 font-semibold">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                    </span>
                  </p>
                </div>
                <div className="mt-4 z-0">
                  <h2 className="sr-only">Reviews</h2>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-700">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <span className="sr-only"> out of 5 stars</span>
                    </p>
                    <div className="ml-1 flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className="text-gray-200 h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div
                      aria-hidden="true"
                      className="ml-4 text-sm text-gray-300"
                    >
                      ·
                    </div>

                    <div className="ml-4 flex">
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        <Skeleton className="h-4 w-3/4 rounded-lg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="sticky top-36">
                <h2 className="sr-only">Images</h2>
                <div className="grid grid-cols-1 ">
                  <div className="rounded-lg overflow-hidden">
                    <Skeleton className="h-96 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-36">
              <div>
                <div className="mt-8  pt-8">
                  <h2 className="text-lg font-semibold text-gray-900">
                    <Skeleton className="h-6 w-1/4 rounded-lg" />
                  </h2>
                  <div className="prose prose-sm mt-4 text-gray-700">
                    <ul role="list" className="space-y-2">
                      {[...Array(4)].map((_, index) => (
                        <li key={index}>
                          <Skeleton className="h-4 w-3/4 rounded-lg" />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex space-x-4 mt-10">
                  <Skeleton className="h-12 w-1/2 rounded-lg" />
                  <Skeleton className="h-12 w-1/2 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewSkeleton;
