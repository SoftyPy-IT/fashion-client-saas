"use client";

import { useGetAllBlogQuery } from "@/redux/features/blog.api";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import { motion } from "framer-motion";
// Import Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Define TypeScript interfaces
interface Blog {
  id: string | number;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  category?: string;
  publishedAt?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface QueryParam {
  name: string;
  value: string | number;
}

const NewsSection = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check for mobile view on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { data: blogData, isLoading: blogLoading } = useGetAllBlogQuery([
    {
      name: "limit",
      value: 3,
    },
  ] as QueryParam[]);

  const blogs: Blog[] = blogData?.data || [];

  // Truncate description to specific length
  const truncateText = (text?: string, length: number = 120): string => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // Format date if it exists in the data
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // BlogCard component for reuse in both grid and swiper
  const BlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className="bg-white rounded overflow-hidden border transition-all duration-300 hover:shadow-md h-full flex flex-col"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative h-56 w-full overflow-hidden">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title || "Blog image"}
              fill
              className={`object-cover transition-transform duration-700 ${
                hovered ? "scale-110" : "scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Category badge */}
          {blog.category && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-brand-main to-brand-dark text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {blog.category}
            </div>
          )}

          {/* Date badge */}
          {blog.publishedAt && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-xs font-medium px-2.5 py-1.5 rounded-md">
              {formatDate(blog.publishedAt)}
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col flex-grow">
          {/* Author info if available */}
          {blog.author && (
            <div className="flex items-center mb-4">
              <div className="relative h-8 w-8 rounded-full overflow-hidden mr-3">
                {blog.author.avatar ? (
                  <Image
                    src={blog.author.avatar}
                    alt={blog.author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold">
                    {blog.author.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-sm text-gray-600">{blog.author.name}</span>
            </div>
          )}

          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            <Link
              href={`/newspost/${blog.slug}`}
              className="hover:text-brand-main transition-colors duration-300"
            >
              {blog.title || "Untitled Blog Post"}
            </Link>
          </h3>

          <p className="text-gray-600 mb-5 line-clamp-3 flex-grow">
            {truncateText(blog.description, 140)}
          </p>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <Link
              href={`/newspost/${blog.slug}`}
              className="text-brand-main hover:text-brand-dark font-medium flex items-center group w-fit"
            >
              Read Full Article
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // Loading state with skeleton UI
  if (blogLoading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col"
              >
                <div className="relative h-48 w-full bg-gray-200 animate-pulse"></div>
                <div className="p-5 flex flex-col flex-grow space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // No data state
  if (!blogs || blogs.length === 0) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">
              No blog posts available
            </h2>
            <p className="mt-4 text-gray-500 max-w-lg mx-auto">
              We're working on creating new content. Please check back later for
              updates.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block bg-brand-main hover:bg-brand-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              Return to Home
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  // Animation variants for desktop grid only
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white my-10">
      <Container>
        <div className="flex flex-col justify-center items-center py-4 ">
          <div className="mb-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 relative inline-block">
              NEWS & PR
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-1.5 bg-brand-main rounded-full"></span>
            </h2>
          </div>
        </div>

        {/* Responsive Layout - Swiper for mobile, Grid for larger screens */}
        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={false}
            className="pb-12"
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={blog.id || index} className="py-2">
                <BlogCard blog={blog} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogs.map((blog, index) => (
              <BlogCard key={blog.id || index} blog={blog} index={index} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};

export default NewsSection;
