/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { SearchCheck as MagnifyingGlassIcon, X as XIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "lodash";
import { useGetAllProductsQuery } from "@/redux/features/products/product.api";
import { TQueryParam } from "@/types/global.types";
import { IProduct } from "@/types/products.types";
import formatPrice from "@/utils/formatPrice";

interface HeaderSearchBarProps {
  onClose: () => void;
}

const HeaderSearchBar: React.FC<HeaderSearchBarProps> = ({ onClose }) => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery([...params]);

  const debouncedSearch = useCallback(
    debounce((search: string) => {
      setParams([{ name: "searchTerm", value: search }]);
    }, 300),
    [],
  );

  useEffect(() => {
    // Focus input when search bar opens
    if (inputRef.current) {
      inputRef.current.focus();
    }

    // Handle click outside
    const handleClickOutside = (event: { target: any }) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Handle escape key
    const handleEscape = (event: { key: string }) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchTerm(search);
    debouncedSearch(search);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setParams([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-start justify-center pt-20">
      <div
        ref={searchRef}
        className="w-full max-w-4xl bg-white shadow-2xl  mx-4"
      >
        {/* Search Input */}
        <div className="p-4 border-b border-gray100">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <MagnifyingGlassIcon
                className={`w-5 h-5 transition-colors duration-200 ${
                  isFocused ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </div>

            <input
              ref={inputRef}
              type="search"
              className={`w-full py-3 pl-12 pr-12 text-lg bg-gray-50 border border-gray300 rounded-xl outline-none transition-all duration-200
                ${
                  isFocused
                    ? "border-blue-600 shadow-sm shadow-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }
                placeholder:text-gray-400`}
              placeholder="Search for products..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Clear and Close buttons */}
            <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-2">
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Loading State */}
          {(isLoading || isFetching) && (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results */}
          {!isFetching && searchTerm && products?.data && (
            <div className="divide-y divide-gray100">
              {products.data.map((product: IProduct) => (
                <Link
                  href={`/products/${product._id}`}
                  key={product._id}
                  className="block hover:bg-gray-50 transition-colors"
                  onClick={onClose}
                >
                  <div className="flex items-center p-4 gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        {product.discount_price > 0 ? (
                          <>
                            <span className="text-red-600 font-medium">
                              {formatPrice(product.discount_price)}
                            </span>
                            <span className="text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-900 font-medium">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isFetching &&
            searchTerm &&
            (!products?.data || !products.data.length) && (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <MagnifyingGlassIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-900 font-medium">No results found</p>
                <p className="text-gray-500 mt-1">
                  Try adjusting your search terms
                </p>
              </div>
            )}

          {/* Initial State */}
          {!searchTerm && (
            <div className="p-8 text-center text-gray-500">
              <p>Start typing to search for products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchBar;
