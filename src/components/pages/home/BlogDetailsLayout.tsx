"use client";

import Preloader from "@/components/common/Preloader";
import {
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
} from "@/redux/features/blog.api";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

interface IParams {
  slug: string;
}

const BlogDetailsLayout = ({ params }: { params: IParams }) => {
  const { data: blogDetails, isLoading } = useGetSingleBlogQuery(params.slug);
  const { data: allBlogDetails, isLoading: allBlogLoading } =
    useGetAllBlogQuery(undefined);

  if (isLoading || allBlogLoading) {
    return <Preloader />;
  }

  const blog = blogDetails as any;
  const allBlogs = allBlogDetails?.data;

  const otherBlogs = allBlogs?.filter((item: any) => item._id !== blog._id);

  return (
    <div className="my-24 relative top-10 bg-gray50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content - Left Side */}
          <div className="w-full md:w-2/3">
            {blog && (
              <article className="bg-white rounded-lg  overflow-hidden border border-gray100 hover:shadow-lg transition-shadow duration-300">
                {/* Featured Image */}
                <div className="relative w-full h-64 md:h-96">
                  {blog.thumbnail && (
                    <>
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        fill
                        className="object-cover"
                      />
                    </>
                  )}
                </div>

                {/* Blog Content */}
                <div className="p-6 md:p-8">
                  {/* Blog Meta */}
                  <div className="flex flex-wrap items-center text-gray400 text-sm mb-4">
                    <span className="mr-6 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {blog.createdAt && formatDate(blog.createdAt)}
                    </span>
                    {blog.author && (
                      <span className="mr-6 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {blog.author}
                      </span>
                    )}
                  </div>

                  {/* Blog Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-main mb-6">
                    {blog.title}
                  </h1>

                  {/* Blog Content */}
                  <div
                    className="prose max-w-none text-gray500"
                    dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                  ></div>
                </div>
              </article>
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="w-full md:w-1/3">
            {/* Recent Posts Card */}
            <div className="bg-white rounded-lg  p-6 sticky top-32 border border-gray100 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-brand-main mb-6 pb-2 border-b border-gray100">
                Recent Posts
              </h3>

              {/* Recent Posts List */}
              <div className="space-y-6">
                {otherBlogs &&
                  otherBlogs.slice(0, 5).map((blog: any) => (
                    <div key={blog.slug} className="flex space-x-4 group">
                      {/* Blog Thumbnail */}
                      <div className="w-20 h-20 flex-shrink-0 relative overflow-hidden rounded">
                        {blog.thumbnail && (
                          <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            className="object-cover rounded transition-transform duration-300 group-hover:scale-110"
                          />
                        )}
                      </div>

                      {/* Blog Info */}
                      <div className="flex-1">
                        <Link
                          href={`/newspost/${blog.slug}`}
                          className="text-gray500 font-medium hover:text-brand-main transition-colors duration-200 line-clamp-2"
                        >
                          {blog.title}
                        </Link>
                        <p className="text-gray400 text-sm mt-1 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {blog.createdAt && formatDate(blog.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-lightgreen rounded-lg  p-6 mt-8 border border-gray100">
              <h3 className="text-xl font-bold text-brand-main mb-3">
                Subscribe to Newsletter
              </h3>
              <p className="text-gray400 text-sm mb-4">
                Get the latest fashion updates and exclusive offers directly to
                your inbox.
              </p>

              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded border border-gray200 focus:outline-none focus:border-brand-main text-gray500"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-blue text-white rounded hover:bg-brand-main transition-colors duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsLayout;
