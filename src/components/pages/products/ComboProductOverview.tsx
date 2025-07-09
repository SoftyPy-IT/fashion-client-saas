"use client";

import React, { useState, useEffect, useMemo, PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, changeItemQuantity } from "@/redux/features/cart";
import { IProduct } from "@/types/products.types";
import { BoltIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
} from "@heroui/react";
import formatPrice from "@/utils/formatPrice";
import Button from "@/components/buttons/Button";
import GhostButton from "@/components/buttons/GhostButton";
import Image from "next/image";
import ImageGallery from "./ImageGallery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Preloader from "@/components/common/Preloader";
import ProductReviews from "./ProductReviews";
import ProductFAQ from "./ProductFAQ";
import ProductShareButtons from "./ProductShareButtons";

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

interface IComboProductOverview {
  product: IProduct;
  isLoading: boolean;
  items: IProduct[];
  session?: any;
}

const ComboProductOverview = ({
  product,
  isLoading,
  items,
  session,
}: IComboProductOverview) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const router = useRouter();
  const isMobile = !useMediaQuery("(min-width: 768px)");

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [itemQuantities, setItemQuantities] = useState<{
    [key: string]: number;
  }>({});
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: { [variantName: string]: string };
  }>({});

  useEffect(() => {
    if (items) {
      const initialQuantities: { [key: string]: number } = {};
      const initialVariants: {
        [key: string]: { [variantName: string]: string };
      } = {};

      items.forEach((item) => {
        initialQuantities[item._id] = 1;
        if (item.variants) {
          initialVariants[item._id] = {};
          item.variants.forEach((variant) => {
            initialVariants[item._id][variant.name] =
              variant.values[0]?.value || "";
          });
        }
      });

      setItemQuantities(initialQuantities);
      setSelectedVariants(initialVariants);
      setSelectedItems(items.map((item) => item._id));
    }
  }, [items]);

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const updateItemQuantity = (itemId: string, delta: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) + delta),
    }));
  };

  const handleVariantChange = (
    itemId: string,
    variantName: string,
    value: string,
  ) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [variantName]: value,
      },
    }));
  };

  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, itemId) => {
      const item = items.find((i) => i._id === itemId);
      if (!item) return total;
      const price = item.discount_price || item.price;
      return total + price * (itemQuantities[itemId] || 1);
    }, 0);
  };

  const handleAddToCart = () => {
    if (selectedItems.length === 0) {
      toast.error("Please select at least one item");
      return;
    }

    selectedItems.forEach((itemId) => {
      const item = items.find((i) => i._id === itemId);
      if (!item) return;

      const selectedVariantsList = item.variants
        ? Object.entries(selectedVariants[itemId] || {}).map(
            ([name, value]) => ({ name, value }),
          )
        : undefined;

      const cartItem = {
        productId: item._id,
        name: item.name,
        code: item.code,
        thumbnail: item.thumbnail,
        price: item.discount_price || item.price,
        quantity: itemQuantities[itemId] || 1,
        totalPrice:
          (item.discount_price || item.price) * (itemQuantities[itemId] || 1),
        variants: selectedVariantsList,
        taxMethod: item.taxMethod,
        productTax: item.productTax && {
          type: item.productTax.type,
          rate: item.productTax.rate,
        },
        availableStock: item.quantity,
      };

      const existingCartItem = cartItems.find((cItem) => {
        if (cItem.productId !== cartItem.productId) return false;

        // Check if all variants match
        if (!cItem.variants || !cartItem.variants)
          return cItem.productId === cartItem.productId;

        if (cItem.variants.length !== cartItem.variants.length) return false;

        return cItem.variants.every((itemVariant) => {
          const matchingVariant = cartItem.variants?.find(
            (v) => v.name === itemVariant.name,
          );
          return matchingVariant && matchingVariant.value === itemVariant.value;
        });
      });

      if (existingCartItem) {
        dispatch(
          changeItemQuantity({
            productId: cartItem.productId,
            quantity: existingCartItem.quantity + (itemQuantities[itemId] || 1),
            variants: cartItem.variants,
          }),
        );
      } else {
        dispatch(addToCart(cartItem));
      }
    });

    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  // Calculate discount percentage for the entire combo
  const discountPercentage = useMemo(() => {
    if (!items || items.length === 0) return 0;

    const totalOriginalPrice = items.reduce((sum, item) => sum + item.price, 0);
    const totalDiscountPrice = items.reduce(
      (sum, item) => sum + (item.discount_price || item.price),
      0,
    );

    if (totalOriginalPrice > totalDiscountPrice) {
      return Math.round(
        ((totalOriginalPrice - totalDiscountPrice) / totalOriginalPrice) * 100,
      );
    }
    return 0;
  }, [items]);

  if (isLoading) return <Preloader />;
  if (!product) return null;

  return (
    <div className="bg-white w-full mt-36 relative">
      <div className="py-4  max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12">
          {/* Left: Product Gallery */}
          <div className="lg:col-span-7  rounded-2xl ">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <div className="space-y-2">
              {/* Product Header */}
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Price & Discount Info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between ">
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl md:text-3xl text-brand-main">
                    {formatPrice(calculateTotalPrice())}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      Save {discountPercentage}%
                    </span>
                  )}
                </div>
              </div>

              {/* Combo Items Selection */}
              <div className="mt-6">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-200 hover:shadow-md"
                    >
                      <div className="p-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          {/* Checkbox and Title Row */}
                          <div className="flex items-start gap-4 flex-1">
                            <Checkbox
                              checked={selectedItems.includes(item._id)}
                              onChange={() => toggleItemSelection(item._id)}
                              isSelected={selectedItems.includes(item._id)}
                              className="mt-1"
                            />

                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {formatPrice(item.discount_price || item.price)}
                              </p>
                            </div>
                          </div>

                          {/* Variants and Quantity Row */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4 ml-8 sm:ml-0">
                            {/* Variants */}
                            <div className="flex items-center h-8 border border-gray-300 rounded flex-shrink-0">
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                                onClick={() => updateItemQuantity(item._id, -1)}
                                disabled={!selectedItems.includes(item._id)}
                              >
                                <span className="text-xl font-semibold">-</span>
                              </button>
                              <div className="w-10 h-8 flex items-center justify-center border-x border-gray-300">
                                <span className="font-medium">
                                  {itemQuantities[item._id] || 1}
                                </span>
                              </div>
                              <button
                                className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                                onClick={() => updateItemQuantity(item._id, 1)}
                                disabled={!selectedItems.includes(item._id)}
                              >
                                <span className="text-xl font-semibold">+</span>
                              </button>
                            </div>
                            {item.variants &&
                              selectedItems.includes(item._id) && (
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  {item.variants.map((variant) => (
                                    <div
                                      key={variant.name}
                                      className="flex items-center gap-1"
                                    >
                                      <span className="text-xs text-gray-600 whitespace-nowrap">
                                        {variant.name}:
                                      </span>
                                      <select
                                        value={
                                          selectedVariants[item._id]?.[
                                            variant.name
                                          ] || ""
                                        }
                                        onChange={(e) =>
                                          handleVariantChange(
                                            item._id,
                                            variant.name,
                                            e.target.value,
                                          )
                                        }
                                        className="h-8 px-1 text-xs border border-gray-300 rounded bg-white text-gray-700 appearance-none focus:outline-none focus:ring-1 focus:ring-brand-main w-14"
                                      >
                                        {variant.values.map((value) => (
                                          <option
                                            key={value.value}
                                            value={value.value}
                                          >
                                            {value.name}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  ))}
                                </div>
                              )}

                            {/* Quantity Controls */}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Details (Accordion for Mobile / Sections for Desktop) */}
              {isMobile ? (
                <Accordion
                  className="w-full text-sm mt-6"
                  selectionMode="multiple"
                  variant="light"
                >
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
                <div className="">
                  <ProductSection title="Size Guide">
                    <div className="bg-white rounded-lg overflow-hidden">
                      {items.map(
                        (item) =>
                          item.size_chart && (
                            <div key={item._id} className="flex flex-col gap-2">
                              <h3 className="text-sm font-medium text-gray-900 mb-2">
                                {item.name}
                              </h3>
                              <Image
                                src={item.size_chart}
                                alt="Size Chart"
                                className="w-full h-auto"
                                width={500}
                                height={500}
                                priority
                              />
                            </div>
                          ),
                      )}
                    </div>
                  </ProductSection>

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
              )}

              {/* Summary and Total */}

              {/* Buttons */}
              <ProductShareButtons
                availableQuantity={100000000}
                handleAddToCart={handleAddToCart}
                product={
                  product && {
                    _id: product._id,
                    title: product.name,
                    image: product.thumbnail,
                    description: product.short_description,
                    url: `${window.location.origin}/products/${
                      product.slug || product._id
                    }`,
                  }
                }
                session={session}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComboProductOverview;
