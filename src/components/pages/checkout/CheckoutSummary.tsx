"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  selectOrderSummary,
  selectCoupon,
  setOrderSummary,
} from "@/redux/features/orders/orderSlice";
import formatPrice from "@/utils/formatPrice";
import { selectCartItems } from "@/redux/features/cart";
import { Avatar } from "@heroui/react";
import CouponForm from "@/components/Cart/CouponForm";
import { MapPin } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";

const CheckoutSummary: React.FC = () => {
  const dispatch = useAppDispatch();
  const orderSummary = useAppSelector(selectOrderSummary);
  const cartItems = useAppSelector(selectCartItems);
  const coupon = useAppSelector(selectCoupon);
  const [shippingLocation, setShippingLocation] = useState("outside");
  const pathName = usePathname();
  console.log(pathName);
  // Calculate subtotal
  const subTotal = cartItems?.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0,
  );

  // Calculate discount
  const discount = coupon
    ? coupon.discountType === "percentage"
      ? (subTotal * coupon.discount) / 100
      : coupon.discount
    : 0;

  // Calculate shipping charge based on location
  const shippingCharge = shippingLocation === "inside" ? 80 : 150;

  // Calculate total
  const total = subTotal - discount + shippingCharge;

  // Update order summary when values change
  useEffect(() => {
    dispatch(
      setOrderSummary({
        subTotal,
        discount,
        shippingCharge,
        total,
      }),
    );
  }, [subTotal, discount, shippingCharge, total, dispatch]);

  return (
    <section
      aria-labelledby="summary-heading"
      className="rounded-lg bg-white border border-gray100 shadow-sm px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 lg:sticky lg:top-32 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto order-first lg:order-last"
    >
      <h2
        id="summary-heading"
        className="text-xl font-semibold text-gray-900 mb-6"
      >
        Order summary
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 border-b border-gray200 pb-4"
          >
            <Avatar
              src={item.thumbnail}
              alt={item.name}
              className="w-18 h-20 sm:w-20 sm:h-24 rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Quantity: {item.quantity}
              </p>
              <p className="text-base font-medium text-gray-900 mt-2">
                {formatPrice(item.price)}
              </p>
            </div>
          </div>
        ))}

        <div className="space-y-4 pt-4">
          <CouponForm />

          {/* Shipping Location Selector */}
          <div className="border-t border-gray200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-brand-main" />
              <h3 className="text-base font-medium text-gray-900">
                Shipping Location
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShippingLocation("inside")}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  shippingLocation === "inside"
                    ? "border-brand-main bg-brand-main/5"
                    : "border-gray200 hover:border-brand-main/50"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="font-medium text-gray-900">
                    Inside Dhaka
                  </span>
                  <span className="text-sm text-gray-500 mt-1">৳80</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setShippingLocation("outside")}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  shippingLocation === "outside"
                    ? "border-brand-main bg-brand-main/5"
                    : "border-gray200 hover:border-brand-main/50"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="font-medium text-gray-900">
                    Outside Dhaka
                  </span>
                  <span className="text-sm text-gray-500 mt-1">৳150</span>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <dt className="text-base text-gray-600">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900">
                {formatPrice(subTotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray200 pt-3">
              <dt className="text-base text-gray-600">Discount</dt>
              <dd className="text-base font-medium text-green-600">
                - {formatPrice(discount)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray200 pt-3">
              <dt className="text-base text-gray-600">Shipping</dt>
              <dd className="text-base font-medium text-gray-900">
                {formatPrice(shippingCharge)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray200 pt-3">
              <dt className="text-lg font-semibold text-gray-900">Total</dt>
              <dd className="text-xl font-bold text-gray-900">
                {formatPrice(total)}
              </dd>
            </div>

            {/* Conditional rendering based on pathname */}
            {pathName === "/cart" ? (
              <Link href="/checkout" className="block w-full mt-4">
                <button className="w-full bg-[#134865] text-white font-semibold py-3 rounded-md hover:bg-[#0f3b53] focus:ring-4 focus:ring-[#d5e4e9] transition duration-200">
                  Proceed to Checkout
                </button>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSummary;
