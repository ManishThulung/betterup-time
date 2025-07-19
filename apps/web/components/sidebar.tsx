import Link from "next/link";
import React from "react";

interface IProps {
  items: {
    title: string;
    path: string;
  }[];
}
const Sidebar = ({ items }: IProps) => {
  return (
    <div className="flex p-4 gap-6 flex-col h-screen w-[340px] bg-blue-400 text-white">
      {items.map((item) => (
        <Link key={item.path} href={item.path}>
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
