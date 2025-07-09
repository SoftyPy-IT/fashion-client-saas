"use client";

import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppPhoneInput from "@/components/form/AppPhoneInput";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { setProfile } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import * as zod from "zod";

const profileSchema = zod.object({
  firstName: zod
    .string()
    .min(3, "First name is too short")
    .nonempty("Please enter your first name"),
  lastName: zod.string().nonempty("Please enter your last name"),
  phone: zod
    .string()
    .nonempty("Please enter your phone number")
    .refine((value) => {
      const phoneNumber = parsePhoneNumberFromString(value, "BD");
      return phoneNumber && phoneNumber.isValid();
    }, "Please enter a valid phone number"),
  dateOfBirth: zod.string().nonempty("Please enter your date of birth"),
  address: zod.string().nonempty("Please enter your address"),
  city: zod.string().nonempty("Please enter your city"),
  country: zod.string().nonempty("Please enter your country"),
  postalCode: zod.string().nonempty("Please enter your postal code"),
});

const UpdateProfileForm = ({ profile }: { profile: any }) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [updateProfile, { isSuccess, isLoading }] = useUpdateProfileMutation();

  const { data: session, update: sessionUpdate, status } = useSession();

  const defaultValues = {
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    phone: profile?.phone || "",
    dateOfBirth: new Date(profile?.dateOfBirth).toISOString().split("T")[0],
    address: profile?.address?.address || "",
    city: profile?.address?.city || "",
    country: profile?.address?.country || "",
    postalCode: profile?.address?.postalCode || "",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating profile");

    try {
      const userInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: {
          address: data.address,
          city: data.city,
          country: data.country,
          postalCode: data.postalCode,
        },
        dateOfBirth: data.dateOfBirth,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(userInfo));

      const res = await updateProfile(formData).unwrap();

      if (res.success === true) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        dispatch(setProfile(res.data));
        await sessionUpdate({
          ...session,
          user: {
            ...session?.user,
            ...res.data,
            name: `${res.data.firstName} ${res.data.lastName}`,
          },
        });
        window.location.replace("/profile/my-account");
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
    <>
      <div className="mb-4">
        {error && <ErrorMessage errorMessage={error} />}
        {isSuccess && (
          <SuccessMessage successMessage="Profile updated successfully" />
        )}
      </div>
      <AppForm
        onSubmit={onSubmit}
        resolver={zodResolver(profileSchema)}
        defaultValues={defaultValues}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <AppInput
            type="text"
            name="firstName"
            label="First name"
            placeholder="Enter your first name"
            required
            size="md"
          />

          <AppInput
            type="text"
            name="lastName"
            label="Last name"
            placeholder="Enter your last name"
            required
            size="md"
          />

          <AppPhoneInput
            name="phone"
            label="Phone number"
            placeholder="Enter your phone number"
            international={true}
          />

          <AppInput
            type="date"
            name="dateOfBirth"
            label="Date of birth"
            required
            size="md"
            defaultValue={defaultValues.dateOfBirth}
          />

          <AppInput
            type="text"
            name="address"
            label="Address"
            placeholder="Enter your address"
            required
            size="md"
          />

          <AppInput
            type="text"
            name="city"
            label="City"
            placeholder="Enter your city"
            required
            size="md"
          />

          <AppInput
            type="text"
            name="country"
            label="Country"
            placeholder="Enter your country"
            required
            size="md"
          />

          <AppInput
            type="text"
            name="postalCode"
            label="Postal code"
            placeholder="Enter your postal code"
            required
            size="md"
          />
        </div>
        <div className="mt-8">
          <Button
            value={isLoading ? "Updating..." : "Update Profile"}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </AppForm>
    </>
  );
};

export default UpdateProfileForm;
