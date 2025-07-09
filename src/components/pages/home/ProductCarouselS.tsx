"use client";

import React from "react";
import { ISection } from "@/types/storefront.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Card from "@/components/Card/Card";
import { useMediaQuery } from "react-responsive";

const ProductCarouselSection: React.FC<{ section: ISection }> = ({
  section,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });

  const getSlidesPerView = () => {
    if (isMobile) return 2;
    if (isTablet) return 2;
    return 4;
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 ">
        {/* Header Section */}
        {/* <div className=" justify-center flex">
          <div className="w-3/4 mb-4 lg:mb-8 text-center sm:w-1/2 md:w-1/3">
            <h2 className="mb-4 text-xl lg:text-3xl">
              <span className="text-primary">
                {section.title.split(" ")[0]}
              </span>{" "}
              {section.title.split(" ").slice(1).join(" ")}
            </h2>
            <span className=" text-sm lg:text-base text-gray-600">
              Explore our top categories and find the best products for you.
            </span>
          </div>
        </div> */}

        {/* Carousel Section */}
        <div className="relative  mx-auto">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={getSlidesPerView()}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".product-swiper-next",
              prevEl: ".product-swiper-prev",
            }}
            className="px-4 py-4"
            breakpoints={{
              640: { spaceBetween: 20 },
              1024: { spaceBetween: 24 },
            }}
          >
            {section.products.map((product) => (
              <SwiperSlide
                key={product._id}
                className="flex items-center justify-center"
              >
                <div className="w-full max-w-sm mx-auto">
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
                      availableStock: product.quantity,
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            className="product-swiper-prev group absolute left-4 top-1/2 -translate-y-1/2 z-10
                     h-10 w-10 rounded-full bg-blue/10 backdrop-blur-sm
                     transition-all duration-300 hover:bg-blue/20
                     flex items-center justify-center
                     border border-gray100/20 hover:border-gray100/40
                     focus:outline-none focus:ring-2 focus:ring-gray100/30"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon
              className="w-6 h-6 text-blue transition-transform duration-300
                       group-hover:scale-110 group-active:scale-95"
            />
          </button>
          <button
            className="product-swiper-next group absolute right-4 top-1/2 -translate-y-1/2 z-10
                     h-10 w-10 rounded-full bg-blue/10 backdrop-blur-sm
                     transition-all duration-300 hover:bg-blue/20
                     flex items-center justify-center
                     border border-gray100/20 hover:border-gray100/40
                     focus:outline-none focus:ring-2 focus:ring-gray100/30"
            aria-label="Next slide"
          >
            <ChevronRightIcon
              className="w-6 h-6 text-blue transition-transform duration-300
                       group-hover:scale-110 group-active:scale-95"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarouselSection;
