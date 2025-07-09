"use client";
import { useUpdateAvatarMutation } from "@/redux/features/auth/authApi";
import { setProfile } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Avatar, CircularProgress } from "@heroui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "sonner";

const UpdateAvatar = ({ url }: { url: string }) => {
  const [image, setImage] = useState(url);
  const [hovering, setHovering] = useState(false);
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const dispatch = useAppDispatch();
  const { data: session, update: sessionUpdate, status } = useSession();

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Uploading image");

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Replace "YOUR_UPLOAD_API_ENDPOINT" with the actual URL
      const res = await updateAvatar(formData).unwrap();

      if (res.success === true) {
        dispatch(setProfile(res?.data));
        setImage(res.data.avatar.url);

        await sessionUpdate({
          ...session,
          user: {
            ...session?.user,
            ...res.data,
            name: `${res.data.firstName} ${res.data.lastName}`,
            avatar: res.data.avatar,
          },
        });
        window.location.replace("/profile/my-account");
        toast.success("Image uploaded", { id: toastId, duration: 2000 });
      } else {
        toast.error("Failed to upload image", { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error("Failed to upload image", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="text-center relative">
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {isLoading ? (
          <div className="flex justify-center items-center bg-gray-200 rounded-full ">
            <CircularProgress size="sm" aria-label="Loading..." />
          </div>
        ) : (
          <>
            <Avatar
              src={image ? image : "/avatar.png"}
              alt="Uploaded"
              size="lg"
            />
            {hovering && (
              <label
                htmlFor="imageInput"
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-full cursor-pointer transition-opacity duration-300"
              >
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
                <PlusIcon className="h-6 w-6 text-white" />
              </label>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateAvatar;
