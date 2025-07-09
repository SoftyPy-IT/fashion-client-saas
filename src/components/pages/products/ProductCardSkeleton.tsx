const ProductCardSkeleton = () => {
  return (
    <div className="group relative w-full h-full">
      <div className="relative w-full bg-white overflow-hidden border border-gray-100 h-full rounded-lg animate-pulse">
        {/* Image Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-50 rounded-t-lg">
          <div className="w-full h-full bg-gray-200"></div>

          {/* Skeleton Discount Badge */}
          <div className="absolute top-3 right-3">
            <div className="h-6 w-16 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          {/* Category and Rating Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
            </div>
            <div className="flex items-center gap-1">
              {/* Star Rating Skeleton */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
              ))}
              <div className="h-3 w-8 bg-gray-200 rounded ml-1"></div>
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>

          {/* Price */}
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <div className="h-5 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
