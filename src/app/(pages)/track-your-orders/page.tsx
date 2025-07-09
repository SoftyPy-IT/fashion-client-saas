import Link from "next/link";
import React from "react";

const TrackOrderPage = () => {
  return (
    <div className=" mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Track Your Order
      </h1>
      <p className="text-gray-600 mb-4">
        To track your order, simply go to the{" "}
        <Link
          href="/track-order"
          className="text-blue-600 font-medium hover:underline"
        >
          Track Your Order
        </Link>{" "}
        page, enter your order number, and click <strong>Submit</strong>. You
        will receive real-time updates on your order status.
      </p>

      <p className="text-gray-600 mb-4">
        If you are a <strong>registered user</strong>, you can check your order
        status anytime by logging into your account and clicking on{" "}
        <strong>Order History</strong>.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">Need Help?</h2>
        <p className="text-gray-600">
          📞 Call us at:{" "}
          <span className="font-medium text-gray-700">
            (+88) 09 606 847 198
          </span>
        </p>
        <p className="text-gray-600">
          💬 WhatsApp:{" "}
          <span className="font-medium text-gray-700">01712-465160</span>
        </p>
        <p className="text-gray-600">
          📧 Email:{" "}
          <a
            href="mailto:info@fashion-client.com.bd"
            className="text-blue-600 font-medium hover:underline"
          >
            info@fashion-client.com.bd
          </a>
        </p>
        <p className="text-gray-500 text-sm">
          Available 7 days a week, 10 AM – 8 PM
        </p>
      </div>

      <div className="mt-6">
        <Link
          href="/track-order"
          className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Track Your Order
        </Link>
      </div>
    </div>
  );
};

export default TrackOrderPage;
