import Container from "@/components/common/Container";
import { Link } from "@heroui/react";
import NextLink from "next/link";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const ResetPassword = () => {
  return (
    <Container>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 z-0">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-8 sm:px-10 ">
              <p className="text-xl text-gray-900 text-center mb-6">
                Reset your password
              </p>
              <ResetPasswordForm />
              <p className="mt-6 text-sm text-center text-gray-600">
                Log in to your account?{" "}
                <Link as={NextLink} size="sm" href="/login" className="">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
