"use client";

import { Checkbox, Input } from "@heroui/react";
import React, { useState } from "react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { MailIcon } from "./MailIcon";
import PasswordIcon from "./PasswordIcon";
import UserIcon from "./UserIcon";
import { toast } from "sonner";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "@/redux/hooks";
import { useRegistrationMutation } from "@/redux/features/auth/authApi";
import { setVerificationToken, TUser } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/utils/verifyToken";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import Button from "@/components/buttons/Button";

const RegisterForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [terms, setTerms] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [resError, setResError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [
    registration,
    { isLoading: isRegistrationLoading, isSuccess: isRegistrationSuccess },
  ] = useRegistrationMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Signing up ...");

    try {
      const userInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };

      const res = await registration(userInfo).unwrap();
      if (res.success === true) {
        dispatch(setVerificationToken(res.data.token));
        const user = verifyToken(res.data.token) as TUser;

        toast.success(res.message, {
          id: toastId,
          duration: 2000,
        });
        reset();
        setResError(null);
        router.push(
          `/verify?email=${user?.user?.email}&token=${res?.data?.token}`
        );
      }
    } catch (err: any) {
      setResError(err?.data?.message);
      toast.error(err?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (<>
    {resError ? <ErrorMessage errorMessage={resError} /> : null}
    {isRegistrationSuccess ? (
      <SuccessMessage successMessage="Registration successful. Please check your email to verify your account" />
    ) : null}
    <form
      className="space-y-6 flex flex-col mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-4 flex flex-col">
        <div>
          <Input
            isClearable
            type="text"
            radius="sm"
            label="First Name"
            placeholder="Enter your first name"
            labelPlacement="outside"
            variant="bordered"
            color="default"
            className="z-0"
            startContent={<UserIcon className="text-gray-400" />}
            errorMessage={errors.firstName?.message?.toString() || ""}
            isInvalid={errors.firstName?.message?.toString() ? true : false}
            {...register("firstName", {
              required: "Please enter your first name",
            })}
            defaultValue=""
          />
        </div>
        <div>
          <Input
            isClearable
            type="text"
            radius="sm"
            label="Last Name"
            placeholder="Enter your last name"
            labelPlacement="outside"
            variant="bordered"
            color="default"
            className="z-0"
            startContent={<UserIcon className="text-gray-400" />}
            errorMessage={errors.lastName?.message?.toString() || ""}
            isInvalid={errors.lastName?.message?.toString() ? true : false}
            {...register("lastName", {
              required: "Please enter your last name",
            })}
            defaultValue=""
          />
        </div>
        <div>
          <Input
            isClearable
            type="email"
            radius="sm"
            label="Email"
            placeholder="Enter your email address"
            labelPlacement="outside"
            startContent={<MailIcon className="text-gray-400" />}
            variant="bordered"
            color="default"
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
            className="z-0"
            labelPlacement="outside"
            errorMessage={errors.password?.message?.toString() || ""}
            {...register("password", {
              required: "Please enter your password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            isInvalid={errors.password?.message?.toString() ? true : false}
            startContent={<PasswordIcon className="text-gray-400" />}
            endContent={
              <button
                className="focus:outline-none text-gray-400"
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
          <Checkbox
            defaultSelected
            size="sm"
            onChange={() => setTerms(!terms)}
            className="text-gray-600"
            isInvalid={terms ? true : false}
          >
            I agree to the terms and conditions
          </Checkbox>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          extraClass="w-full"
          value={isSubmitting ? "Submitting..." : "Sign up"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  </>);
};

export default RegisterForm;
