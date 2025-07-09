"use client";

import Facebook from "@/icons/Facebook";
import Instagram from "@/icons/Instragram";
import Linkedin from "@/icons/Linkedin";
import Twitter from "@/icons/Twitter";
import Youtube from "@/icons/Youtube";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useGetCategoriesTreeQuery } from "@/redux/features/products/category.api";
import { useAppDispatch } from "@/redux/hooks";
import { ScrollShadow } from "@heroui/react";
import {
  CircleUser,
  Menu,
  Package,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartItem from "../Cart/CartItem";
import Logo from "../common/Logo";
import Preloader from "../common/Preloader";
import HeaderSearchBar from "./HeaderSearchBar";
import MegaMenu from "./MegaMenu";
import MobileMegaMenu from "./MobileMegaMenu";
import WishlistIcon from "./WishlistIcon";
import { useAppSelector } from "@/redux/hooks";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
const profileLinks = [
  {
    name: "Profile",
    href: "/profile/my-account",
    icon: <User className="w-4 h-4" />,
  },
  {
    name: "Settings",
    href: "/profile/settings",
    icon: <Settings className="w-4 h-4" />,
  },
  {
    name: "Orders",
    href: "/profile/orders",
    icon: <Package className="w-4 h-4" />,
  },
];

interface TopHeaderProps {
  session?: any;
}

const TopHeader = ({ session }: TopHeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [logoutUser, { isLoading }] = useLogoutMutation();
  const appData = useAppSelector(selectStorefrontData);
  const { data, isLoading: isNavigationLoading } =
    useGetCategoriesTreeQuery(undefined);
  const user = session?.user as any;
  const navigation = data as any;

  useEffect(() => {
    if (showSearch || showProfileMenu) {
      const closeDropdowns = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".header-dropdown")) {
          setShowSearch(false);
          setShowProfileMenu(false);
        }
      };
      document.addEventListener("click", closeDropdowns);
      return () => document.removeEventListener("click", closeDropdowns);
    }
  }, [showSearch, showProfileMenu]);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login", redirect: false });
      await logoutUser(undefined);
      dispatch(logout());
      window.location.href = "/login";
    } catch (error) {}
  };

  if (isNavigationLoading) return <Preloader />;

  const socialLinks = [
    {
      Icon: Facebook,
      href: appData?.socialMedia?.facebook || "#",
      name: "Facebook",
    },
    {
      Icon: Twitter,
      href: appData?.socialMedia?.twitter || "#",
      name: "Twitter",
    },
    {
      Icon: Instagram,
      href: appData?.socialMedia?.instagram || "#",
      name: "Instagram",
    },
    {
      Icon: Youtube,
      href: appData?.socialMedia?.youtube || "#",
      name: "Youtube",
    },
    {
      Icon: Linkedin,
      href: appData?.socialMedia?.linkedin || "#",
      name: "LinkedIn",
    },
  ];

  return (
    <div className="fixed w-full z-50 bg-brand-light1 top-0 left-0 transition-colors duration-300">
      {/* Top Section */}
      <div className="border-b border-brand-light2 bg-header-gradient ">
        <div className="container mx-auto px-4">
          <div className="py-3 lg:py-5 flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-brand-light2 rounded-full transition-colors"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6 text-brand-main " />
            </button>
            {/* Social Icons - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-4 ">
              {socialLinks.map(({ Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="border rounded border-blue p-0.5 hover:bg-blue/10 transition-colors"
                >
                  <Icon />
                </Link>
              ))}
            </div>
            ;{/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <Logo />
              </div>
            </div>
            {/* Right Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <div className="header-dropdown relative">
                <button
                  className="border border-brand-light3 rounded p-1 hover:bg-brand-light2 transition-all"
                  onClick={() => setShowSearch(!showSearch)}
                  aria-label="Toggle search"
                >
                  {showSearch ? (
                    <X className="w-5 h-5 text-brand-main" />
                  ) : (
                    <Search className="w-5 h-5 text-brand-main" />
                  )}
                </button>
              </div>

              {/* Wishlist */}
              <div className="hidden sm:block">
                <div className="border border-brand-light3 rounded p-1 hover:bg-brand-light2 transition-all">
                  <WishlistIcon />
                </div>
              </div>

              {/* Cart */}
              <div className="border border-brand-light3 rounded p-1 hover:bg-brand-light2 transition-all">
                <CartItem />
              </div>

              {/* User Menu */}
              <div className="relative">
                {session ? (
                  <div className="header-dropdown">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 rounded border border-brand-light3 p-1 hover:bg-brand-light2 transition-all"
                    >
                      <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
                        {user?.avatar?.url ? (
                          <Image
                            src={user?.avatar?.url}
                            alt="User Avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="text-brand-main dark:text-brand-light1 font-medium">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                    </button>

                    {showProfileMenu && (
                      <div className="absolute z-50 right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-brand-light3">
                        <div className="p-6 border-b border-brand-light3 bg-gradient-to-r from-brand-light1 to-brand-light2 rounded-t-xl">
                          <p className="text-base font-medium text-brand-main">
                            {user?.name}
                          </p>
                          <p className="text-sm text-brand-main/70 mt-1">
                            {user?.email}
                          </p>
                        </div>
                        <div className="py-2">
                          {profileLinks.map((link) => (
                            <Link
                              onClick={() => setShowProfileMenu(false)}
                              key={link.name}
                              href={link.href}
                              className="flex items-center px-6 py-3 text-sm text-brand-main hover:bg-brand-light2 transition-colors"
                            >
                              <span className="mr-3 text-brand-main/70">
                                {link.icon}
                              </span>
                              {link.name}
                            </Link>
                          ))}
                          <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="w-full text-left px-6 py-3 text-sm text-brand-main hover:bg-rose-200 transition-colors flex items-center"
                          >
                            <span className="mr-3">
                              <X className="w-4 h-4" />
                            </span>
                            {isLoading ? "Logging out..." : "Logout"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href="/login">
                    <button
                      type="button"
                      className="border border-brand-light3 rounded p-1 hover:bg-brand-light2 transition-all"
                      aria-label="Login"
                    >
                      <CircleUser className="w-5 h-5 text-brand-main" />
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Categories */}
      {!isMobileMenuOpen && (
        <div className="hidden lg:block border-b bg-white">
          <div className="container mx-auto px-4">
            <div className="py-2">
              <nav className="hidden lg:flex items-center justify-center space-x-8">
                <MegaMenu navigation={navigation} />
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="lg:hidden flex justify-center items-center w-full overflow-hidden bg-white border-t border-gray-200 ">
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          className="flex overflow-x-auto px-4 py-1 space-x-6"
        >
          <Link
            href="/"
            className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2 whitespace-nowrap"
            aria-label="Home"
          >
            HOME
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2  whitespace-nowrap"
            aria-label="Shop"
          >
            SHOP
          </Link>
          <Link
            href="/products/combo"
            className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors py-2  whitespace-nowrap"
            aria-label="Shop"
          >
            COMBO
          </Link>

          {navigation.map((category: any) => (
            <Link
              key={category._id}
              href={`/categories/${category.name.toLowerCase()}`}
              className="text-sm font-medium text-gray-900 uppercase hover:text-indigo-600 transition-colors py-2  whitespace-nowrap"
              aria-label={`Category: ${category.name}`}
            >
              {category.name}
            </Link>
          ))}
        </ScrollShadow>
      </div>

      {/* Search Overlay */}
      {showSearch && <HeaderSearchBar onClose={() => setShowSearch(false)} />}

      {/* Mobile Menu */}
      <MobileMegaMenu
        navigation={navigation}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        profileLinks={profileLinks}
        handleLogout={handleLogout}
        isLoading={isLoading}
        logoSrc={appData?.logo}
      />
    </div>
  );
};

export default TopHeader;
