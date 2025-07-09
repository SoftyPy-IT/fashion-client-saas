"use client";

import { useState } from "react";
import { PropsWithChildren } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
  { title: "About Us", href: "/about" },
  { title: "How To Order", href: "/how-to-order" },
  { title: "Billing & Payments", href: "/billing-payments" },
  { title: "Shipping & Delivery", href: "/shipping-delivery" },
  { title: "Track your Orders", href: "/track-your-orders" },
  { title: "Return & Exchange", href: "/return-exchange" },
  { title: "Fabric Care", href: "/fabric-care" },
  { title: "Terms and Conditions", href: "/terms-and-conditions" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Trade License", href: "/trade-license" },
  { title: "VAT Registration", href: "/vat-registration" },
  { title: "TAX Registration", href: "/tax-registration" },
  { title: "Incorporation Certificate", href: "/incorporation-certificate" },
  { title: "FAQ", href: "/faqs" },
];

export default function Layout({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  return (
    <div className="container mx-auto relative mb-96 top-36 md:top-64">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.div
          className="w-full lg:w-1/5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sticky top-24">
            <div className="bg-white border rounded-lg p-6 shadow-sm">
              {/* Toggle Button for Small Devices */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden mb-4 w-full py-2 px-4 bg-brand-main text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? "Close Menu" : "Open Menu"}
              </motion.button>

              {/* Sidebar Links (Dropdown on Small Devices) */}
              <AnimatePresence>
                {(isOpen ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <motion.ul
                    className="space-y-2"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {sidebarLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={clsx(
                            "flex items-center p-3 rounded-lg transition-all duration-200 border",
                            pathName === link.href
                              ? "bg-brand-main text-white border-transparent shadow-md"
                              : "border-gray-200 hover:border-brand-main/40 hover:bg-brand-main/5 group",
                          )}
                        >
                          <motion.span
                            className={clsx(
                              "ml-2 font-medium",
                              pathName !== link.href &&
                                "group-hover:text-brand-main",
                            )}
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            {link.title}
                          </motion.span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="w-full lg:w-4/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg border p-6 shadow-sm">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
