"use client";

import { Input } from "@heroui/react";
import React, { useState } from "react";
import { MailIcon } from "./MailIcon";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import SuccessMessage from "@/components/common/SuccessMessage";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/buttons/Button";

const ForgotPasswordForm = () => {
  const [resError, setResError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Resetting password...");
    try {
      const userInfo = {
        email: data.email,
      };

      const res = await forgotPassword(userInfo).unwrap();

      if (res.success === true) {
        toast.success(
          "Password reset link has been sent to your email address",
          { id: toastId, duration: 2000 }
        );
        setSuccess(true);
        setResError(null);
        reset();
      }
    } catch (err: any) {
      setResError(err?.data?.message);
      setSuccess(false);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (<>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4"
    >
      {resError ? <ErrorMessage errorMessage={resError} /> : null}
      <div className="space-y-4 flex flex-col">
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
        {success && (
          <SuccessMessage successMessage="Password reset link has been sent to your email address" />
        )}
      </div>

      <div>
        <Button
          onClick={handleSubmit(onSubmit)}
          value={isSubmitting ? "Submitting..." : "Submit"}
          extraClass="w-full"
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  </>);
};

export default ForgotPasswordForm;
