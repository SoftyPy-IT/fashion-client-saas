import AppHeader from "@/components/shared/AppHeader";
import TopHeader from "@/components/shared/TopHeader";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      <TopHeader />
      {/* <AppHeader title="Page Not Found - Moriyom Fashion" /> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray50 mt-36 px-4 sm:px-6 md:px-12 py-8">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-main mb-4 md:mb-6">
            404 - Page Not Found
          </h1>

          <div className="relative w-full aspect-[4/3] mb-4 md:mb-6">
            <Image
              src="/not-found.jpg"
              alt="404 Page Not Found"
              fill
              className="animate-pulse object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 75vw, 50vw"
              priority
            />
          </div>

          <p className="text-gray500 text-base sm:text-lg md:text-xl mb-3 md:mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>

          <p className="text-gray500 text-base sm:text-lg md:text-xl">
            Go back to the{" "}
            <Link href="/" className="inline-block">
              <span className="underline text-brand-main font-semibold hover:text-brand-light1 transition-colors duration-300">
                home page
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Custom404;
