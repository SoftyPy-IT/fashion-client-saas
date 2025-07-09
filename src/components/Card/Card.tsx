import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, Heart, Eye, Tag } from "lucide-react";
import { changeItemQuantity, addToCart } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import formatPrice from "@/utils/formatPrice";
import { truncate } from "lodash";
import { useRouter } from "next/navigation";

interface ItemType {
  id: string;
  name: string;
  code: string;
  price: number;
  img1: string;
  img2: string;
  slug: string;
  discount?: number;
  isNew?: boolean;
  category?: string;
  mainCategory?: string;
  subCategory?: string;
  link?: string;
  rating?: number;
  reviewCount?: number;
  availableStock: number;
}

interface Props {
  item: ItemType;
  className?: string;
}

const RatingStars: FC<{
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}> = ({ rating, reviewCount, size = "sm" }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Rating: ${rating} out of 5 stars`}
      >
        {[...Array(totalStars)].map((_, index) => (
          <Star
            key={index}
            className={`${starSize} ${
              index < fullStars
                ? "fill-amber-400 text-amber-400"
                : index === fullStars && hasHalfStar
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-300"
            } transition-colors`}
            strokeWidth={1}
          />
        ))}
      </div>
    </div>
  );
};

const Card: FC<Props> = ({ item, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const router = useRouter();

  const {
    id,
    name,
    code,
    slug,
    price,
    img1,
    img2,
    discount,
    isNew,
    category,
    mainCategory,
    subCategory,
    rating,
    reviewCount,
    availableStock,
  } = item;

  const itemLink = item.link
    ? item.link
    : `/products/${encodeURIComponent(slug)}`;
  const discountedPrice = discount && discount > 0 ? price - discount : price;
  const hasDiscount = (discount && discount > 0) || null;

  const addToCartHandler = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    const cartItem = {
      productId: id,
      name,
      code,
      thumbnail: img1,
      price: discountedPrice,
      quantity: 1,
      totalPrice: discountedPrice,
      variants: [],
      availableStock,
    };

    const existingCartItem = cartItems.find(
      (ci) => ci.productId === cartItem.productId,
    );

    if (existingCartItem) {
      dispatch(
        changeItemQuantity({
          productId: cartItem.productId,
          quantity: existingCartItem.quantity + 1,
        }),
      );
    } else {
      dispatch(addToCart(cartItem));
    }

    setTimeout(() => setIsLoading(false), 600);
  };

  return (
    <div className={`group relative w-full h-full ${className}`}>
      <div className="relative w-full bg-white overflow-hidden transition-all duration-300 flex flex-col  hover:shadow-sm border border-gray-100 h-full">
        {/* Image Container */}

        <div className="relative w-full aspect-[3/4] cursor-pointer  overflow-hidden bg-gray-50">
          <Link
            href={itemLink}
            className="block w-full h-full"
            target="_blank"
            rel={item.link ? "noopener noreferrer" : undefined}
          >
            <Image
              src={img1}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
          {/* Add to cart button */}
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={addToCartHandler}
              disabled={isLoading}
              className={`w-full bg-white/95 backdrop-blur-sm text-gray-900 py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 shadow-sm rounded-lg transform hover:scale-105 active:scale-95 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed animate-pulse"
                  : "hover:bg-gray-900 hover:text-white hover:shadow-lg"
              }`}
            >
              <ShoppingBag
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
              <span className="hidden xs:inline">
                {isLoading ? "Adding..." : "Add to Cart"}
              </span>
              <span className="xs:hidden">{isLoading ? "..." : "Add"}</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1 sm:space-y-2">
            {/* Category and Rating */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {(mainCategory || subCategory || category) && (
                  <div className="text-xs text-gray-500 mb-1">
                    {mainCategory && (
                      <span className="font-medium">{mainCategory}</span>
                    )}
                    {mainCategory && subCategory && " / "}
                    {subCategory && (
                      <span className="italic">{subCategory}</span>
                    )}
                    {!mainCategory && !subCategory && category && (
                      <span>{category}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-shrink-0 hidden sm:block">
                <RatingStars rating={rating || 0} />
              </div>
            </div>

            {/* Product Name */}
            <Link
              href={itemLink}
              className="hover:underline hover:text-brand-main transition-colors duration-300"
              target="_blank"
            >
              <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 leading-tight">
                <span className="line-clamp-2">
                  {truncate(name, {
                    length: window.innerWidth < 640 ? 40 : 60,
                    separator: " ",
                  })}
                </span>
              </h3>
            </Link>
          </div>

          {/* Price and Savings */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              {discount ? (
                <>
                  <span className="text-lg sm:text-xl  text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(price)}
                  </span>
                </>
              ) : (
                <span className="text-lg sm:text-xl  text-gray-900">
                  {formatPrice(price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
