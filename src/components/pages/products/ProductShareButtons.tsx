"use client";

import {
  useAddOrRemoveWishlistMutation,
  useGetProfileQuery,
} from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { toast } from "sonner";

// Define prop types for the components
interface ButtonProps {
  type?: "button" | "submit" | "reset";
  value: string;
  size?: string;
  extraClass?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface IconButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}

interface ProductShareButtonsProps {
  availableQuantity: number;
  handleAddToCart: () => void;
  product: {
    _id: string;
    title: string;
    image: string;
    description: string;
    url?: string;
  };
  session?: any;
}

// Button component with TypeScript types
const Button: React.FC<ButtonProps> = ({
  type = "button",
  value,
  extraClass,
  onClick,
  disabled,
}) => (
  <button
    type={type}
    className={`bg-black text-white hover:bg-gray-800 transition-colors duration-200 ${
      extraClass || ""
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {value}
  </button>
);

// IconButton component with TypeScript types
const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  children,
  ariaLabel,
}) => (
  <button
    className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

// ShareIcon component with hover effect
const ShareIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

// Empty Heart/Wishlist Icon component
const EmptyHeartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
);

// Filled Heart/Wishlist Icon component
const FilledHeartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-red"
    fill="currentColor"
    viewBox="0 0 24 24"
    stroke="none"
  >
    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

// Main component with TypeScript types
const ProductShareButtons: React.FC<ProductShareButtonsProps> = ({
  availableQuantity,
  handleAddToCart,
  product,
  session,
}) => {
  const [showShareOptions, setShowShareOptions] = useState<boolean>(false);
  const router = useRouter();
  const { data: profile, isSuccess } = useGetProfileQuery(undefined, {
    skip: !session,
  });

  const isInWishlist = profile?.data?.wishlist?.some(
    (item: any) => item._id === product._id,
  );
  const [addOrRemoveWishlist] = useAddOrRemoveWishlistMutation();

  const handleAddOrRemoveFromWishList = async () => {
    if (!session) {
      toast.error("Please login to add to wishlist");
      router.push("/login");
      return;
    }

    const toastId = toast.loading("Please wait...");
    try {
      const action = isInWishlist ? "remove" : "add";

      const data = {
        productId: product._id,
        action,
      };

      await addOrRemoveWishlist(data).unwrap();

      toast.success(
        action === "add" ? "Added to wishlist" : "Removed from wishlist",
        {
          id: toastId,
          duration: 2000,
        },
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const toggleShareOptions = (): void => {
    setShowShareOptions((prev) => !prev);
  };

  // Click outside handler to close share options
  useEffect(() => {
    if (!showShareOptions) return;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest(".share-container")) {
        setShowShareOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);

  const productUrl =
    product.url || (typeof window !== "undefined" ? window.location.href : "");

  return (
    <div className="mt-6 relative">
      <div className="flex gap-2">
        {availableQuantity > 0 ? (
          <>
            <Button
              type="button"
              value="ADD TO BAG"
              extraClass="uppercase px-4 py-2 font-medium flex-grow text-center"
              onClick={handleAddToCart}
            />

            <IconButton
              onClick={handleAddOrRemoveFromWishList}
              ariaLabel={
                isInWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              {isInWishlist ? <FilledHeartIcon /> : <EmptyHeartIcon />}
            </IconButton>

            <div className="relative share-container">
              <IconButton
                onClick={toggleShareOptions}
                ariaLabel="Share product"
              >
                <ShareIcon />
              </IconButton>

              {showShareOptions && (
                <div className="absolute top-full right-0 flex flex-col z-10 shadow-lg">
                  <FacebookShareButton
                    url={productUrl}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <FacebookIcon size={40} round={false} />
                  </FacebookShareButton>

                  <TwitterShareButton
                    url={productUrl}
                    title={product.title}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <TwitterIcon size={40} round={false} />
                  </TwitterShareButton>

                  <LinkedinShareButton
                    url={productUrl}
                    title={product.title}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <LinkedinIcon size={40} round={false} />
                  </LinkedinShareButton>

                  <PinterestShareButton
                    url={productUrl}
                    media={product.image}
                    description={product.description}
                    className="hover:opacity-80 transition-opacity duration-200"
                  >
                    <PinterestIcon size={40} round={false} />
                  </PinterestShareButton>
                </div>
              )}
            </div>
          </>
        ) : (
          <Button
            value="OUT OF STOCK"
            extraClass="uppercase px-4 py-3 font-medium flex-grow text-center"
            disabled
          />
        )}
      </div>
    </div>
  );
};

export default ProductShareButtons;
