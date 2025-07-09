"use client";

import Image from "next/image";

const IncorporationCertificate = () => {
  return (
    <>
      <div className="mb-4 sm:mb-6 border-b border-gray-200 pb-4 sm:pb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Incorporation Certificate
        </h1>
      </div>
      <Image
        src="/Incorporation-Certificate.jpg"
        alt="Trade License"
        width={800}
        height={600}
        className="mx-auto"
      />
    </>
  );
};

export default IncorporationCertificate;
