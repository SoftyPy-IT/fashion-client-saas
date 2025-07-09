import React from "react";
import { Banknote, Smartphone, Building2, Mail } from "lucide-react";

const BillingPayments = () => {
  return (
    <div className=" mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Billing & Payments
      </h1>

      {/* Introduction */}
      <section className="mb-6">
        <p className="text-gray-600">
          At <strong>fashion-client - Hues of Blues</strong>, we provide flexible and
          secure payment options for our customers. Please check the details
          below for payment methods available for orders within Bangladesh.
        </p>
      </section>

      {/* Payment Methods */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Payment Methods for Deliveries within Bangladesh
        </h2>
        <p className="text-gray-600 mb-4">
          Customers placing orders for delivery within Bangladesh can make
          payments through the following options:
        </p>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
            <Smartphone className="text-blue-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">
              Bkash (Mobile Banking)
            </span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
            <Smartphone className="text-red-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">
              Nagad (Mobile Banking)
            </span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
            <Building2 className="text-green-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">Bank Transfer</span>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-100 rounded-lg">
            <Banknote className="text-yellow-600 w-6 h-6" />
            <span className="text-gray-700 font-medium">
              Cash on Delivery (COD){" "}
              <span className="text-sm text-gray-500">
                (Available for select locations)
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Invoice Information */}
      <section className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-lg font-semibold text-blue-700">
          Invoice & Order Confirmation
        </h2>
        <p className="text-gray-600 mt-2">
          We will send a system-generated invoice via <strong>email</strong>{" "}
          after your order is confirmed. If you are a{" "}
          <strong>registered user</strong>, you can also view your invoice
          anytime from your account on
          <a
            href="https://fashion-client.com.bd"
            className="text-blue-600 font-medium hover:underline"
          >
            {" "}
            fashion-client.com.bd
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default BillingPayments;
