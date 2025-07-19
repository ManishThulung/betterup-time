import { Activity } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

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
        <div className="m-4 flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <span className="text-xs font-medium text-white">{initial}</span>
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
    </div>
  );
};

export default Sidebar;
