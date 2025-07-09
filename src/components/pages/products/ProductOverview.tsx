"use client";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionItem,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import Image from "next/image";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import Preloader from "@/components/common/Preloader";
import ImageGallery from "./ImageGallery";

import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { setProfile } from "@/redux/features/auth/authSlice";
import { addToCart, changeItemQuantity } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, IProductVariant } from "@/types/products.types";
import formatPrice from "@/utils/formatPrice";
import ProductFAQ from "./ProductFAQ";
import ProductReviews from "./ProductReviews";
import ProductShareButtons from "./ProductShareButtons";
import { ImageSwiper } from "@/components/Swipper/ImageSwiper";
import ProductCardImageSwiper from "./Sqipper";

// Custom hook for media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    if (typeof window !== "undefined") {
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }
  }, [matches, query]);

  return matches;
};

// Accordion content component
const AccordionContent = ({ children }: PropsWithChildren) => {
  return <div className="py-4 px-1 text-sm text-gray-700">{children}</div>;
};

// Section component for responsive behavior
const ProductSection = ({ title, children, defaultOpen = false }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure(defaultOpen);
  const isLargeDevice = useMediaQuery("(min-width: 768px)");

  if (isLargeDevice) {
    return (
      <div className="border-b border-gray-200">
        <div
          className="flex justify-between items-center py-3 cursor-pointer"
          onClick={isOpen ? onClose : onOpen}
        >
          <h3 className="text-sm font-medium">{title}</h3>
          <ChevronRightIcon className="h-5 w-5 text-gray-500" />
        </div>

        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          radius="none"
          placement="right"
          size="md"
        >
          <DrawerContent>
            <DrawerHeader className="border-b border-gray-200 py-4">
              <h2 className="text-lg font-semibold">{title}</h2>
            </DrawerHeader>
            <DrawerBody className="py-6">{children}</DrawerBody>
            <DrawerFooter className="py-4">
              <button
                className="w-full bg-gray-100 py-3 rounded-lg text-gray-700 font-medium"
                onClick={onClose}
              >
                Close
              </button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else {
    return null; // For mobile, we'll use the Accordion component instead
  }
};

interface IProductOverview {
  product: IProduct;
  isLoading: boolean;
  session: any;
}

const ProductOverview = ({ product, isLoading, session }: IProductOverview) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const { data: profile, isSuccess } = useGetProfileQuery(undefined, {
    skip: status !== "authenticated",
  });

  const isMobile = !useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isSuccess && profile.data) {
      dispatch(setProfile(profile.data));
    }
  }, [isSuccess, profile, dispatch]);

  useEffect(() => {
    // Reset quantity when product changes
    setQuantity(1);

    const initialSelection: { [key: string]: string } = {};
    product?.variants?.forEach((variant: IProductVariant) => {
      const cartItem = cartItems.find(
        (item) =>
          item.productId === product._id &&
          item.variants &&
          item.variants.some((v) => v.name === variant.name),
      );

      if (cartItem) {
        const selectedVariant = cartItem?.variants?.find(
          (v) => v.name === variant.name,
        );
        initialSelection[variant.name] = selectedVariant
          ? selectedVariant.value
          : variant.values.find((v: any) => v.quantity > 0)?.name ||
            variant.values[0]?.name;
      } else {
        // Prioritize variants that have stock
        initialSelection[variant.name] =
          variant.values.find((v: any) => v.quantity > 0)?.name ||
          variant.values[0]?.name;
      }
    });
    setSelectedVariants(initialSelection);
  }, [product, cartItems]);

  // Find available quantity based on selected variants
  const availableQuantity = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) {
      return product?.stock || 0;
    }

    let minQuantity = Infinity;

    product.variants.forEach((variant) => {
      const selectedValue = selectedVariants[variant.name];
      const variantValue = variant.values.find(
        (v) => v.value === selectedValue || v.name === selectedValue,
      ) as any;

      if (variantValue && variantValue.quantity < minQuantity) {
        minQuantity = variantValue.quantity;
      }
    });

    return minQuantity === Infinity ? 0 : minQuantity;
  }, [product?.variants, product?.stock, selectedVariants]);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: value,
    }));

    // Reset quantity to 1 if current quantity exceeds available
    const variant = product.variants?.find((v) => v.name === variantName);
    const variantValue = variant?.values.find(
      (v) => v.value === value || v.name === value,
    ) as any;

    if (variantValue && quantity > variantValue.quantity) {
      setQuantity(variantValue.quantity > 0 ? 1 : 0);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > availableQuantity) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (availableQuantity <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    if (quantity <= 0) {
      toast.error("Please select a valid quantity");
      return;
    }

    const productUrl = `${window.location.origin}/products/${
      product.slug || product._id
    }`;

    const discountedPrice =
      product.discount_price && product.discount_price > 0
        ? product.price - product.discount_price
        : product.price;

    const cartItem = {
      productId: product._id,
      name: product.name,
      code: product.code,
      thumbnail: product.thumbnail,
      price: discountedPrice,
      quantity: quantity,
      availableStock: product.quantity,
      totalPrice: discountedPrice * quantity,
      variants: Object.entries(selectedVariants).map(([key, value]) => {
        const variant = product.variants?.find((v) => v.name === key);
        const variantValue = variant?.values.find(
          (v) => v.value === value || v.name === value,
        ) as any;
        return {
          name: key,
          value,
          availableStock: (variantValue?.quantity || 0).toString(),
        };
      }),
    };

    const existingCartItem = cartItems.find((item) => {
      if (item.productId !== cartItem.productId) return false;

      // Check if all variants match
      if (!item.variants || !cartItem.variants)
        return item.productId === cartItem.productId;

      if (item.variants.length !== cartItem.variants.length) return false;

      return item.variants.every((itemVariant) => {
        const matchingVariant = cartItem.variants.find(
          (v) => v.name === itemVariant.name,
        );
        return matchingVariant && matchingVariant.value === itemVariant.value;
      });
    });

    if (existingCartItem) {
      dispatch(
        changeItemQuantity({
          productId: cartItem.productId,
          quantity: existingCartItem.quantity + quantity,
          variants: cartItem.variants,
        }),
      );
      toast.success(`Added ${quantity} more to cart`);
    } else {
      dispatch(addToCart(cartItem));
      toast.success("Added to cart");
    }
  };

  if (isLoading) return <Preloader />;
  if (!product) return null;

  const productUrl = `${window.location.origin}/products/${
    product.slug || product._id
  }`;

  const discountedPrice =
    product.discount_price && product.discount_price > 0
      ? product.price - product.discount_price
      : product.price;
  const hasDiscount = product.discount_price > 0;

  return (
    <div className="bg-white w-full mt-36 relative ">
      <div className="py-0 md:py-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
          {/* Left: Product Gallery */}
          <div className="lg:col-span-7 rounded-2xl ">
            <>
              <ProductCardImageSwiper images={product.images} />
            </>
            {/* <ImageGallery productName={product.name} images={product.images} /> */}
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                {/* Title and actions */}
                <div className="flex justify-between items-start">
                  <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Price & Reviews */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                <div className="flex items-end gap-2">
                  <span className="text-2xl  text-gray-900">
                    {formatPrice(discountedPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {/* <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {product.short_description}
              </p> */}
              <div className="">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {/* Quantity Selector */}
                  {availableQuantity > 0 && (
                    <div className="flex-shrink-0">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Quantity
                      </label>
                      <div className="flex items-center border border-gray-300 rounded h-10">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          disabled={quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-xl font-semibold">-</span>
                        </button>
                        <div className="flex-grow h-10 flex items-center justify-center border-x border-gray-300">
                          <span className="font-medium">{quantity}</span>
                        </div>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          disabled={quantity >= availableQuantity}
                          className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="text-xl font-semibold">+</span>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Variant Select Inputs */}
                  {product.variants &&
                    product.variants.length > 0 &&
                    product.variants.map((variant: IProductVariant) => (
                      <div
                        key={`variant-${variant.name}`}
                        className="flex-grow min-w-[100px]"
                      >
                        <label
                          htmlFor={`variant-${variant.name}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          {variant.name}
                        </label>
                        <select
                          id={`variant-${variant.name}`}
                          value={selectedVariants[variant.name] || ""}
                          onChange={(e) =>
                            handleVariantChange(variant.name, e.target.value)
                          }
                          className="w-full h-10 px-3 border border-gray-300 rounded bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-main"
                        >
                          {variant.values.map((value: any) => (
                            <option
                              key={value.name}
                              value={value.value}
                              disabled={value.quantity <= 0}
                            >
                              {value.name}{" "}
                              {value.quantity <= 0 ? "(Out of stock)" : ""}
                              {value.quantity > 0 && value.quantity <= 5
                                ? " (Low stock)"
                                : ""}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                </div>
              </div>

              {/* Product Details (Accordion for Mobile / Sections for Desktop) */}
              {isMobile ? (
                <Accordion selectionMode="multiple" variant="light" isCompact>
                  {[
                    product?.size_chart ? (
                      <AccordionItem
                        key="size-guide"
                        aria-label="Size Guide"
                        title="Size Guide"
                      >
                        <AccordionContent>
                          <div className="bg-white rounded-lg overflow-hidden">
                            <Image
                              src={product.size_chart}
                              alt="Size Chart"
                              className="w-full h-auto"
                              width={500}
                              height={500}
                              priority
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : null,
                    <AccordionItem
                      key="product-code"
                      aria-label="Product Code"
                      title="Product Code"
                    >
                      <AccordionContent>
                        <p>{product.code || "SKU-" + product._id}</p>
                      </AccordionContent>
                    </AccordionItem>,
                    <AccordionItem
                      key="product-description"
                      aria-label="Product Description"
                      title="Product Description"
                    >
                      <AccordionContent>
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                      </AccordionContent>
                    </AccordionItem>,
                    <AccordionItem
                      key="reviews"
                      aria-label="Reviews"
                      title="Reviews"
                    >
                      <AccordionContent>
                        <ProductReviews product={product} key={product._id} />
                      </AccordionContent>
                    </AccordionItem>,
                    <AccordionItem key="faqs" aria-label="FAQs" title="FAQs">
                      <AccordionContent>
                        <ProductFAQ
                          product={product}
                          isLoading={isLoading}
                          key={product._id}
                        />
                      </AccordionContent>
                    </AccordionItem>,
                  ].filter(Boolean)}
                </Accordion>
              ) : (
                <>
                  {/* Desktop sections */}
                  <div>
                    {product?.size_chart && (
                      <ProductSection title="Size Guide">
                        <div className="bg-white rounded-lg  overflow-hidden">
                          <Image
                            src={product.size_chart}
                            alt="Size Chart"
                            className="w-full h-auto"
                            width={500}
                            height={500}
                            priority
                          />
                        </div>
                      </ProductSection>
                    )}

                    <ProductSection title="Product Code">
                      <p className="text-sm text-gray-700">
                        {product.code || "SKU-" + product._id}
                      </p>
                    </ProductSection>

                    <ProductSection title="Product Description">
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </ProductSection>

                    <ProductSection title="Reviews">
                      <ProductReviews product={product} key={product._id} />
                    </ProductSection>
                    <ProductSection title="FAQs">
                      <ProductFAQ
                        product={product}
                        isLoading={isLoading}
                        key={product._id}
                      />
                    </ProductSection>
                  </div>
                </>
              )}

              {/* Buttons */}
              <ProductShareButtons
                availableQuantity={availableQuantity}
                handleAddToCart={handleAddToCart}
                product={
                  product && {
                    _id: product._id,
                    title: product.name,
                    image: product.thumbnail,
                    description: product.short_description,
                    url: productUrl,
                  }
                }
                session={session ? session : null}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
