import Image from "next/image";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

interface ZoomImageProps {
  src: string;
  alt: string;
  disableOnMobile?: boolean;
}

function ZoomImage({ src, alt, disableOnMobile = false }: ZoomImageProps) {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(2);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate container dimensions for proper zooming
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableOnMobile && isMobile) return;

      if (containerRef.current) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();

        // Calculate position relative to container
        const x = Math.max(
          0,
          Math.min(100, ((e.clientX - left) / width) * 100),
        );
        const y = Math.max(
          0,
          Math.min(100, ((e.clientY - top) / height) * 100),
        );

        setZoomPosition({ x, y });
      }
    },
    [disableOnMobile, isMobile],
  );

  const handleMouseEnter = useCallback(() => {
    if (disableOnMobile && isMobile) return;
    setIsHovering(true);
  }, [disableOnMobile, isMobile]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  }, []);

  // Determine zoom scale based on container size and zoom level
  const zoomScale = Math.min(zoomLevel, Math.max(1.5, 600 / dimensions.width));

  return (
    <div
      ref={containerRef}
      className={`zoom-image-container relative w-full h-full ${
        disableOnMobile && isMobile ? "zoom-disabled" : ""
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {}} // Empty handler to prevent default touch behavior on mobile
    >
      {/* Base image */}
      <Image
        src={src}
        alt={alt}
        fill
        className="base-image object-contain"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={true}
        quality={90}
      />

      {/* Zoom controls */}
      {!disableOnMobile && (
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            onClick={handleZoomOut}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-5 h-5 text-gray-800" />
          </button>
          <button
            onClick={handleZoomIn}
            className="bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      )}

      {/* Zoom overlay - only show when hovering and not on mobile or when zoom is enabled */}
      {isHovering && (
        <div
          className="zoom-overlay absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            transform: `scale(${zoomScale})`,
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src={src}
            alt={`${alt} zoomed`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={true}
            quality={95}
            className="object-contain"
          />
        </div>
      )}

      {/* Zoom indicator */}
      {isHovering && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${zoomPosition.x}% ${zoomPosition.y}%, transparent 0%, rgba(0,0,0,0.1) 100%)`,
          }}
        />
      )}
    </div>
  );
}

export default React.memo(ZoomImage);
