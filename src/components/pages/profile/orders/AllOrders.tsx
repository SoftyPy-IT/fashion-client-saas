"use client";

import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import formatPrice from "@/utils/formatPrice";
import { Spinner } from "@heroui/react";
import { Calendar, CreditCard, MapPin, Package, RefreshCw } from "lucide-react";
import Link from "next/link";

const AllOrders = () => {
  const {
    data: profile,
    isSuccess: profileSuccess,
    error: profileError,
    isLoading,
    isFetching,
    refetch,
  } = useGetProfileQuery(undefined);

  const orders = profile?.data?.orders;

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center">
          <Spinner className="w-8 h-8 text-brand-main" />
          <p className="mt-2 text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-red-600 font-semibold text-lg mb-2">
          Unable to load orders
        </h3>
        <p className="text-red-500 mb-4">
          We encountered a problem while loading your orders. Please try again
          later.
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition duration-150 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 p-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-700">My Orders</h1>
            <p className="text-gray-500 mt-1">
              Track and manage your purchase history
            </p>
          </div>
          <button
            onClick={refetch}
            className="mt-3 sm:mt-0 px-4 py-2 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200 transition duration-150 flex items-center space-x-2 text-sm"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {orders && orders.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {orders.map((order: any) => (
            <Link
              href={`/profile/orders/${order._id}`}
              key={order._id}
              className="block  transition duration-150"
            >
              <div className="p-6">
                <div className="sm:flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img
                        src={
                          order?.orderItems?.[0]?.thumbnail ||
                          "/fallback-thumbnail.png"
                        }
                        alt="Order Thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-700 line-clamp-1">
                        {order?.orderItems?.[0]?.name}
                        {order?.orderItems?.length > 1 && (
                          <span className="text-gray-500 text-sm ml-1">
                            +{order.orderItems.length - 1} more items
                          </span>
                        )}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">
                          #{order._id.slice(-6)}
                        </span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "delivered"
                          ? "bg-green text-green-600"
                          : order.status === "shipped"
                          ? "bg-blue text-blue-600"
                          : "bg-yellow text-yellow-600"
                      }`}
                    >
                      {order.status === "delivered"
                        ? "Delivered"
                        : order.status === "shipped"
                        ? "Shipped"
                        : "Processing"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Order Date</p>
                      <p className="text-sm text-gray-700">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                    <CreditCard className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Payment Method</p>
                      <p className="text-sm text-gray-700 capitalize">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md">
                    <Package className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-sm font-medium text-brand-main">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start space-x-3 bg-gray-50 p-3 rounded-md">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Shipping Address</p>
                    <p className="mt-1 text-sm font-medium text-gray-800">
                      {[
                        order?.shippingAddress?.line1,
                        order?.shippingAddress?.line2,
                        order?.shippingAddress?.upazila,
                        order?.shippingAddress?.district,
                        order?.shippingAddress?.division,
                        order?.shippingAddress?.country,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-gray-700 font-medium text-lg">
            {orders.length > 0 ? "No matching orders" : "No orders yet"}
          </h3>
          <p className="text-gray-500 mt-1 text-center max-w-md">
            {orders.length > 0
              ? "Try adjusting your search or filter to find what you're looking for."
              : "When you place an order, it will appear here for you to track."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
