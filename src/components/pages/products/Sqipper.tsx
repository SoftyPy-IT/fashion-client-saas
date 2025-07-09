import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function ProductImageGallery({
  images = [],
}: {
  images: string[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const productImages = images.length > 0 ? images : [];

  const scrollThumbnails = (direction: "up" | "down") => {
    const container = document.getElementById("thumbnail-container");
    if (!container) return;
    const scrollAmount = 120;
    container.scrollTop += direction === "up" ? -scrollAmount : scrollAmount;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-4 mx-auto ">
      {/* Main Image Display */}
      <div className="flex-1 relative order-1">
        <div
          className="relative bg-gray-50 rounded-xl overflow-hidden group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
        >
          <div className="relative overflow-hidden">
            <Image
              src={productImages[selectedImage]}
              width={1000}
              height={1000}
              alt={`Product main view ${selectedImage + 1}`}
              className="w-full transition-transform duration-300"
              style={{
                transform: isZoomed ? "scale(2)" : "scale(1)",
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
              }}
            />
            {isZoomed && (
              <div className="absolute inset-0 bg-black bg-opacity-5 pointer-events-none" />
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
            {selectedImage + 1} / {productImages.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Column - Hidden on mobile, shown at bottom */}
      <div className="flex flex-row lg:flex-col w-full lg:w-24 order-2">
        {/* Scroll Up Button - Only visible on desktop */}
        {productImages.length > 4 && (
          <button
            onClick={() => scrollThumbnails("up")}
            className="hidden lg:block mb-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <ChevronUp className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Thumbnails Container */}
        <div
          id="thumbnail-container"
          className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-hide  w-full p-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {productImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-20 h-24 lg:h-28 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg transform flex-shrink-0 ${
                selectedImage === index
                  ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              style={{
                animation:
                  selectedImage === index ? "pulse 2s infinite" : "none",
              }}
            >
              <Image
                src={image}
                width={300}
                height={300}
                alt={`Product ${index + 1}`}
                className="w-full h-full transition-transform duration-300 hover:scale-110"
              />
              {selectedImage === index && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-20 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
