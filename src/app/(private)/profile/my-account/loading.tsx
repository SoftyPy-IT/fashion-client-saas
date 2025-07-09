import React from "react";
import { Skeleton } from "@heroui/skeleton";

const MyAccountLoading = () => {
  return (
    <>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray100 border-t border-gray200 text-sm leading-6">
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="mt-4 w-full h-8 rounded-lg" />
          <Skeleton className="mt-4 w-full h-8 rounded-lg" />
          <Skeleton className="mt-4 w-full h-8 rounded-lg" />
          <Skeleton className="mt-4 w-full h-8 rounded-lg" />
        </dl>
      </div>

      <div>
        <div className="flex border-t border-gray100 pt-6 mt-4"></div>
      </div>

      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Shipping Address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be used as default shipping address.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray100 border-t border-gray200 text-sm leading-6">
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="mt-4 w-full h-8 rounded-lg" />
        </dl>
      </div>

      <div>
        <div className="flex border-t border-gray-100 pt-6 mt-4"></div>
      </div>
    </>
  );
};

export default MyAccountLoading;
