"use client";

import Facebook from "@/icons/Facebook";
import Instagram from "@/icons/Instragram";
import Linkedin from "@/icons/Linkedin";
import Twitter from "@/icons/Twitter";
import Youtube from "@/icons/Youtube";
import { useGetCategoriesTreeQuery } from "@/redux/features/products/category.api";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import { Accordion, AccordionItem } from "@heroui/react";
import clsx from "clsx";
import Link from "next/link";
import { Fragment, useState } from "react";
import Preloader from "../common/Preloader";

export default function MegaMenu() {
  const data = useAppSelector(selectStorefrontData);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const { data: categoriesData, isLoading: isNavigationLoading } =
    useGetCategoriesTreeQuery(undefined);
  const [isBangladeshi, setIsBangladeshi] = useState(true);

  if (isNavigationLoading) <Preloader />;

  const socialLinks = [
    {
      Icon: Facebook,
      href: data?.socialMedia?.facebook || "#",
      name: "Facebook",
    },
    { Icon: Twitter, href: data?.socialMedia?.twitter || "#", name: "Twitter" },
    {
      Icon: Instagram,
      href: data?.socialMedia?.instagram || "#",
      name: "Instagram",
    },
    { Icon: Youtube, href: data?.socialMedia?.youtube || "#", name: "Youtube" },
    {
      Icon: Linkedin,
      href: data?.socialMedia?.linkedin || "#",
      name: "LinkedIn",
    },
  ];

  const categories = [
    {
      title: "WHO WE ARE",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Our People", href: "#" },
        { name: "Our Artisans", href: "#" },
        { name: "News and Offers", href: "#" },
        { name: "Stories", href: "#" },
        { name: "Photos & Videos", href: "#" },
        { name: "Lookbook", href: "#" },
      ],
      image: "/1.webp",
    },
    {
      title: "CATEGORIES",
      items: [
        ...(categoriesData
          ? categoriesData.map((category: { name: string; slug: string }) => ({
              name: category.name,
              href: `/categories/${category.slug}`,
            }))
          : []),
        {
          name: "Combo",
          href: "/products/combo",
        },
      ],
      image: "/2.webp",
    },
    {
      title: "CUSTOMER SERVICE",
      items: [
        { name: "Contact Us", href: "/contact" },
        { name: "How to Order", href: "#" },
        { name: "Billing & Payments", href: "#" },
        { name: "Shipping & Delivery", href: "#" },
        { name: "Track Your Orders", href: "/track-order" },
        { name: "Return & Exchanges", href: "/return-exchange" },
        { name: "Fabric Care", href: "#" },
        { name: "FAQs", href: "/faqs" },
      ],
      image: "/3.webp",
    },
    {
      title: "MORE",
      items: [
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "VAT Registration", href: "/vat-registration" },
        { name: "Tax Registration", href: "/tax-registration" },
        { name: "Trade License", href: "/trade-license" },
        {
          name: "Incorporation Certificate",
          href: "/incorporation-certificate",
        },
        {
          name: "Become an entrepreneur",
          href: "/become-an-entrepreneur",
        },
        {
          name: "Site Map",
          href: "/site-map",
        },
      ],
      image: "/4.webp",
    },
  ];

  const handleCategoryMouseEnter = (index: number) => {
    setActiveCategory(index);
  };

  // Handle mouse leave for the entire menu area
  const handleMenuMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div className=" w-full ">
      {/* Categories */}
      <div
        className="w-full bg-black text-white hidden lg:flex relative"
        onMouseLeave={handleMenuMouseLeave}
      >
        {categories.map((category, index) => (
          <Fragment key={index}>
            <div
              key={index}
              className="relative flex-1 cursor-pointer overflow-hidden"
              onMouseEnter={() => handleCategoryMouseEnter(index)}
            >
              <div
                className="h-64 flex items-center border-r justify-center text-lg font-bold bg-cover bg-center transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${category.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                <span className="relative text-base">{category.title}</span>

                {/* background overlay */}

                <div
                  className={clsx(
                    "absolute inset-0 bg-brand-main bg-opacity-70 transition-opacity duration-300",
                    {
                      "opacity-0": activeCategory !== index,
                      "opacity-100": activeCategory === index,
                    },
                  )}
                ></div>

                {/* Arrow indicator */}
              </div>
            </div>
            <div
              className={clsx(
                "grid grid-cols-2 relative p-4 gap-4 w-80 mx-auto my-auto pl-8",
                {
                  hidden: activeCategory !== index,
                  block: activeCategory === index,
                  opacity: activeCategory === index ? 1 : 0,
                  "pointer-events-none": activeCategory !== index,
                  "transition-opacity":
                    activeCategory === index
                      ? "transition-opacity duration-300"
                      : "transition-none",
                },
              )}
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              {/* Left-side centered arrow */}
              <div
                className={clsx(
                  "absolute left-4 top-1/2 transform -translate-x-full -translate-y-1/2 transition-opacity duration-300",
                  {
                    "opacity-0": activeCategory !== index,
                    "opacity-100": activeCategory === index,
                  },
                )}
              >
                <div className="w-0 h-0 border-t-[16px]  border-t-transparent border-b-[16px] border-b-transparent border-r-[16px] rotate-180 border-r-brand-main"></div>
              </div>

              {Array.isArray(category.items) &&
                category.items.map((item, itemIndex) => (
                  <Link
                    className="text-white text-xs "
                    key={itemIndex}
                    href={item.href}
                  >
                    <span className="capitalize hover:text-yellow transition-colors duration-300">
                      {item.name}
                    </span>
                  </Link>
                ))}
            </div>
          </Fragment>
        ))}
      </div>

      <div className="md:hidden border-t border-gray-200">
        <Accordion>
          {categories.map((category, index) => (
            <AccordionItem key={index} title={category.title}>
              <div className="grid grid-cols-2 gap-4">
                {Array.isArray(category.items) &&
                  category.items.map((item, itemIndex) => (
                    <Link key={itemIndex} href={item.href}>
                      {item.name}
                    </Link>
                  ))}
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Newsletter subscription section */}
            <form className="flex flex-col lg:flex-row w-full sm:w-auto">
              <div className="relative flex w-full">
                {/* Input field */}
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="border border-r-0 border-gray-300 px-4 py-2 w-full md:w-72 rounded-l focus:outline-none focus:ring-2 focus:ring-brand-main focus:z-10"
                  required
                />

                {/* Subscribe button */}
                <button
                  type="submit"
                  className="bg-brand-main text-white px-6 py-2 rounded-r border border-brand-main hover:bg-brand-dark hover:border-brand-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Copyright section */}
            <p className="text-sm text-center sm:text-left order-3 sm:order-2 w-full sm:w-auto">
              © {new Date().getFullYear()} {data?.shopName || "Shop Name"}. All
              rights reserved.
            </p>

            {/* Social links section */}
            <div className="flex justify-center order-2 sm:order-3 w-full sm:w-auto">
              <div className="flex items-center">
                {socialLinks.map(({ Icon, href, name }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="border rounded border-blue p-1.5 hover:bg-blue/10 transition-colors mx-2 flex items-center justify-center"
                    aria-label={`Follow us on ${name}`}
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-brand-main text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-brand-dark transition-colors duration-300"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
