import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Grid,
  Heart,
  Home,
  LogIn,
  LogOut,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Tag,
  User,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useState } from "react";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  subCategories?: {
    subCategory: SubCategory;
    serial: number;
    _id: string;
  }[];
  mainCategory?: string;
}

interface CategoryTree {
  _id: string;
  name: string;
  image: string;
  slug: string;
  categories: {
    category: Category;
    serial: number;
    _id: string;
  }[];
}

interface ProfileLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

const getCategoryLink = (
  mainCategorySlug: string,
  categoryName: string,
  categorySlug: string,
): string => {
  // Special handling for 'COMBO' category
  if (categoryName.toUpperCase() === "COMBO") {
    return "/products/combo";
  }

  // Normal category link structure
  return `/categories/${mainCategorySlug}/${categorySlug}`;
};

const MobileMegaMenu = ({
  navigation,
  isOpen,
  onClose,
  user,
  profileLinks = [],
  handleLogout,
  isLoading = false,
  logoSrc = "/logo.svg",
}: {
  navigation: CategoryTree[];
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  profileLinks?: ProfileLink[];
  handleLogout?: () => void;
  isLoading?: boolean;
  logoSrc?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const defaultProfileLinks = [
    {
      name: "My Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "My Orders",
      href: "/orders",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const allProfileLinks =
    profileLinks.length > 0 ? profileLinks : defaultProfileLinks;

  // Navigation links with improved icons and consistency
  const navigationLinks = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "Shop",
      href: "/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Combo",
      href: "/products/combo",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      name: "Categories",
      href: "/products/categories",
      icon: <Grid className="h-5 w-5" />,
    },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-6 shadow-xl">
              {/* Header with logo and close button */}
              <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 py-4 shadow">
                <div className="flex items-center">
                  <Image
                    src={logoSrc}
                    alt="Logo"
                    width={120}
                    height={120}
                    priority
                    className="h-16 w-auto"
                  />
                </div>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray100 text-gray500 hover:bg-brand-light1 active:bg-brand-light2 transition-colors duration-200"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Search bar */}
              <div className="mx-4 mt-4">
                <div className="relative rounded-lg border border-gray200 shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search
                      className="h-5 w-5 text-brand-main"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-lg border-0 py-3 pl-10 pr-3 text-sm text-gray500 placeholder:text-gray400 focus:ring-2 focus:ring-inset focus:ring-brand-main"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* User profile section - shown at top if logged in */}
              {user && (
                <div className="mx-4 mt-4 overflow-hidden rounded-lg bg-gradient-to-r from-brand-light1 to-brand-light2 shadow">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-2 ring-brand-light3">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name || "User"}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-6 w-6 text-brand-main" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray500">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-gray400">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      className="rounded-full bg-white p-2 text-brand-main shadow hover:bg-brand-light1 transition-colors duration-200"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Main navigation links in a 2x2 grid */}
              <div className="mt-4 px-4">
                <div className="grid grid-cols-2 gap-2 rounded-xl bg-gray50 p-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex flex-col items-center space-y-2 rounded-lg px-3 py-4 text-sm font-medium text-gray500 hover:bg-white hover:shadow-sm transition-all duration-200"
                      onClick={onClose}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light1 text-brand-main">
                        {link.icon}
                      </div>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories section */}
              <div className="mt-6 px-4">
                <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray400">
                  Browse Categories
                </h3>
                <div className="divide-y divide-gray100 rounded-xl border border-gray100 bg-white shadow-sm">
                  {navigation?.map((mainCategory) => (
                    <Disclosure
                      as="div"
                      key={mainCategory._id}
                      className="overflow-hidden"
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-gray500 hover:bg-gray50 transition-colors duration-200">
                            <div className="flex items-center">
                              {mainCategory.image && (
                                <div className="mr-3 h-9 w-9 overflow-hidden rounded-md bg-gray100 flex items-center justify-center border border-gray200">
                                  <Image
                                    src={mainCategory.image}
                                    alt={mainCategory.name}
                                    width={36}
                                    height={36}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              )}
                              <span className="font-medium">
                                {mainCategory.name}
                              </span>
                            </div>
                            <ChevronDown
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray400 transition-transform duration-200`}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>

                          <Disclosure.Panel className="bg-gray50 px-4 pb-3 pt-1">
                            <Link
                              href={`/categories/${mainCategory.slug}`}
                              className="mb-3 block rounded-md px-3 py-2 text-sm font-medium text-brand-main hover:bg-brand-light1 transition-colors duration-200 flex items-center justify-between bg-white shadow-sm"
                              onClick={onClose}
                            >
                              <span>View All {mainCategory.name}</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>

                            <div className="space-y-1">
                              {mainCategory.categories.map((item) => (
                                <Disclosure
                                  as="div"
                                  key={item.category._id}
                                  className="overflow-hidden rounded-md"
                                >
                                  {({ open }) => (
                                    <>
                                      <div className="flex items-center gap-2">
                                        <Disclosure.Button className="flex flex-1 items-center justify-between rounded-md px-2 py-2 text-left text-sm font-medium text-gray500 hover:bg-gray100/80 transition-colors duration-200">
                                          <span>{item.category.name}</span>
                                          {(item.category.subCategories
                                            ?.length ?? 0) > 0 && (
                                            <ChevronDown
                                              className={`${
                                                open
                                                  ? "rotate-180 transform"
                                                  : ""
                                              } h-4 w-4 text-gray400 transition-transform duration-200`}
                                              aria-hidden="true"
                                            />
                                          )}
                                        </Disclosure.Button>

                                        {/* "View All" button integrated as an icon button */}
                                        <Link
                                          href={getCategoryLink(
                                            mainCategory.slug,
                                            item.category.name,
                                            item.category.slug,
                                          )}
                                          className="flex items-center justify-center h-8 w-8 rounded-full bg-brand-light2 text-brand-main hover:bg-brand-light1 transition-colors duration-200"
                                          onClick={onClose}
                                          title={`View all ${item.category.name}`}
                                          aria-label={`View all ${item.category.name}`}
                                        >
                                          <ChevronRight className="h-4 w-4" />
                                        </Link>
                                      </div>

                                      {/* Subcategories */}
                                      {(item.category.subCategories?.length ??
                                        0) > 0 && (
                                        <Disclosure.Panel className="ml-2 space-y-1.5 border-l border-gray200 pl-2 mt-1">
                                          {item.category.subCategories?.map(
                                            (sub) => (
                                              <Link
                                                key={sub.subCategory._id}
                                                href={
                                                  item.category.name.toUpperCase() ===
                                                  "COMBO"
                                                    ? "/products/combo"
                                                    : `/categories/${mainCategory.slug}/${item.category.slug}/${sub.subCategory.slug}`
                                                }
                                                className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-gray400 hover:bg-white hover:text-brand-main hover:shadow-sm transition-all duration-200"
                                                onClick={onClose}
                                              >
                                                <span>
                                                  {sub.subCategory.name}
                                                </span>
                                                <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                                              </Link>
                                            ),
                                          )}
                                        </Disclosure.Panel>
                                      )}
                                    </>
                                  )}
                                </Disclosure>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>
              </div>

              {/* Authentication section */}
              <div className="mt-6 px-4">
                {!user ? (
                  <div className="space-y-3 rounded-xl border border-gray100 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray400">
                      Account
                    </h3>
                    <Link
                      href="/register"
                      className="flex items-center justify-center space-x-2 rounded-lg border border-gray200 bg-white px-4 py-2.5 text-sm font-medium text-gray500 shadow-sm hover:bg-gray50 active:bg-gray100 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <UserPlus className="h-5 w-5 text-brand-main" />
                      <span>Create an account</span>
                    </Link>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-center rounded-lg bg-brand-main px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 active:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 transition-colors duration-200"
                      onClick={onClose}
                    >
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign in
                    </Link>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray100 bg-white p-4 shadow-sm">
                    <h3 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray400">
                      My Account
                    </h3>

                    <div className="space-y-1.5">
                      {allProfileLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray500 hover:bg-brand-light1/50 transition-colors duration-200"
                          onClick={onClose}
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-light1 text-brand-main">
                            {link.icon}
                          </div>
                          <span>{link.name}</span>
                        </Link>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="mt-4 flex w-full items-center justify-center space-x-2 rounded-lg border border-red bg-white/30 px-4 py-2.5 text-sm font-medium text-red shadow-sm hover:bg-red/10 disabled:opacity-70 transition-colors duration-200"
                      onClick={handleLogout}
                      disabled={isLoading}
                    >
                      <LogOut className="h-5 w-5" />
                      <span>{isLoading ? "Signing out..." : "Sign out"}</span>
                    </button>
                  </div>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default MobileMegaMenu;
