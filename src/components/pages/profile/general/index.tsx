"use client";

import { selectProfile } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";
import UpdateAvatar from "./UpdateAvatar";
import { useSession } from "next-auth/react";

const ProfileGeneralPage = ({ user }: { user: any }) => {
  return (
    <>
      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <dl className="mt-6 space-y-6 divide-y divide-gray100 border-t border-gray200 text-sm leading-6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Full name
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">
                {user?.firstName} {user?.lastName}
              </div>
              <UpdateAvatar url={user?.avatar?.url} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Email address
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">{user?.email}</div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {user?.isVerified ? "Verified" : "Not verified"}
              </span>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Phone Number
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">
                {user?.phone ? user.phone : "Not available"}
              </div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Date of Birth
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">
                {user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "Not available"}
              </div>
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
              Address
            </dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <div className="text-gray-900">
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {user?.address
                    ? `${user.address.address}, ${user.address.city}, ${user.address.postalCode}, ${user.address.country}`
                    : "Address not available"}
                </p>
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <div className="flex border-t border-gray100 pt-6 mt-4"></div>
      </div>

      <div>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Shipping Address
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be used as default shipping address.
        </p>
      </div>
    </>
  );
};

export default ProfileGeneralPage;
