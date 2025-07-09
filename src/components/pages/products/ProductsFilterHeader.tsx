"use client";

import { setToggleMobileFilter } from "@/redux/features/global";
import { useAppDispatch } from "@/redux/hooks";

import { FunnelIcon } from "@heroicons/react/20/solid";
import React from "react";

const ProductsFilterHeader = () => {
  const dispatch = useAppDispatch();

  const handleMobileFiltersOpen = (open: boolean) => {
    dispatch(setToggleMobileFilter(open));
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => handleMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
};

export default ProductsFilterHeader;
