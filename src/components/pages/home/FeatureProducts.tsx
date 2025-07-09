"use client";

import Card from "@/components/Card/Card";
import CardSkeleton from "@/components/Card/CardSkeleton";
import Container from "@/components/common/Container";
import ServerErrorMessage from "@/components/common/ServerErrorMessage";
import { useGetAllProductsQuery } from "@/redux/features/products/product.api";
import { IProduct } from "@/types/products.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FeatureProducts = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductsQuery([{ name: "is_featured", value: true }]);

  const [key, setKey] = useState(0); // Key state to force re-render
  const data = products?.data as IProduct[];

  useEffect(() => {
    if (products) {
      setKey((prevKey) => prevKey + 1); // Update key on data load
    }
  }, [products]);

  if (error) return <ServerErrorMessage />;

  if (!data || data.length === 0) return null;

  return (
    <>
      <Container>
        <div className="relative  py-5 my-5 md:my-10">
          <div className="flex justify-center">
            <div className="w-full mb-8 text-center sm:w-1/2 md:w-1/3">
              <h2 className="mb-4 text-3xl">Featured Products</h2>
              <span>
                Explore our wide range of featured products and find the perfect
                product for you or your loved ones.
              </span>
            </div>
          </div>

          <div className="ml-auto mb-5">
            <div className="flex space-x-2 justify-end">
              <button
                className={`custom-swiper-button-prev-feature flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
                aria-label="Previous feature"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                className={`custom-swiper-button-next-feature flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
                aria-label="Next feature"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Swiper
            key={key}
            modules={[Navigation, Autoplay, Grid]}
            spaceBetween={10}
            slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 4}
            navigation={{
              nextEl: ".custom-swiper-button-next-feature",
              prevEl: ".custom-swiper-button-prev-feature",
            }}
            autoplay={{ delay: 3000 }}
            grabCursor={true}
            grid={{
              rows: 2,
              fill: "row",
            }}
            className="mySwiper"
          >
            {isLoading
              ? Array.from({
                  length: isSmallScreen ? 2 : isMediumScreen ? 3 : 5,
                }).map((_, index) => (
                  <SwiperSlide key={index}>
                    <CardSkeleton />
                  </SwiperSlide>
                ))
              : data?.map((product) => (
                  <SwiperSlide key={product._id} className="swiper-slide">
                    <Card
                      key={product._id}
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
                        reviewCount: product.reviews.length,
                        subCategory: product.subCategory?.name,
                        mainCategory: product.mainCategory?.name,
                        availableStock: product.quantity,
                      }}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </Container>
    </>
  );
};

export default FeatureProducts;
