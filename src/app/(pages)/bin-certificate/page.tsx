"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BinCertificate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  // Handle PDF loading events
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle loading errors
  const handleError = () => {
    setIsLoading(false);
  };

  // Toggle fullscreen mode
  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);

    // When entering fullscreen, apply fixes to ensure proper display regardless of the layout
    if (!fullScreen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden"; // Prevent scrolling of background

      // Add an extra class to html to ensure truly fullscreen experience
      document.documentElement.classList.add("pdf-fullscreen-active");
    } else {
      document.body.style.overflow = ""; // Restore scrolling
      document.documentElement.classList.remove("pdf-fullscreen-active");
    }
  };

  // Clean up effect for fullscreen mode
  useEffect(() => {
    // Add CSS to ensure proper fullscreen functionality
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.innerHTML = `
        html.pdf-fullscreen-active,
        html.pdf-fullscreen-active body {
          overflow: hidden !important;
          position: relative !important;
          height: 100% !important;
        }
        
        html.pdf-fullscreen-active .pdf-fullscreen-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 9999 !important;
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
        }

        @media (max-width: 640px) {
          .pdf-toolbar-buttons {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }
          
          .pdf-toolbar-buttons > * {
            width: 100%;
            display: flex;
            justify-content: center;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = ""; // Ensure scrolling is restored on unmount
      document.documentElement.classList.remove("pdf-fullscreen-active");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full px-4 sm:px-6 md:px-0"
    >
      {/* Only show header when not in fullscreen */}
      {!fullScreen && (
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            BIN Certificate
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            View our official BIN Certificate below. You can download or print
            this document for your records.
          </p>
        </div>
      )}

      {/* PDF Container */}
      <div
        className={`relative rounded-lg border border-gray-200 shadow-md bg-white ${
          fullScreen
            ? "pdf-fullscreen-container fixed top-0 left-0 right-0 bottom-0 z-[9999] m-0 rounded-none"
            : ""
        }`}
      >
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:px-4 sm:py-3 bg-gray-50 border-b rounded-t-lg">
          <h2 className="font-medium text-gray-700 mb-2 sm:mb-0">
            BIN Certificate
          </h2>
          <div className="pdf-toolbar-buttons flex flex-row sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 w-full sm:w-auto">
            <a
              href="/trade-license.pdf"
              download
              className="px-3 py-1 text-sm bg-brand-main text-white rounded hover:bg-brand-main/90 transition text-center"
            >
              Download
            </a>
            <button
              onClick={toggleFullScreen}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-center"
            >
              {fullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 border-3 sm:border-4 border-gray-200 border-t-brand-main rounded-full animate-spin"></div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600">
                Loading document...
              </p>
            </div>
          </div>
        )}

        {/* PDF Viewer */}
        <iframe
          src="/BIn-Certification.pdf#toolbar=1&navpanes=0"
          className={`w-full ${
            fullScreen ? "h-screen" : "h-[60vh] sm:h-[70vh] md:h-[80vh]"
          }`}
          onLoad={handleLoad}
          onError={handleError}
          title="BIN Certificate"
        />
      </div>

      {/* Contact Section - Only show when not in fullscreen */}
      {!fullScreen && (
        <motion.div
          className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-base sm:text-lg font-medium text-blue-800 mb-2">
            Need More Information?
          </h3>
          <p className="text-sm sm:text-base text-blue-700 mb-2">
            If you have any questions about our trade license or require
            additional documentation, please contact our compliance department.
          </p>
          <a
            href="/contact"
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 mt-1 sm:mt-2 text-sm sm:text-base bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Contact Us
          </a>
        </motion.div>
      )}

      {/* Fullscreen overlay close button for better mobile experience */}
      {fullScreen && (
        <button
          onClick={toggleFullScreen}
          className="fixed top-2 sm:top-4 right-2 sm:right-4 z-[60] bg-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-lg"
          aria-label="Exit fullscreen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-6 sm:h-6"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </motion.div>
  );
};

export default BinCertificate;
