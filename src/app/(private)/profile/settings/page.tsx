import ChangePasswordForm from "@/components/pages/profile/settings/ChangePasswordForm";
import UpdateProfileForm from "@/components/pages/profile/settings/UpdateProfileForm";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = (await getServerSession(authOptions)) as any;

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Update your profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
        <div>
          <div className="flex border-t border-gray100 pt-6 mt-4"></div>
        </div>
        <UpdateProfileForm profile={session?.user} />
      </div>
      <div className="mt-10">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Change your password
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Ensure your account is using a long, random password to stay secure.
          </p>
        </div>
        <div>
          <div className="flex border-t border-gray100 pt-6 mt-4"></div>
        </div>
        <ChangePasswordForm />
      </div>
    </>
  );
};

export default SettingsPage;
