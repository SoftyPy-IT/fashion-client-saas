import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Container from "@/components/common/Container";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <Container>
      <div className="mx-auto my-8 w-full bg-[#f9fafb] rounded-lg">
        <div className="mx-auto w-full pt-6 lg:px-8">
          {/* Main content */}
          <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
