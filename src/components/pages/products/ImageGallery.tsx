import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import ZoomImage from "./ZoomImage";

const MemoizedZoomImage = React.memo(ZoomImage);

interface ImageGalleryProps {
  images: string[];
  productName: string;
  disableZoomOnMobile?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  disableZoomOnMobile = true,
}) => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check viewport size
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => {
      window.removeEventListener("resize", checkViewport);
    };
  }, []);

  const slider1Settings = {
    arrows: true,
    adaptiveHeight: true,
    infinite: false,
    lazyLoad: "ondemand" as const,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
        },
      },
    ],
  };

  const slider2Settings = {
    arrows: false,
    slidesToShow: isDesktop ? 4 : 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    vertical: isDesktop,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          vertical: false,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 576,
        settings: {
          vertical: false,
          slidesToShow: 4,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="image-gallery-container" ref={containerRef}>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        {/* Thumbnails - Vertical on desktop, horizontal on mobile */}
        <div className="md:w-1/6 lg:w-1/6 order-2 md:order-1">
          <div className="thumbnail-container">
            <Slider
              asNavFor={nav1 || undefined}
              ref={(slider: Slider | null) => setNav2(slider)}
              {...slider2Settings}
            >
              {images.map((image, index) => (
                <div key={index} className="slider-item p-1 cursor-pointer">
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    width={100}
                    height={133}
                    className="w-full h-auto object-cover rounded"
                    loading="lazy"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Main Image */}
        <div className="md:w-5/6 lg:w-5/6 order-1 md:order-2">
          <div className="image-gallery-main">
            <Slider
              asNavFor={nav2 || undefined}
              ref={(slider: Slider | null) => setNav1(slider)}
              {...slider1Settings}
            >
              {images.map((image, index) => (
                <div key={index} className="main-slide">
                  <MemoizedZoomImage
                    src={image}
                    alt={`${productName} image ${index + 1}`}
                    disableOnMobile={disableZoomOnMobile}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageGallery);
