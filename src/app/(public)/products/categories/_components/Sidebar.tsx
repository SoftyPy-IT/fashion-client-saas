import React from "react";
import { Accordion, AccordionItem } from "@heroui/react";

interface SidebarProps {
  filters: any[]; // Replace with your filter type
  categoriesLoading: boolean;
  mainCategories: any[]; // Replace with your main category type
  selectedMainCategory: string | null;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  openMainCategory: string | null;
  openCategory: string | null;
  clearFilters: () => void;
  handleMainCategoryClick: (slug: string, id: string) => void;
  handleCategoryClick: (
    slug: string,
    id: string,
    mainCategorySlug: string,
  ) => void;
  handleSubcategoryClick: (
    slug: string,
    categorySlug: string,
    categoryId: string,
    mainCategorySlug: string,
  ) => void;
  hasSubcategories: (category: any) => boolean; // Replace with your category type
}

const Sidebar: React.FC<SidebarProps> = ({
  filters,
  categoriesLoading,
  mainCategories,
  selectedMainCategory,
  selectedCategory,
  selectedSubcategory,
  openMainCategory,
  openCategory,
  clearFilters,
  handleMainCategoryClick,
  handleCategoryClick,
  handleSubcategoryClick,
  hasSubcategories,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-main"
          >
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          Categories
        </h2>
        {filters.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:text-red-600 hover:underline flex items-center gap-1 transition-all duration-200"
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
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
            Clear All
          </button>
        )}
      </div>

      {categoriesLoading ? (
        <div className="py-12 flex justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-brand-main rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Option to view all products */}
          <div
            className={`flex justify-between items-center w-full px-4 py-3 font-medium cursor-pointer border transition-all duration-200 rounded-lg ${
              filters.length === 0
                ? "bg-brand-light2 text-brand-main border-brand-main shadow-sm"
                : "text-gray-700 border-gray-100 hover:bg-gray-50 hover:border-brand-light1"
            }`}
            onClick={clearFilters}
          >
            <span className="flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="8" x2="8" y2="8"></line>
                <line x1="16" y1="12" x2="8" y2="12"></line>
                <line x1="16" y1="16" x2="8" y2="16"></line>
              </svg>
              All Products
            </span>
            {filters.length === 0 && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            )}
          </div>

          {/* Main Categories */}
          {mainCategories?.map((mainCategory) => (
            <Accordion
              key={mainCategory._id}
              defaultValue={
                openMainCategory === mainCategory._id
                  ? mainCategory._id
                  : undefined
              }
              className="border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 hover:border-brand-light1"
            >
              <AccordionItem
                key={mainCategory._id}
                aria-label={mainCategory.name}
                title={
                  <div
                    className={`w-full font-medium flex items-center gap-3 transition-all duration-200 ${
                      selectedMainCategory === mainCategory.slug
                        ? "text-brand-main"
                        : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMainCategoryClick(
                        mainCategory.slug,
                        mainCategory._id,
                      );
                    }}
                  >
                    {mainCategory.name}
                  </div>
                }
                classNames={{
                  title:
                    "px-4 py-0 flex justify-between cursor-pointer transition-all duration-200",
                  content: "p-0",
                }}
              >
                {/* Render categories under this main category */}
                <div className="bg-gray-50 py-3">
                  {mainCategory.categories.map((categoryItem: any) => (
                    <div key={categoryItem._id}>
                      {hasSubcategories(categoryItem.category) ? (
                        <Accordion
                          defaultValue={
                            openCategory === categoryItem.category._id
                              ? categoryItem.category._id
                              : undefined
                          }
                          className="border-0"
                        >
                          <AccordionItem
                            key={categoryItem.category._id}
                            aria-label={categoryItem.category.name}
                            title={
                              <div
                                className={`w-full text-sm font-medium group flex items-center transition-all duration-200 ${
                                  selectedCategory ===
                                  categoryItem.category.slug
                                    ? "text-brand-main"
                                    : "text-gray-600 group-hover:text-brand-main"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCategoryClick(
                                    categoryItem.category.slug,
                                    categoryItem.category._id,
                                    mainCategory.slug,
                                  );
                                }}
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
                                  className="mr-2"
                                >
                                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                                </svg>
                                {categoryItem.category.name}
                              </div>
                            }
                            classNames={{
                              title:
                                "px-4 py-2 flex justify-between cursor-pointer hover:bg-gray-100 transition-colors duration-200",
                              content: "p-0",
                            }}
                          >
                            {/* Render subcategories */}
                            <div className="bg-gray-100 py-2 ml-4 rounded-lg my-1">
                              <ul className="space-y-1">
                                {categoryItem.category.subCategories?.map(
                                  (subCategoryItem: any) => (
                                    <li key={subCategoryItem._id}>
                                      <button
                                        className={`w-full text-left py-2 px-3 rounded text-sm transition-all duration-200 flex items-center ${
                                          selectedSubcategory ===
                                          subCategoryItem.subCategory.slug
                                            ? "bg-brand-light2 text-brand-main font-medium"
                                            : "text-gray-600 hover:bg-brand-light1 hover:text-brand-main"
                                        }`}
                                        onClick={() =>
                                          handleSubcategoryClick(
                                            subCategoryItem.subCategory.slug,
                                            categoryItem.category.slug,
                                            categoryItem.category._id,
                                            mainCategory.slug,
                                          )
                                        }
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="mr-2"
                                        >
                                          <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                        {subCategoryItem.subCategory.name}
                                      </button>
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          </AccordionItem>
                        </Accordion>
                      ) : (
                        // For categories without subcategories, show a simple button
                        <button
                          className={`w-full text-left px-4 py-2 text-sm font-medium flex items-center hover:bg-gray-100 transition-all duration-200 rounded-md ${
                            selectedCategory === categoryItem.category.slug
                              ? "text-brand-main"
                              : "text-gray-600 hover:text-brand-main"
                          }`}
                          onClick={() =>
                            handleCategoryClick(
                              categoryItem.category.slug,
                              categoryItem.category._id,
                              mainCategory.slug,
                            )
                          }
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
                            className="mr-2"
                          >
                            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                          </svg>
                          {categoryItem.category.name}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
