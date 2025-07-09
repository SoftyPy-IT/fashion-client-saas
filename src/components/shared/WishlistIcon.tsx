"use client";

import { useCallback, useEffect, useState } from "react";

import { selectProfile } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Heart } from "lucide-react";

import Link from "next/link";
import React from "react";

const WishlistIcon = () => {
  const [animate, setAnimate] = useState("");
  const profile = useAppSelector(selectProfile);
  const noOfWishlist = profile?.wishlist?.length || 0;

  const handleAnimate = useCallback(() => {
    if (noOfWishlist === 0) return;
    setAnimate("animate__animated animate__headShake");
  }, [noOfWishlist, setAnimate]);

  // Set animate when no of wishlist changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  return (
    <div className="relative cursor-pointer">
      <Link href="/wishlist" passHref>
        <Heart className="w-5 h-5 text-brand-main" />
        {noOfWishlist > 0 && (
          <span
            className={`absolute -top-2 -right-2 sm:-top-3 sm:-right-3 text-xs sm:text-sm bg-brand-main text-white px-1 sm:px-2 py-0.5 rounded-full font-medium shadow-md animate-bounce`}
          >
            {noOfWishlist}
          </span>
        )}
      </Link>
    </div>
  );
};

export default WishlistIcon;
