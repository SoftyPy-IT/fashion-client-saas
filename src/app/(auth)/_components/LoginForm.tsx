"use client";

import { Checkbox, Input } from "@heroui/react";
import { useState } from "react";
// import { FaFacebookSquare } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setProfile, setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { Link } from "@heroui/react";
import { signIn } from "next-auth/react";
import NextLink from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { MailIcon } from "./MailIcon";
import PasswordIcon from "./PasswordIcon";
import Button from "@/components/buttons/Button";

const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [resError, setResError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [login, { isSuccess }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");

    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      // Step 1: Validate user credentials on your server
      const res = await login(userInfo).unwrap();

      if (res.success) {
        // Step 2: Log the user in via NextAuth using credentials provider
        const nextAuthResponse = await signIn("credentials", {
          redirect: false,
          email: userInfo.email,
          password: userInfo.password,
        });

        if (nextAuthResponse?.ok && nextAuthResponse?.status === 200) {
          // Step 3: Update Redux state with user info and token
          const user = verifyToken(res.data.accessToken) as TUser;
          dispatch(setUser({ user, token: res.data.accessToken }));
          dispatch(setProfile(res.data.user));

          toast.success("Logged in successfully", {
            id: toastId,
            duration: 2000,
          });
          reset();
          setResError(null);

          // Redirect to the desired page
          // router.replace("/");
          // router.refresh();
          window.location.href = "/";
        } else {
          throw new Error("NextAuth login failed");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      setResError(err?.data?.message);
      toast.error(err?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <>
      {resError ? <ErrorMessage errorMessage={resError} /> : null}
      {isSuccess ? <SuccessMessage successMessage="Login successful" /> : null}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mt-5"
      >
        <div className="space-y-4 flex flex-col">
          <div>
            <Input
              isClearable
              type="email"
              radius="sm"
              label="Email"
              placeholder="Enter your email address"
              labelPlacement="outside"
              startContent={<MailIcon className="text-gray400" />}
              variant="bordered"
              errorMessage={errors.email?.message?.toString() || ""}
              isInvalid={errors.email?.message?.toString() ? true : false}
              className="z-0 outline-none"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email address",
                },
              })}
              defaultValue=""
            />
          </div>
          <div>
            <Input
              label="Password"
              variant="bordered"
              color="default"
              defaultValue=""
              radius="sm"
              placeholder="Enter your password"
              className="z-0 outline-none text-gray400"
              labelPlacement="outside"
              errorMessage={errors.password?.message?.toString() || ""}
              {...register("password", {
                required: "Please enter your password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              isInvalid={errors.password?.message?.toString() ? true : false}
              startContent={<PasswordIcon className="text-gray400" />}
              endContent={
                <button
                  className="focus:outline-none text-gray400"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Checkbox defaultSelected size="sm" color="default">
              Remember me
            </Checkbox>
          </div>

          <div className="text-sm">
            <Link
              as={NextLink}
              href="/forgot-password"
              size="sm"
              className="text-purple-dark"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            onClick={handleSubmit(onSubmit)}
            value={isSubmitting ? "Logging in..." : "Login"}
            extraClass="w-full"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
      {/* <div className="mt-6 grid grid-cols-2 gap-4">
      <button className="flex items-center justify-center gap-2 bg-[#3b5998] px-3 py-2 text-white rounded-md">
        <FaFacebookSquare className="h-5 w-5" />
        <span className="text-sm font-semibold">Facebook</span>
      </button>

      <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 px-3 py-2 text-gray-900 rounded-md">
        <FcGoogle className="h-5 w-5" />
        <span className="text-sm font-semibold">Google</span>
      </button>
    </div> */}
    </>
  );
};

export default LoginForm;
