// File path: /components/ProductRating.tsx

"use client";

import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import Rating from "react-rating";

interface Props {
  ratingValue: number;
  totalRatings?: number;
}

const ProductRating = ({ ratingValue, totalRatings }: Props) => {
  return (
    <div className="flex items-center space-x-1">
      <p className="text-yellow text-lg">{ratingValue.toFixed(1)}</p>
      <div className="flex items-center">
        {/* @ts-ignore */}
        <Rating
          initialRating={parseFloat(ratingValue.toFixed(1))}
          readonly
          emptySymbol={<StarIconOutline className="h-5 w-5 text-yellow" />}
          fullSymbol={<StarIcon className="h-5 w-5 text-yellow" />}
        />
        {totalRatings && (
          <p className="text-gray500 ml-2 ">({totalRatings}) Reviews</p>
        )}
      </div>
    </div>
  );
};

export default ProductRating;
