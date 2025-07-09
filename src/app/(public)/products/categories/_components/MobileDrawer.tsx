import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
} from "@heroui/react";
import Sidebar from "./Sidebar";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarProps: any; // Pass all props required by the Sidebar component
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  sidebarProps,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">Categories</DrawerHeader>
        <DrawerBody>
          <Sidebar {...sidebarProps} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
