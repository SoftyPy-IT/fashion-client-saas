"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Input } from "@heroui/react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import ErrorMessage from "@/components/common/ErrorMessage";

import SuccessMessage from "@/components/common/SuccessMessage";
import { EyeFilledIcon } from "@/app/(auth)/_components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/(auth)/_components/EyeSlashFilledIcon";
import PasswordIcon from "@/app/(auth)/_components/PasswordIcon";
import Button from "@/components/buttons/Button";

const ChangePasswordForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState(null);
  const [changePassword, { isSuccess }] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const data = watch();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Changing password...");
    try {
      const userInfo = {
        oldPassword: data.oldPassword,
        newPassword: data.confirmPassword,
      };

      const res = await changePassword(userInfo).unwrap();

      if (res.success === true) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        reset();
        setError(null);
      }
    } catch (err: any) {
      setError(err?.data?.message);
      toast.error(err?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="max-w-full lg:max-w-lg">
      {isSuccess && (
        <div className="mb-4">
          <SuccessMessage successMessage="Password changed successfully" />
        </div>
      )}
      {
        // The error message is displayed if there is an error
        error && <ErrorMessage errorMessage={error} />
      }
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 mt-5"
      >
        <div className="space-y-4 flex flex-col">
          <div>
            <Input
              label="Old Password"
              variant="bordered"
              defaultValue=""
              radius="sm"
              placeholder="Enter your old password"
              className="z-0"
              labelPlacement="outside"
              errorMessage={errors.oldPassword?.message?.toString()}
              {...register("oldPassword", {
                required: "Please enter your old password",
              })}
              isInvalid={errors.oldPassword?.message?.toString() ? true : false}
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

          <div>
            <Input
              label="New Password"
              variant="bordered"
              defaultValue=""
              radius="sm"
              placeholder="Enter your new password"
              className="z-0"
              labelPlacement="outside"
              errorMessage={errors.newPassword?.message?.toString()}
              {...register("newPassword", {
                required: "Please enter your new password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              isInvalid={errors.newPassword?.message?.toString() ? true : false}
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

          <div>
            <Input
              label="Confirm Password"
              variant="bordered"
              defaultValue=""
              radius="sm"
              placeholder="Confirm your new password"
              className="z-0"
              labelPlacement="outside"
              errorMessage={errors.confirmPassword?.message?.toString()}
              {...register("confirmPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === data.newPassword || "Passwords do not match",
              })}
              isInvalid={
                errors.confirmPassword?.message?.toString() ? true : false
              }
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

        <div>
          <Button
            onClick={() => {}}
            value={isSubmitting ? "Changing..." : "Change Password"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
