"use client";

import {
  useAddOrRemoveWishlistMutation,
  useGetProfileQuery,
} from "@/redux/features/auth/authApi";
import React, { useEffect } from "react";

import { setProfile } from "@/redux/features/auth/authSlice";
import { addToCart, changeItemQuantity } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArrowLeftCircle as LeftArrow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Button from "../buttons/Button";
import GhostButton from "../buttons/GhostButton";

const WishListItems: React.FC = () => {
  const { data: profile, isSuccess } = useGetProfileQuery(undefined);
  const [addOrRemoveWishlist] = useAddOrRemoveWishlistMutation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (isSuccess && profile?.data) {
      dispatch(setProfile(profile.data));
    }
  }, [dispatch, isSuccess, profile]);

  const handleRemoveFromWishList = async (productId: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const action = "remove";
      const data = { productId, action };
      await addOrRemoveWishlist(data).unwrap();
      toast.success("Removed from wishlist", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const clearWishlist = async () => {
    const toastId = toast.loading("Clearing wishlist...");
    try {
      for (const item of profile?.data?.wishlist || []) {
        await handleRemoveFromWishList(item.id);
      }
      toast.success("Wishlist cleared", { id: toastId });
    } catch (error) {
      toast.error("Failed to clear wishlist", { id: toastId });
    }
  };

  const addOne = (item: any) => {
    const cartItem = {
      productId: item.id,
      name: item.name,
      thumbnail: item.thumbnail,
      price: item.price,
      quantity: 1,
      totalPrice: item.price,
      variants: [],
      taxMethod: "inclusive",
      productTax: null,
    };

    const existingCartItem = cartItems.find(
      (ci) => ci.productId === cartItem.productId,
    );

    if (existingCartItem) {
      dispatch(
        changeItemQuantity({
          productId: cartItem.productId,
          quantity: existingCartItem.quantity + 1,
        }),
      );
    } else {
      dispatch(addToCart(cartItem as any));
    }
  };

  if (!isSuccess || !profile?.data?.wishlist) {
    return (
      <div className="p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 mb-4">
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-4"></div>
          </div>
        ))}
      </div>
    );
  }

  const wishlistItems = profile.data.wishlist;
  let subtotal = 0;

  return (
    <main id="main-content">
      <div className="app-max-width px-4 sm:px-8 md:px-20 w-full ">
        <h1 className="text-2xl sm:text-4xl text-center sm:text-left mt-6 mb-2 animatee__animated animate__bounce">
          Wishlist
        </h1>
        <div className="mt-6 mb-3">
          <Link href="/" className="inline-block">
            <span className="flex items-center space-x-3">
              <LeftArrow size="sm" className="inline-block h-5 w-5" />
              <span> Continue Shopping</span>
            </span>
          </Link>
        </div>
      </div>

      <div className="app-max-width px-4 sm:px-8 md:px-20 mb-14 flex flex-col lg:flex-row">
        <div className="h-full w-full">
          <table className="w-full mb-6">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray200">
                <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                  Product
                </th>
                <th className="font-normal hidden md:table-cell text-left sm:text-center py-2 xl:w-72">
                  Name
                </th>
                <th className="font-normal md:hidden text-left sm:text-center py-2 xl:w-72">
                  Details
                </th>
                <th
                  className={`font-normal py-2 ${
                    wishlistItems.length === 0 ? "text-center" : "text-right"
                  }`}
                >
                  Unit Price
                </th>
                <th className="font-normal hidden sm:table-cell py-2 max-w-xs">
                  Add
                </th>
                <th className="font-normal hidden sm:table-cell py-2 text-right w-10 whitespace-nowrap">
                  Remove
                </th>
                <th className="font-normal sm:hidden py-2 text-right w-10">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistItems.length === 0 ? (
                <tr className="w-full text-center h-60 border-b-2 border-gray200">
                  <td colSpan={5}>Wishlist is empty.</td>
                </tr>
              ) : (
                wishlistItems.map((item: any) => {
                  subtotal += item.price;
                  return (
                    <tr className="border-b-2 border-gray200" key={item.id}>
                      <td className="my-3 flex justify-center flex-col items-start sm:items-center">
                        <Link href={`/products/${encodeURIComponent(item.id)}`}>
                          <div>
                            <Image
                              src={item.thumbnail as string}
                              alt={item.name}
                              width={95}
                              height={128}
                              className="h-32 xl:mr-4"
                            />
                          </div>
                        </Link>
                        <span className="text-xs md:hidden">{item.name}</span>
                      </td>
                      <td className="text-center hidden md:table-cell">
                        {item.name}
                      </td>
                      <td className="text-right text-gray400">
                        $ {item.price}
                      </td>
                      <td className="text-center hidden sm:table-cell max-w-xs text-gray400">
                        <Button
                          value="Add to Cart"
                          extraClass="hidden sm:block m-auto"
                          onClick={() => addOne(item)}
                        />
                      </td>
                      <td
                        className="text-right pl-8"
                        style={{ minWidth: "3rem" }}
                      >
                        <Button
                          value="Add"
                          onClick={() => addOne(item)}
                          extraClass="sm:hidden mb-4 whitespace-nowrap"
                        />
                        <button
                          onClick={() => handleRemoveFromWishList(item.id)}
                          type="button"
                          className="outline-none text-gray300 hover:text-gray500 focus:outline-none text-4xl sm:text-2xl"
                        >
                          &#10005;
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div>
            <GhostButton
              onClick={clearWishlist}
              extraClass="w-full sm:w-48 whitespace-nowrap"
            >
              Clear Wishlist
            </GhostButton>
          </div>
        </div>
      </div>
    </main>
  );
};

export default WishListItems;
