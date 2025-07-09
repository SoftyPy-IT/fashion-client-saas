"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserIconProps {
  profile: Record<string, any> | null;
}
const UserAvatar = ({ profile }: UserIconProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    signOut({
      redirect: false,
      callbackUrl: "/login",
    });

    dispatch(logout());

    // router.refresh();
    // router.push("/");
    window.location.href = "/login";
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar
            as="button"
            src={profile?.avatar?.url || "/avatar.png"}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{profile?.email || "@user"}</p>
          </DropdownItem>
          <DropdownItem key="My Account">
            <Link href="/profile/my-account">My Account</Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/profile/settings">My Settings</Link>
          </DropdownItem>
          <DropdownItem key="orders">
            <Link href="/profile/orders">My Orders</Link>
          </DropdownItem>

          <DropdownItem key="logout" color="danger">
            <button onClick={handleLogout}>Logout</button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
