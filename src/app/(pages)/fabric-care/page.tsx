import React from "react";
import {
  CheckCircle,
  Droplet,
  Sun,
  Wind,
  WashingMachine,
  Container,
} from "lucide-react";

const FabricCare = () => {
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Fabric & Care</h1>

      {/* Introduction */}
      <section className="mb-6">
        <p className="text-gray-600">
          At <strong>Neelabh - Hues of Blues</strong>, we use premium-quality
          fabrics to ensure comfort, durability, and elegance in every outfit.
          Our fabrics are carefully selected to provide a luxurious feel,
          breathability, and long-lasting wear.
        </p>
      </section>

      {/* Fabrics Used */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Fabrics Used in Neelabh Products
        </h2>
        <div className="space-y-2">
          {[
            "Pure Cotton – Soft, breathable, and comfortable for daily wear.",
            "Slab Cotton / Aarong Cotton – Handwoven textured fabric, stylish and airy.",
            "Silk – Smooth, lustrous, and perfect for a royal look.",
            "Endi Silk – Handwoven, eco-friendly silk that is soft and lightweight.",
            "Pure Soft Silk – Ultra-soft, lightweight silk for a luxurious feel.",
            "Half Silk – A blend of silk and cotton, offering both comfort and elegance.",
            "Balaka Silk – Durable with a shiny finish, ideal for exclusive attire.",
            "Muslin – Ultra-fine, premium-quality fabric, known for its rich heritage.",
            "Lilian – Lightweight and breathable, perfect for warm weather.",
            "Khadi Fabric – Handwoven, natural fabric with a rustic and comfortable feel.",
          ].map((fabric, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 text-gray-700"
            >
              <CheckCircle className="text-green-600 w-5 h-5" />
              <span>{fabric}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fabric Care Guidelines */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Fabric Care Guidelines
        </h2>

        {/* Cotton Care */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            Pure Cotton, Slab Cotton / Aarong Cotton
          </h3>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-blue-600" />{" "}
              <span>Hand wash in cold water using mild detergent.</span>
            </li>
            <li className="flex items-center space-x-2">
              <WashingMachine className="w-5 h-5 text-gray-600" />{" "}
              <span>
                Wash dark-colored garments separately for the first few washes.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Sun className="w-5 h-5 text-yellow-500" />{" "}
              <span>
                Avoid direct sunlight when drying to maintain color vibrancy.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <WashingMachine className="w-5 h-5 text-gray-600" />{" "}
              <span>Use the gentle cycle in washing machines.</span>
            </li>
          </ul>
        </div>

        {/* Silk Care */}
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            Silk, Endi Silk, Pure Soft Silk, Half Silk, Balaka Silk
          </h3>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-red-600" />{" "}
              <span>Dry clean only to maintain texture and color.</span>
            </li>
            <li className="flex items-center space-x-2">
              <Container className="w-5 h-5 text-gray-700" />{" "}
              <span>Use a low heat setting when ironing.</span>
            </li>
            <li className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-blue-600" />{" "}
              <span>Avoid direct contact with water or detergent.</span>
            </li>
          </ul>
        </div>

        {/* Muslin, Lilian, Khadi Care */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800">
            Muslin, Lilian, Khadi Fabric
          </h3>
          <ul className="mt-2 space-y-1 text-gray-700">
            <li className="flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-blue-600" />{" "}
              <span>
                Hand wash with mild detergent to retain the natural texture.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Sun className="w-5 h-5 text-yellow-500" />{" "}
              <span>
                Do not dry in direct sunlight to prevent color fading.
              </span>
            </li>
            <li className="flex items-center space-x-2">
              <Container className="w-5 h-5 text-gray-700" />{" "}
              <span>Use medium heat when ironing.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FabricCare;
