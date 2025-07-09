"use client";

import Card from "@/components/Card/Card";
import ProductNotFound from "@/components/common/ProductNotFound";
import {
  useGetCategoriesProductsQuery,
  useGetCategoriesTreeQuery,
} from "@/redux/features/products/category.api";
import { IProduct } from "@/types/products.types";
import { useDisclosure } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import MobileDrawer from "./_components/MobileDrawer";
import Sidebar from "./_components/Sidebar";

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  category?: string;
}

interface SubCategoryItem {
  subCategory: SubCategory;
  serial: number;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  subCategories?: SubCategoryItem[];
  mainCategory?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isActive?: boolean;
}

interface CategoryItem {
  category: Category;
  serial: number;
  _id: string;
}

interface MainCategory {
  _id: string;
  name: string;
  image: string;
  slug: string;
  categories: CategoryItem[];
}

interface TQueryParam {
  name: string;
  value: string;
}

const CategoriesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize filters from URL parameters
  const initialFilters: TQueryParam[] = Array.from(searchParams.entries()).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );

  const [filters, setFilters] = useState<TQueryParam[]>(initialFilters);
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    string | null
  >(searchParams.get("main"));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("cat"),
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    searchParams.get("sub"),
  );

  // Track open accordion items
  const [openMainCategory, setOpenMainCategory] = useState<string | null>(
    searchParams.get("main") ? searchParams.get("main") : null,
  );
  const [openCategory, setOpenCategory] = useState<string | null>(
    searchParams.get("cat") ? searchParams.get("cat") : null,
  );

  // Fetch categories
  const { data: mainCategories, isLoading: categoriesLoading } =
    useGetCategoriesTreeQuery(undefined) as any;

  // Create query params for API call
  const queryParams: TQueryParam[] = filters.length > 0 ? filters : [];

  // Fetch products based on filters
  const {
    data: products,
    isLoading: productsLoading,
    isFetching: productsFetching,
  } = useGetCategoriesProductsQuery(queryParams);

  // Update URL when filters change
  useEffect(() => {
    if (filters.length > 0) {
      const params = new URLSearchParams();
      filters.forEach((filter) => {
        params.append(filter.name, filter.value);
      });

      const url = `/products/categories?${params.toString()}`;
      router.push(url);
    } else {
      router.push("/products/categories");
    }
  }, [filters, router]);

  // Handle main category selection
  const handleMainCategoryClick = (
    mainCategorySlug: string,
    mainCategoryId: string,
  ): void => {
    // Toggle open state for accordion
    setOpenMainCategory(
      openMainCategory === mainCategoryId ? null : mainCategoryId,
    );

    // Toggle selection state
    const isSelected = mainCategorySlug === selectedMainCategory;
    setSelectedMainCategory(isSelected ? null : mainCategorySlug);

    if (isSelected) {
      // Deselect the main category
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter.name !== "main"),
      );
    } else {
      // Remove any previous main category filter
      const newFilters = filters.filter((filter) => filter.name !== "main");

      // Add the new main category filter
      setFilters([...newFilters, { name: "main", value: mainCategorySlug }]);

      // Clear category and subcategory selections when changing main category
      setSelectedCategory(null);
      setSelectedSubcategory(null);
      setFilters((prevFilters) =>
        prevFilters.filter(
          (filter) => filter.name !== "cat" && filter.name !== "sub",
        ),
      );
    }
  };

  // Handle category selection
  const handleCategoryClick = (
    categorySlug: string,
    categoryId: string,
    mainCategorySlug: string,
  ): void => {
    // Toggle open state for accordion
    setOpenCategory(openCategory === categoryId ? null : categoryId);

    // Toggle selection state
    const isSelected = categorySlug === selectedCategory;
    setSelectedCategory(isSelected ? null : categorySlug);

    // Update main category if needed
    if (selectedMainCategory !== mainCategorySlug) {
      setSelectedMainCategory(mainCategorySlug);
      const mainCatId = findMainCategoryIdBySlug(mainCategorySlug);
      if (mainCatId) setOpenMainCategory(mainCatId);

      // Remove any previous main category filter
      const mainCategoryFilters = filters.filter(
        (filter) => filter.name !== "main",
      );
      // Add the new main category filter
      setFilters([
        ...mainCategoryFilters,
        { name: "main", value: mainCategorySlug },
      ]);
    }

    if (isSelected) {
      // Deselect the category
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter.name !== "cat"),
      );
    } else {
      // Remove any previous category filter
      const newFilters = filters.filter((filter) => filter.name !== "cat");

      // Add the new category filter
      setFilters([...newFilters, { name: "cat", value: categorySlug }]);

      // Clear subcategory selection when changing category
      setSelectedSubcategory(null);
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter.name !== "sub"),
      );
    }
  };

  // Handle subcategory selection
  const handleSubcategoryClick = (
    subcategorySlug: string,
    categorySlug: string,
    categoryId: string,
    mainCategorySlug: string,
  ): void => {
    const isSelected = subcategorySlug === selectedSubcategory;
    setSelectedSubcategory(isSelected ? null : subcategorySlug);

    // Update category and main category if needed
    if (selectedCategory !== categorySlug) {
      setSelectedCategory(categorySlug);
      setOpenCategory(categoryId);

      // Remove any previous category filter
      const categoryFilters = filters.filter((filter) => filter.name !== "cat");

      // Add the new category filter
      setFilters([...categoryFilters, { name: "cat", value: categorySlug }]);
    }

    if (selectedMainCategory !== mainCategorySlug) {
      setSelectedMainCategory(mainCategorySlug);
      const mainCatId = findMainCategoryIdBySlug(mainCategorySlug);
      if (mainCatId) setOpenMainCategory(mainCatId);

      // Remove any previous main category filter
      const mainCategoryFilters = filters.filter(
        (filter) => filter.name !== "main",
      );

      // Add the new main category filter
      setFilters([
        ...mainCategoryFilters,
        { name: "main", value: mainCategorySlug },
      ]);
    }

    if (isSelected) {
      // Deselect the subcategory
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter.name !== "sub"),
      );
    } else {
      // Remove any previous subcategory filter
      const newFilters = filters.filter((filter) => filter.name !== "sub");

      // Add the new subcategory filter
      setFilters([...newFilters, { name: "sub", value: subcategorySlug }]);
    }
  };

  // Helper function to find main category ID by slug
  const findMainCategoryIdBySlug = (slug: string): string | null => {
    if (!mainCategories) return null;

    const mainCategory = mainCategories.find(
      (cat: MainCategory) => cat.slug === slug,
    );

    return mainCategory ? mainCategory._id : null;
  };

  // Clear all filters
  const clearFilters = (): void => {
    setFilters([]);
    setSelectedMainCategory(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setOpenMainCategory(null);
    setOpenCategory(null);
    router.push("/categories");
  };

  // Format filter label
  const getFilterLabel = (name: string): string => {
    switch (name) {
      case "main":
        return "Main Category: ";
      case "cat":
        return "Category: ";
      case "sub":
        return "Subcategory: ";
      default:
        return `${name}: `;
    }
  };

  // Find category name for display in filter pills
  const getCategoryName = (
    slug: string,
    type: "main" | "category" | "subcategory",
  ): string => {
    if (!mainCategories) return slug;

    if (type === "main") {
      const mainCategory = mainCategories.find(
        (cat: MainCategory) => cat.slug === slug,
      );
      return mainCategory?.name || slug;
    } else if (type === "category") {
      for (const mainCat of mainCategories) {
        const category = mainCat.categories.find(
          (cat: CategoryItem) => cat.category.slug === slug,
        );
        if (category) return category.category.name;
      }
      return slug;
    } else if (type === "subcategory") {
      for (const mainCat of mainCategories) {
        for (const catItem of mainCat.categories) {
          if (catItem.category.subCategories) {
            const subcategory = catItem.category.subCategories.find(
              (subCat: SubCategoryItem) => subCat.subCategory.slug === slug,
            );
            if (subcategory) return subcategory.subCategory.name;
          }
        }
      }
      return slug;
    }

    return slug;
  };

  // Check if a category has subcategories
  const hasSubcategories = (category: Category): boolean => {
    return !!(category.subCategories && category.subCategories.length > 0);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="container mx-auto py-8 px-4 lg:px-0 pt-48">
        <div className="flex justify-between items-center mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold text-brand-main mb-6">
            Categories
          </h1>
          <button
            onClick={onOpen}
            className="block lg:hidden bg-brand-main text-white py-2 px-4 rounded-lg shadow-sm hover:bg-brand-dark transition-all duration-200"
          >
            Filter
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Mobile Drawer Button */}

          {/* Sidebar - Categories */}
          <div className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-24 self-start transition-all duration-300 ease-in-out">
            <Sidebar
              filters={filters}
              categoriesLoading={categoriesLoading}
              mainCategories={mainCategories as MainCategory[]}
              selectedMainCategory={selectedMainCategory}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              openMainCategory={openMainCategory}
              openCategory={openCategory}
              clearFilters={clearFilters}
              handleMainCategoryClick={handleMainCategoryClick}
              handleCategoryClick={handleCategoryClick}
              handleSubcategoryClick={handleSubcategoryClick}
              hasSubcategories={hasSubcategories}
            />
          </div>

          {/* Mobile Drawer */}
          <MobileDrawer
            isOpen={isOpen}
            onClose={onClose}
            sidebarProps={{
              filters: filters,
              categoriesLoading: categoriesLoading,
              mainCategories: mainCategories as MainCategory[],
              selectedMainCategory: selectedMainCategory,
              selectedCategory: selectedCategory,
              selectedSubcategory: selectedSubcategory,
              openMainCategory: openMainCategory,
              openCategory: openCategory,
              clearFilters: clearFilters,
              handleMainCategoryClick: handleMainCategoryClick,
              handleCategoryClick: handleCategoryClick,
              handleSubcategoryClick: handleSubcategoryClick,
              hasSubcategories: hasSubcategories,
            }}
          />

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            {/* Active Filters */}
            {filters.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="w-full mb-2 text-sm text-gray-500">
                  Active filters:
                </div>
                {filters.map((filter, index) => {
                  let displayValue = filter.value;

                  if (filter.name === "mainCategorySlug") {
                    displayValue = getCategoryName(filter.value, "main");
                  } else if (filter.name === "categorySlug") {
                    displayValue = getCategoryName(filter.value, "category");
                  } else if (filter.name === "subcategorySlug") {
                    displayValue = getCategoryName(filter.value, "subcategory");
                  }

                  return (
                    <div
                      key={index}
                      className="bg-brand-light1 text-brand-main px-3 py-1 rounded-full text-sm flex items-center group hover:bg-brand-light2 transition-all duration-200"
                    >
                      <span className="font-medium">
                        {getFilterLabel(filter.name)}
                      </span>
                      <span>{displayValue}</span>
                      <button
                        onClick={() => {
                          setFilters(filters.filter((_, i) => i !== index));
                          if (filter.name === "mainCategorySlug") {
                            setSelectedMainCategory(null);
                            setOpenMainCategory(null);
                          }
                          if (filter.name === "categorySlug") {
                            setSelectedCategory(null);
                            setOpenCategory(null);
                          }
                          if (filter.name === "subcategorySlug")
                            setSelectedSubcategory(null);
                        }}
                        className="ml-2 hover:text-red-500 transition-all duration-200 group-hover:scale-110"
                        aria-label="Remove filter"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Products Section Header */}
            <div className="">
              {productsLoading || productsFetching ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-brand-main rounded-full animate-spin"></div>
                </div>
              ) : (products?.data?.length ?? 0) > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products?.data?.map((product: IProduct) => (
                    <Card
                      key={product._id}
                      item={{
                        id: product._id,
                        name: product.name,
                        code: product.code,
                        price: product.price,
                        img1: product.thumbnail,
                        img2: product.images[0],
                        slug: product.slug,
                        category: product.category?.name,
                        rating: product.rating,
                        reviewCount: product.reviews.length,
                        subCategory: product.subCategory?.name,
                        mainCategory: product.mainCategory?.name,
                        availableStock: product.quantity,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <ProductNotFound />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
