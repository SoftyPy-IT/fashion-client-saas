"use client";

import Facebook from "@/icons/Facebook";
import Instragram from "@/icons/Instragram";
import Linkedin from "@/icons/Linkedin";
import Twitter from "@/icons/Twitter";
import Youtube from "@/icons/Youtube";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import { Mail, MapPin, Phone } from "lucide-react";

const TermsAndConditionsPage = () => {
  const data = useAppSelector(selectStorefrontData);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { termsAndConditions } = data.pages;

  return (
    <section className="min-h-screen  relative ">
      {/* Hero Section with Background */}
      {/* <div className="absolute top-0 left-0 w-full h-80 bg-brand-main opacity-70 z-0"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        {/* About Us Header */}
        <div className="mb-24  mx-auto">
          <div className="bg-white rounded-xl  p-10  relative">
            <h1 className="text-center text-5xl font-bold text-brand-main mb-6">
              Terms & Conditions
            </h1>
            <div className="w-24 h-1.5 bg-blue mx-auto mb-8"></div>
            <div
              className="text-gray-700 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: termsAndConditions }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsPage;
