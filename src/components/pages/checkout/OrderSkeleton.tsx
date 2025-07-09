"use client";

import React from "react";
import { Skeleton } from "@heroui/skeleton";

const OrderSkeleton: React.FC = () => {
  return (
    <main className="min-h-screen  ">
      <div className=" mx-auto bg-white rounded-lg p-6">
        <div className="space-y-6">
          <dl className="text-sm font-medium flex items-center space-x-3">
            <dt className="text-gray-900">
              <Skeleton className="h-4 w-32 rounded" />
            </dt>
            <dd className="text-indigo-600">
              <Skeleton className="h-4 w-24 rounded" />
            </dd>
          </dl>

          <section
            aria-labelledby="order-heading"
            className="mt-10 border-t border-gray200"
          >
            <div className="space-y-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex space-x-6 py-10 border-b border-gray200"
                >
                  <Skeleton className="h-20 w-20 sm:h-40 sm:w-40 rounded-lg bg-gray100" />
                  <div className="flex flex-auto flex-col space-y-2">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                    <div className="mt-6 flex flex-1 items-end space-x-4">
                      <Skeleton className="h-4 w-12 rounded" />
                      <Skeleton className="h-4 w-16 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6 sm:ml-40 sm:pl-6">
              <h3 className="sr-only">Your information</h3>

              <dl className="space-y-6 pt-10 text-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex justify-between space-x-3">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default OrderSkeleton;
