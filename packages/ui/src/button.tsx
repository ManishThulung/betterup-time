"use client";

import { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./globals.css";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-blue-500 border border-[#000000] text-red-600",
        className
      )}
    >
      {children}
    </button>
  );
};
