import React from "react";

const ShippingDelivery = () => {
  return (
    <div className=" mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Shipping & Delivery
      </h1>

      {/* Shipping Locations */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Shipping Locations
        </h2>
        <p className="text-gray-600">
          We currently ship to all areas within <strong>Bangladesh</strong>.
          Please note that we do not ship outside Bangladesh and do not have any
          physical outlets or stores.
        </p>
      </section>

      {/* Shipping Methods & Time */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Shipping Methods & Time
        </h2>
        <p className="text-gray-600">
          Once your order is processed, the shipping method you choose at
          checkout will determine how quickly your package arrives.
        </p>
      </section>

      {/* Shipping Cost Table */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Shipping Cost
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">Shipping Type</th>
                <th className="p-3 text-left">Estimated Delivery Time</th>
                <th className="p-3 text-left">Shipping Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 text-gray-600">Shipping (Inside Dhaka)</td>
                <td className="p-3 text-gray-600">48 hours</td>
                <td className="p-3 font-semibold">BDT 80</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">
                  Standard Shipping (Outside Dhaka)
                </td>
                <td className="p-3 text-gray-600">2-3 business days</td>
                <td className="p-3 font-semibold">BDT 150</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">
                  Family Set, Couple Set (Inside Dhaka)
                </td>
                <td className="p-3 text-gray-600">5-6 business days</td>
                <td className="p-3 font-semibold">BDT 80</td>
              </tr>
              <tr>
                <td className="p-3 text-gray-600">
                  Family Set, Couple Set (Outside Dhaka)
                </td>
                <td className="p-3 text-gray-600">5-6 business days</td>
                <td className="p-3 font-semibold">BDT 150</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
        <h2 className="text-lg font-semibold text-yellow-700">
          Important Notice
        </h2>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Once an order is shipped, it cannot be canceled or modified.</li>
          <li>
            Your order may be split into multiple shipments based on product
            availability.
          </li>
        </ul>
      </section>

      {/* Contact Support */}
      <section className="mt-6">
        <p className="text-gray-700">
          For further assistance, feel free to contact our{" "}
          <span className="font-medium text-blue-600">
            customer support team
          </span>
          .
        </p>
      </section>
    </div>
  );
};

export default ShippingDelivery;
