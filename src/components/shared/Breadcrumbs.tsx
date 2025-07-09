import { ChevronRightIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

interface Page {
  name: string;
  href?: string;
  current: boolean;
  onClick?: () => void; // Optional onClick handler
}

interface BreadcrumbProps {
  pages: Page[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pages }) => {
  return (
    <nav
      className="flex w-full bg-gray-100/50 mt-3 sm:mt-4 md:mt-5 py-3 sm:py-4"
      aria-label="Breadcrumb"
    >
      <ol
        role="list"
        className="flex w-full max-w-screen-2xl px-3 sm:px-4 md:px-6 lg:px-8 mx-auto space-x-1 sm:space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        <li className="flex items-center flex-shrink-0">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
          >
            <span className="flex items-center">
              <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </span>
          </Link>
        </li>
        {pages.map((page, index) => (
          <li
            key={index}
            className="flex items-center capitalize flex-shrink-0"
          >
            <ChevronRightIcon
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0"
              aria-hidden="true"
            />
            <Link
              href={page.href || "#"}
              onClick={page.onClick}
              className={`ml-1 sm:ml-2 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                page.current
                  ? "text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-current={page.current ? "page" : undefined}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Add this to your global CSS to hide scrollbar but maintain functionality
// .scrollbar-hide {
//   -ms-overflow-style: none;  /* IE and Edge */
//   scrollbar-width: none;  /* Firefox */
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none;  /* Chrome, Safari and Opera */
// }

export default Breadcrumb;
