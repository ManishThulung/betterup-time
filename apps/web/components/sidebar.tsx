"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/web/components/ui/dropdown-menu";
import {
  Activity,
  BellDotIcon,
  CircleUser,
  CreditCardIcon,
  EllipsisVertical,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

interface IProps {
  items: {
    title: string;
    path: string;
    icon: React.ReactNode;
  }[];
  username: string;
  email: string;
}
const Sidebar = ({ items, username, email }: IProps) => {
  const initial = username.charAt(0).toUpperCase();
  const router = useRouter();

  const handleLogout = () => {
    setCookie("token", null);
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-between h-screen w-[340px] bg-[#f3f4f5]">
      <div className="flex flex-col  text-gray-700">
        <div className="flex items-center gap-2 px-6 py-8">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">UpWatch</span>
        </div>
        <Separator />
        <div className="px-4 mt-8 flex gap-1 flex-col ">
          {items.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="hover:bg-[#eceaea] p-2 flex gap-2 items-center"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Separator />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="m-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3 cursor-pointer">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <span className="text-xs font-medium text-white">
                      {initial}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {username}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {email}
                    </p>
                  </div>
                </div>

                <EllipsisVertical size={20} className="text-gray-600" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="m-1 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3 cursor-pointer">
                <div className="flex gap-2 items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                    <span className="text-xs font-medium text-white">
                      {initial}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {username}
                    </p>
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {email}
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUser />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellDotIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
