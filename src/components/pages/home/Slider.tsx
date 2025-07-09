"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useGetAllSectionsQuery } from "@/redux/features/storefront/storefront.api";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Preloader from "@/components/common/Preloader";

// Brand colors
const brandColors = {
  light1: "#d5e4e9",
  light2: "#cad9de",
  main: "#134865", // Logo color
  light3: "#b6c7cc",
};

const Slider: React.FC = () => {
  const { data: sectionsData, isLoading } = useGetAllSectionsQuery(undefined);
  const sliderData = useAppSelector(selectStorefrontData);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkDeviceSize();
    window.addEventListener("resize", checkDeviceSize);
    return () => window.removeEventListener("resize", checkDeviceSize);
  }, []);

  const handlePrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (isLoading) return <Preloader />;

  if (!sliderData?.sliders?.length) return null;

  const hasMultipleSlides = sliderData.sliders.length > 1;
  const slides = hasMultipleSlides
    ? sliderData.sliders
    : [...sliderData.sliders, ...sliderData.sliders];

  return (
    <div className="relative w-full h-screen top-28 mb-32 overflow-hidden group">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        speed={1000}
        loop={hasMultipleSlides}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3 bg-white bg-opacity-50 rounded-full transition-all duration-300 hover:bg-opacity-100"></span>`;
          },
        }}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="h-full w-full"
      >
        {slides.map((item: any, index: number) => (
          <SwiperSlide key={index} className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={isMobile ? item.image.mobile : item.image.desktop}
                alt={item.title || `Fashion Slide ${index + 1}`}
                width={1920}
                height={1080}
                priority
                quality={90}
                sizes="100vw"
                className="w-full object-cover md:object-center  h-full lg:h-auto"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
              />
            </div>

            {/* Enhanced Gradient Overlay with brand colors */}

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 z-10 opacity-15 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Content Container - Positioned to be always visible */}
            <div
              className="absolute inset-x-0 z-20 px-4 sm:px-6"
              style={{
                bottom: `calc(20% + 1rem)`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-white max-w-lg mx-auto text-center"
              >
                {item.title && (
                  <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-2xl  md:text-4xl  mb-2 tracking-tight   text-shadow-md"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
                  >
                    {item.title}
                  </motion.h2>
                )}

                {item.subTitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base sm:text-base md:text-lg mb-3 font-extralight opacity-90 text-shadow-sm max-w-md mx-auto"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                  >
                    {item.subTitle}
                  </motion.p>
                )}

                {item.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link
                      href={item.link}
                      className="group inline-flex items-center px-5 py-1 sm:px-6 sm:py-2.5 text-sm sm:text-base rounded 
                      tracking-wide transition-all font-extralight duration-300 transform hover:scale-105"
                      style={{
                        background: `linear-gradient(to right, ${brandColors.main}, #1a5d82)`,
                        boxShadow: `0 2px 8px rgba(19, 72, 101, 0.4)`,
                      }}
                    >
                      Shop Now
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Custom Navigation Buttons with brand colors */}
      {hasMultipleSlides && (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between items-center px-2 sm:px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="swiper-button-slider-prev rounded-full p-1.5 transition-all duration-300 transform hover:scale-110"
            onClick={handlePrevSlide}
            style={{
              backgroundColor: `${brandColors.main}90`,
              backdropFilter: "blur(3px)",
              boxShadow: `0 2px 6px rgba(0,0,0,0.2)`,
            }}
          >
            <ChevronLeft className="text-white" size={18} />
          </button>
          <button
            className="swiper-button-slider-next rounded-full p-1.5 transition-all duration-300 transform hover:scale-110"
            onClick={handleNextSlide}
            style={{
              backgroundColor: `${brandColors.main}90`,
              backdropFilter: "blur(3px)",
              boxShadow: `0 2px 6px rgba(0,0,0,0.2)`,
            }}
          >
            <ChevronRight className="text-white" size={18} />
          </button>
        </div>
      )}

      {/* Enhanced Custom Pagination with brand colors */}
      <div className="custom-pagination absolute bottom-36 sm:bottom-40 md:bottom-32 left-1/2 -translate-x-1/2 z-30 flex space-x-3"></div>
    </div>
  );
};

export default Slider;
