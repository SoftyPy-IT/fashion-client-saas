"use client";

import { useGetCategoriesTreeQuery } from "@/redux/features/products/category.api";
import Link from "next/link";
import { Folder, FileText } from "lucide-react";
import Container from "@/components/common/Container";

const Sitemap = () => {
  const { data, isLoading } = useGetCategoriesTreeQuery(undefined) as any;

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!data || data.length === 0) return <p>No categories available.</p>;

  return (
    <Container>
      <div className="my-20 mt-48 border border-gray-300 p-4 rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Site Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((mainCategory: any) => (
            <div
              key={mainCategory._id}
              className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <Link
                href={`/categories/${mainCategory.slug}`}
                className="text-lg font-bold text-blue-600 hover:text-blue-800 flex items-center mb-3"
              >
                <Folder className="mr-2" size={20} /> {mainCategory.name}
              </Link>

              <div className="space-y-4">
                {mainCategory.categories.map((category: any) => (
                  <div
                    key={category.category._id}
                    className="ml-2 border-l-2 border-gray-200 pl-3"
                  >
                    <Link
                      href={`/categories/${mainCategory.slug}/${category.category.slug}`}
                      className="text-gray-800 font-medium hover:text-blue-600 flex items-center"
                    >
                      <FileText className="mr-2" size={16} />{" "}
                      {category.category.name}
                    </Link>

                    {category.category.subCategories.length > 0 && (
                      <div className="grid grid-cols-2 gap-1 mt-2 ml-4">
                        {category.category.subCategories.map(
                          (sub: {
                            subCategory: {
                              _id: string;
                              name: string;
                              slug: string;
                            };
                          }) => (
                            <Link
                              key={sub.subCategory._id}
                              href={`/categories/${mainCategory.slug}/${category.category.slug}/${sub.subCategory.slug}`}
                              className="text-gray-600 text-sm hover:text-blue-500 truncate"
                            >
                              {sub.subCategory.name}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Sitemap;
