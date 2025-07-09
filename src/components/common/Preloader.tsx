"use client";
import Image from "next/image";

const Preloader = () => {
  return (
    <div
      className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="Loading"
          width={120}
          height={120}
          priority
        />
      </div>
    </div>
  );
};

export default Preloader;
