import React from "react";
import { Skeleton } from "@heroui/react";

const CardSkeleton = () => {
  return (
    <div
      key={Math.random()}
      className="relative bg-white rounded-lg overflow-hidden border p-4 border-gray100"
    >
      <Skeleton className="h-40 w-full rounded-md" />
      <div className="w-full flex flex-col gap-2 mt-4">
        <Skeleton className="h-4 w-3/5 rounded-lg" />
        <Skeleton className="h-4 w-4/5 rounded-lg" />
        <Skeleton className="h-4 w-2/5 rounded-lg" />
        <Skeleton className="h-4 w-3/5 rounded-lg" />
      </div>
    </div>
  );
};

export default CardSkeleton;
