"use client";

import React from "react";

import Image from "next/image";

import Link from "next/link";

interface OrderProps {
  id: string;
}

const OrderSuccess: React.FC<OrderProps> = ({ id }) => {
  return (
    <main className="min-h-screen relative  py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center top-20 bottom-0 mb-20">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl p-8 text-center border border-brand-light1">
        <div className="relative w-[300px] h-[300px] mx-auto">
          <Image
            src="/order-success.jpg"
            alt="Order Success"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-3xl font-bold mt-6 text-brand-main">Thank You!</h1>
        <p className="text-lg mt-2 text-gray-600">
          Your order has been successfully placed.
        </p>
        <p className="text-lg font-semibold mt-4 text-brand-main">
          Order ID: {id}
        </p>
        <div className="mt-8 space-y-4">
          <Link
            href="/track-order"
            className="inline-block px-8 py-3 bg-brand-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Track Your Order
          </Link>
          <div>
            <Link
              href="/"
              className="inline-block px-8 py-3 text-brand-main hover:text-opacity-80 transition-colors duration-200 border border-brand-main rounded-lg hover:bg-brand-light1"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccess;
