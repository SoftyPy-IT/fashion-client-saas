"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Pagination } from "@heroui/react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  scrollToTop?: boolean;
  scrollTarget?: string; // CSS selector for scroll target
  className?: string;
  showInfo?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  scrollToTop = true,
  scrollTarget,
  className = "",
  showInfo = true,
  color = "secondary",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updatePageInURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      // Remove page param if it's page 1 to keep URL clean
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }

    const newURL = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname;
    router.push(newURL, { scroll: false });
  };

  const handleScrollToTarget = () => {
    if (!scrollToTop) return;

    if (scrollTarget) {
      const element = document.querySelector(scrollTarget);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }
    }

    // Default scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page: number) => {
    // Update URL first
    updatePageInURL(page);

    // Call custom onPageChange if provided (this should update the state)
    if (onPageChange) {
      onPageChange(page);
    }

    // Handle scrolling after state update
    setTimeout(() => {
      handleScrollToTarget();
    }, 100);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 w-full ${className}`}
    >
      <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-sm border-t border-gray-200">
        <div className="flex flex-col items-center gap-4 w-full">
          {showInfo && (
            <div className="text-small text-default-500 text-center">
              <p>
                Page {currentPage} of {totalPages}
              </p>
              {totalItems && itemsPerPage && (
                <p className="text-xs mt-1">
                  Showing{" "}
                  {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} -{" "}
                  {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                  {totalItems} results
                </p>
              )}
            </div>
          )}
          <Pagination
            color={color}
            page={currentPage}
            total={totalPages}
            onChange={handlePageChange}
            className="mx-auto"
            showControls
            showShadow
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
