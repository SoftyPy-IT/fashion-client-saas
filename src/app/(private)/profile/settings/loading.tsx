import React from "react";
import { Skeleton } from "@heroui/react";

const SettingPageLoadign = () => {
  return (
    <>
      <div className="mb-4">
        <Skeleton className="w-full h-6 mb-2 rounded-lg" />
      </div>
      <form>
        <div className="grid max-w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-3">
            <Skeleton className="w-full h-8 rounded-lg" />
          </div>

          <div className="sm:col-span-3">
            <Skeleton className="w-full h-8 rounded-lg" />
          </div>

          <div className="sm:col-span-3">
            <Skeleton className="w-full h-8 rounded-lg" />
          </div>

          <div className="sm:col-span-3">
            <Skeleton className="w-full h-8 rounded-lg" />
          </div>

          <div className="sm:col-span-3 space-y-10">
            <Skeleton className="w-full h-8 rounded-lg" />
            <Skeleton className="w-full h-8 rounded-lg" />
            <Skeleton className="w-full h-8 rounded-lg" />
            <Skeleton className="w-full h-8 rounded-lg" />
          </div>

          <Skeleton className="sm:col-span-3 w-full h-10 mt-2 rounded-lg" />
        </div>
      </form>
    </>
  );
};

export default SettingPageLoadign;
