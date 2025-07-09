import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { ISection } from "@/types/storefront.types";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BannerCarouselSection: React.FC<{ section: ISection }> = ({
  section,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const images = isMobile ? section.images.mobile : section.images.desktop;

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="h-full"
      >
        {images.map((image: any, idx) => (
          <SwiperSlide key={idx} className="relative w-full h-full">
            {image.title ? (
              // Slide with title and overlay content
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <Image
                    src={image.url}
                    alt={image.title || `Slide ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0cHBwcHx0cHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/2wBDAR"
                  />
                </div>

                {/* Gradient overlay for slides with title */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0.8) 100%)",
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
                  <div className="text-center text-white max-w-4xl mx-auto">
                    <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl drop-shadow-lg">
                      {image.title}
                    </h2>
                    {image.subTitle && (
                      <p className="mt-4 text-lg md:text-2xl lg:text-3xl drop-shadow-lg">
                        {image.subTitle}
                      </p>
                    )}
                    {image.description && (
                      <p className="mt-4 text-base md:text-lg lg:text-xl max-w-2xl mx-auto drop-shadow-lg">
                        {image.description}
                      </p>
                    )}
                    {image.link && (
                      <Link
                        href={image.link}
                        className="inline-block mt-6 px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors duration-300 font-semibold text-lg"
                      >
                        Learn More
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Slide without title - full image as link
              <Link
                href={image.link || "#"}
                className="block relative w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.url}
                    alt={`Slide ${idx + 1}`}
                    fill
                    priority={idx === 0}
                    quality={90}
                    sizes="100vw"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0cHBwcHx0cHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBz/2wBDAR"
                  />
                </div>
              </Link>
            )}
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <button
          className="swiper-button-prev group absolute left-4 top-1/2 -translate-y-1/2 z-10 
                     h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm
                     transition-all duration-300 hover:bg-black/40
                     flex items-center justify-center
                     border border-white/20 hover:border-white/40
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft
            className="w-6 h-6 text-white transition-transform duration-300 
                       group-hover:scale-110 group-active:scale-95"
          />
        </button>

        <button
          className="swiper-button-next group absolute right-4 top-1/2 -translate-y-1/2 z-10 
                     h-12 w-12 rounded-full bg-black/20 backdrop-blur-sm
                     transition-all duration-300 hover:bg-black/40
                     flex items-center justify-center
                     border border-white/20 hover:border-white/40
                     focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Next slide"
        >
          <ChevronRight
            className="w-6 h-6 text-white transition-transform duration-300 
                       group-hover:scale-110 group-active:scale-95"
          />
        </button>
      </Swiper>
    </div>
  );
};

export default BannerCarouselSection;
