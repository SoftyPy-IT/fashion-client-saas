"use client";

import React, { useEffect, useState } from "react";
import { useGetAllOffersQuery } from "@/redux/features/storefront/storefront.api";
import { IOffers } from "@/types/storefront.types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Grid } from "swiper/modules";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { IProduct } from "@/types/products.types";
import formatPrice from "@/utils/formatPrice";
import Link from "next/link";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import moment from "moment";
import Card from "@/components/Card/Card";
import { useMediaQuery } from "react-responsive";
import CardSkeleton from "@/components/Card/CardSkeleton";
import Container from "@/components/common/Container";

const DealsOffer: React.FC = () => {
  const { data: offers, isLoading, isError } = useGetAllOffersQuery(undefined);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [key, setKey] = useState(0);
  const data = offers?.data as IOffers[];
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  useEffect(() => {
    if (offers && offers.data && offers.data.length > 0) {
      const endDate = moment(data[0]?.endDate).valueOf();
      const interval = setInterval(() => {
        const now = moment().valueOf();
        const distance = endDate - now;
        setRemainingTime(distance);
        if (distance < 0) {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data, offers]);

  useEffect(() => {
    if (offers) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [offers]);

  if (isError || !offers) return <div>Error loading offers.</div>;

  if (!data || data.length === 0) return null;

  const formatTime = (time: number): string => {
    const duration = moment.duration(time);
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Container>
      {data.map((offer) => (
        <div key={offer._id} className="bg-white mt-2 mb-10 rounded-lg ">
          <div className="flex justify-center">
            <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
              <h2 className="mb-4 text-3xl">{offer.title}</h2>
              <span className="text-lg">
                {remainingTime > 0 ? (
                  <span>
                    Hurry! Only {formatTime(remainingTime)} left to grab this
                    offer.
                  </span>
                ) : (
                  <span>
                    This offer has ended. Stay tuned for more exciting deals!
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="ml-auto mb-5">
            <div className="flex space-x-2 justify-end">
              <button
                className={`swiper-button-prev-offer-${offer._id} flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
                aria-label="Previous feature"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button
                className={`swiper-button-next-offer-${offer._id} flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
                aria-label="Next feature"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="w-full h-full py-4">
            <Swiper
              key={key}
              modules={[Navigation, Autoplay, Grid]}
              spaceBetween={10}
              slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 4}
              navigation={{
                nextEl: `.swiper-button-next-offer-${offer._id}`,
                prevEl: `.swiper-button-prev-offer-${offer._id}`,
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
                    length: isSmallScreen ? 2 : isMediumScreen ? 3 : 4,
                  }).map((_, index) => (
                    <SwiperSlide key={index}>
                      <CardSkeleton />
                    </SwiperSlide>
                  ))
                : offer.products.map((product: IProduct) => (
                    <SwiperSlide key={product._id}>
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
                          availableStock: product.quantity,
                        }}
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default DealsOffer;
