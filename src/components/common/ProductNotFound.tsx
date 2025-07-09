import Link from "next/link";
import React from "react";

const ProductNotFound = () => {
  return (
    <>
      <div className="bg-white p-10 rounded-lg border border-gray100 text-center">
        <div className="text-gray400 mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray500 mb-2">
          No products found
        </h3>
        <p className="text-gray400 mb-6">
          Try changing your filters or browse our other collections
        </p>
        <button className="bg-brand-main text-white px-6 py-2 rounded-md hover:opacity-90 transition-colors">
          <Link href="/products">View All Products</Link>
        </button>
      </div>
    </>
  );
};

export default ProductNotFound;
