"use client";

import {
  CircleArrowLeft as ArrowLeftStartOnRectangleIcon,
  CircleAlert as ExclamationCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ServerErrorMessage = () => {
  const router = useRouter();

  return (
    <section className="bg-white dark:bg-gray500">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <div className="p-4 rounded-full bg-red/20 dark:bg-gray400">
            <ExclamationCircleIcon className="w-8 h-8 text-red" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-gray500 dark:text-white md:text-3xl">
            Internal Server Error
          </h1>
          <p className="mt-4 text-gray400 dark:text-gray200">
            Something went wrong on our end. Please try again later or go back
            to the homepage.
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 sm:w-auto">
            <button
              onClick={router.back}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray500 bg-white border border-gray200 rounded-md shadow-sm hover:bg-gray100 dark:bg-gray400 dark:text-white dark:border-gray300 dark:hover:bg-gray300"
            >
              <ArrowLeftStartOnRectangleIcon className="w-5 h-5 mr-2" />
              Go back
            </button>

            <Link href="/" passHref>
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue border border-transparent rounded-md shadow-sm hover:bg-blue/80 dark:bg-blue dark:hover:bg-blue/70">
                Take me home
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerErrorMessage;
