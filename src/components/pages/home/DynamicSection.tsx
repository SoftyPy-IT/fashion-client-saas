"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Grid, Navigation } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import Card from "@/components/Card/Card";
import CardSkeleton from "@/components/Card/CardSkeleton";
import Container from "@/components/common/Container";
import { useGetAllSectionsQuery } from "@/redux/features/storefront/storefront.api";
import { IProduct } from "@/types/products.types";
import Image from "next/image";

interface BannerImageProps {
  image: { url: string; link?: string };
  title: string;
  description?: string;
  onHover: boolean;
}

const BannerImage = ({
  image,
  title,
  description,
  onHover,
}: BannerImageProps) => (
  <a
    href={image?.link || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="block h-full"
  >
    <div className="relative h-full overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:shadow-xl">
      <Image
        height={500}
        width={500}
        src={image?.url}
        alt={title}
        className={`w-full h-full object-cover transition-transform duration-500 ${
          onHover ? "scale-105" : "scale-100"
        }`}
      />
      {title && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-white text-2xl font-semibold mb-2">{title}</h3>
            {description && <p className="text-white/90">{description}</p>}
          </div>
        </div>
      )}
    </div>
  </a>
);

interface Section {
  _id: string;
  title: string;
  description?: string;
  style?: string;
  images: {
    desktop: { url: string; link?: string }[];
    mobile?: { url: string; link?: string }[];
  };
}

const BannerSection = ({ section }: { section: Section }) => {
  const [hoveredBanner, setHoveredBanner] = useState<string | null>(null);
  const desktopImages = section.images?.desktop || [];
  const isSingleImage = desktopImages.length === 1;
  const isGridStyle = section.style === "grid";

  if (isSingleImage) {
    return (
      <Container>
        <div className="w-full my-6 md:my-8">
          <div
            onMouseEnter={() => setHoveredBanner(section._id)}
            onMouseLeave={() => setHoveredBanner(null)}
          >
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={desktopImages[0].url}
              />
              <source
                media="(max-width: 767px)"
                srcSet={
                  section.images?.mobile?.[0]?.url || desktopImages[0].url
                }
              />
              <BannerImage
                image={desktopImages[0]}
                title={section.title}
                description={section.description}
                onHover={hoveredBanner === section._id}
              />
            </picture>
          </div>
        </div>
      </Container>
    );
  }

  if (isGridStyle) {
    return (
      <Container>
        <div className="w-full my-6 md:my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {desktopImages.map((image: any, index: number) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredBanner(`${section._id}-${index}`)}
                onMouseLeave={() => setHoveredBanner(null)}
              >
                <BannerImage
                  image={image}
                  title={section.title}
                  description={section.description}
                  onHover={hoveredBanner === `${section._id}-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  }

  // Carousel style (default)
  return (
    <Container>
      <div className="w-full my-6 md:my-8">
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".banner-swiper-button-next",
              prevEl: ".banner-swiper-button-prev",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            effect="fade"
            loop={true}
            className="rounded-xl overflow-hidden"
          >
            {desktopImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  onMouseEnter={() =>
                    setHoveredBanner(`${section._id}-${index}`)
                  }
                  onMouseLeave={() => setHoveredBanner(null)}
                >
                  <picture>
                    <source media="(min-width: 768px)" srcSet={image.url} />
                    <source
                      media="(max-width: 767px)"
                      srcSet={section.images?.mobile?.[index]?.url || image.url}
                    />
                    <BannerImage
                      image={image}
                      title={section.title}
                      description={section.description}
                      onHover={hoveredBanner === `${section._id}-${index}`}
                    />
                  </picture>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className="banner-swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 group flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10 focus:outline-none hover:bg-white transition-colors duration-200"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
          </button>
          <button
            className="banner-swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 group flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full w-10 h-10 focus:outline-none hover:bg-white transition-colors duration-200"
            aria-label="Next"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-900" />
          </button>
        </div>
      </div>
    </Container>
  );
};

interface ProductSectionProps {
  section: {
    _id: string;
    title: string;
    description?: string;
    row?: number;
    products?: IProduct[];
  };
}

const ProductSection = ({ section }: ProductSectionProps) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  // Check if section has products and they are not empty
  if (!section.products || section.products.length === 0) {
    return null; // Return null to render nothing if no products exist
  }

  return (
    <Container>
      <div className="relative my-10">
        <div className="flex flex-col items-center justify-center mb-2 sm:mb-3 md:mb-6 mt-4 sm:mt-8 md:mt-12">
          {/* Ultra-compact heading for small devices, scaling up smoothly */}
          <div className="flex items-center w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto mb-0.5 sm:mb-1 md:mb-2">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray300 to-transparent"></div>
            <div className="flex-grow-0 mx-1 sm:mx-2 md:mx-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-main"></div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray300 to-transparent"></div>
          </div>

          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wider text-gray500 text-center px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 uppercase">
            {section.title}
          </h2>

          <div className="flex items-center w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl mx-auto mt-0.5 sm:mt-1 md:mt-2 mb-0.5 sm:mb-1">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray300 to-transparent"></div>
            <div className="flex-grow-0 mx-1 sm:mx-2 md:mx-3">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-brand-main"></div>
            </div>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray300 to-transparent"></div>
          </div>

          {section.description && (
            <p className="text-gray400 text-center max-w-xs sm:max-w-sm md:max-w-lg mt-1 sm:mt-2 text-xs md:text-sm italic px-2">
              {section.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-1">
          {section.products?.map((product) => (
            <div
              key={product._id}
              className="transform transition-transform duration-300 hover:-translate-y-1"
            >
              <Card
                item={{
                  id: product._id,
                  name: product.name,
                  code: product.code,
                  price: product.price,
                  img1: product.thumbnail,
                  img2: product.images[0],
                  slug: product.slug,
                  category: product.category?.name,
                  rating: product.rating,
                  reviewCount: product.reviews?.length,
                  subCategory: product.subCategory?.name,
                  mainCategory: product.mainCategory?.name,
                  availableStock: product.quantity,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

const DynamicSection = () => {
  const { data: sectionData, isLoading } = useGetAllSectionsQuery(undefined);
  const sections = sectionData?.data || [];

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div className="">
      {sections.map((section: any) => {
        if (section.type === "banner") {
          return <BannerSection key={section._id} section={section} />;
        }
        if (section.type === "product") {
          return <ProductSection key={section._id} section={section} />;
        }
        return null;
      })}
    </div>
  );
};

export default DynamicSection;
