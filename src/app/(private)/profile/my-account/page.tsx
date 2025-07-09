import ProfileGeneralPage from "@/components/pages/profile/general";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const UserProfile = async () => {
  const session = (await getServerSession(authOptions)) as any;
  console.log(session);
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <ProfileGeneralPage user={session?.user} />
    </>
  );
};

export default UserProfile;
