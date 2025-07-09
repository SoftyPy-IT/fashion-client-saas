"use client";

import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
interface UserIconProps {
  profile: Record<string, any> | null;
}

const UserIcon = ({ profile }: UserIconProps) => {
  const date = new Date();
  const hours = date.getHours();
  let time = "Good Morning";

  if (hours >= 12 && hours < 18) {
    time = "Good Afternoon";
  } else if (hours >= 18 && hours < 24) {
    time = "Good Evening";
  } else if (hours >= 24) {
    time = "Good Night";
  }

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
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: profile?.avatar?.url || "/avatar.png",
            }}
            className="transition-transform"
            description={time}
            name={profile?.firstName || "User"}
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

export default UserIcon;
