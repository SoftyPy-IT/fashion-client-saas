"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "@/components/common/Container";
import { useGetCategoriesTreeQuery } from "@/redux/features/products/category.api";
import Image from "next/image";

export type TCategory = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};

const CategoriesSection = () => {
  const { data: categories, isLoading } = useGetCategoriesTreeQuery(undefined);
  const data = categories as TCategory[] | undefined;
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (categories) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [categories]);

  return (
    <section className="">
      <div className="container mx-auto px-0 sm:px-6 lg:px-8">
        <Swiper
          key={key}
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 3.5 },
            480: { slidesPerView: 4 },
            640: { slidesPerView: 5 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 },
          }}
          className="categories-swiper"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-100 rounded-md animate-pulse"></div>
                    <div className="mt-2 h-4 w-16 bg-gray-100 animate-pulse"></div>
                  </div>
                </SwiperSlide>
              ))
            : data?.map((category) => (
                <SwiperSlide key={category._id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-col items-center ">
                      <div className="relative overflow-hidden rounded-md border border-gray-100">
                        <div className="relative  w-28 h-32 lg:w-48 lg:h-56">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="100%"
                            className=""
                            priority
                          />
                        </div>
                        <p className="mt-2 text-xs text-center md:text-sm font-medium text-gray-800 uppercase">
                          {category.name.length > 10
                            ? `${category.name.slice(0, 10)}...`
                            : category.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Right side link for show all */}
        {/* <div className="flex justify-end mt-4">
          <Link
            href="/products/categories"
            className="text-xs lg:text-sm font-medium text-brand-main hover:text-blue transition duration-300"
            style={{ textDecoration: "underline" }}
          >
            Show All
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CategoriesSection;
