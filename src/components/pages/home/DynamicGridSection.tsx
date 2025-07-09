import React from "react";
import { useMediaQuery } from "react-responsive";
import { ISection } from "@/types/storefront.types";
import Image from "next/image";
import Link from "next/link";

const BannerGridSection: React.FC<{ section: ISection }> = ({ section }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const images = isMobile ? section.images.mobile : section.images.desktop;

  return (
    <div className="relative slide-container w-full h-screen">
      {/* Title Section - Only show if exists */}
      {(section.title || section.subTitle) && (
        <div className="absolute top-0 left-0 right-0 z-10 text-center p-4 text-white bg-black/30">
          {section.title && (
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              {section.title}
            </h2>
          )}
          {section.subTitle && (
            <p className="mt-2 text-base md:text-lg">{section.subTitle}</p>
          )}
        </div>
      )}

      {/* Images Grid */}
      <div
        className={`h-full ${
          section.row === 1 ? "grid-cols-1" : "grid grid-cols-1 md:grid-cols-2"
        }`}
      >
        {images.map((image: any, idx) => (
          <Link
            key={idx}
            href={image.link || "#"}
            className="relative block h-full w-full overflow-hidden"
          >
            <Image
              src={image.url}
              alt={`${section.title || "Banner"} - Image ${idx + 1}`}
              className="w-full h-full object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={idx === 0}
              quality={90}
            />
            <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 hover:opacity-0" />
          </Link>
        ))}
      </div>

      {/* Description - Only show if exists */}
      {section.description && (
        <div className="absolute bottom-0 left-0 right-0 z-10 text-center p-4 text-white bg-black/30">
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            {section.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default BannerGridSection;
