import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="bg-[#f9fafb]">
      <div className=" min-h-screen flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
