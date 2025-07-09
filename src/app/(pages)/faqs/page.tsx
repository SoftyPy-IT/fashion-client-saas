"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
  links?: { text: string; url: string }[];
}

interface StorefrontData {
  faq: FAQ[];
}

const FaqsPage = () => {
  const data = useAppSelector(selectStorefrontData) as StorefrontData | null;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  // Group FAQs by category if categories exist
  const faqCategories = data?.faq?.reduce((acc: Record<string, FAQ[]>, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  // Filter FAQs based on search and active category
  const filteredFaqs = data?.faq?.filter((faq) => {
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      (faq.category || "General") === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Object.keys(faqCategories || { General: [] });

  return (
    <section className="min-h-screen relative  bg-white  px-6">
      <div className="container mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-main mb-4">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-blue mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our products, services,
            shipping, and more.
          </p>
        </div>

        {/* Search and Filter Section */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-8 mb-10">
          <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
            <div className="relative w-full md:w-2/3">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-300" />
              </div>
              <input
                type="text"
                placeholder="Search for questions..."
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 w-full md:w-1/3 justify-center md:justify-end">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeCategory === "all"
                    ? "bg-brand-main text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    activeCategory === category
                      ? "bg-brand-main text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* Popular topics */}
        <div className="bg-white rounded-xl p-4 lg:p-10 mb-16">
          <h3 className="text-xl font-semibold text-brand-main mb-6 text-center">
            Popular Topics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Shipping",
              "Returns",
              "Payment",
              "Account",
              "Products",
              "Orders",
              "Tracking",
              "Warranty",
            ].map((topic) => (
              <div
                key={topic}
                className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue hover:bg-blue/5 transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  setSearchTerm(topic);
                  setActiveCategory("all");
                }}
              >
                <p className="text-gray-500 font-medium">{topic}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="mb-16 bg-brand-light1 rounded p-4 lg:p-10">
          {activeCategory !== "all" && (
            <div className="flex items-center mb-6">
              <BookOpen className="h-5 w-5 text-blue mr-2" />
              <h2 className="text-xl font-semibold text-brand-main">
                {activeCategory}
              </h2>
            </div>
          )}

          {filteredFaqs?.length > 0 ? (
            <div className="grid grid-cols-1  gap-6">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded  overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <FaqItem faq={faq} index={index} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">
                No FAQs found matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                }}
                className="text-blue hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Can't find answer section */}
        <div className="bg-brand-main rounded-xl p-8 text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't Find Your Answer?
            </h3>
            <p className="text-brand-light1 mb-6">
              If you couldn't find the answer to your question, our team is here
              to help you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-blue hover:bg-blue/90 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-gray-500 px-6 py-3 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual FAQ Item Component using Accordion
const FaqItem = ({ faq, index }: { faq: FAQ; index: number }) => {
  return (
    <Accordion>
      <AccordionItem title={` ${index + 1}. ${faq.question}`}>
        <p className="border-t py-3">{faq.answer}</p>
        {faq.links && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Related Links:
            </p>
            <ul className="list-disc pl-5 text-sm">
              {faq.links.map((link, i) => (
                <li key={i} className="mb-1">
                  <Link href={link.url} className="text-blue hover:underline">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default FaqsPage;
