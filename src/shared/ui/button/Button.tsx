"use client";

import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
}

const Button: FC<IButton> = ({ icon, className, label, ...props }) => {
  return (
    <button
      {...props}
      className={`p-1.5 backdrop-blur-2xl px-2.5 flex items-center justify-center cursor-pointer relative gap-2 font-medium text-red-50 bg-linear-to-tr from-accent/25 via-button/70 to-accent/25 ring-3 ring-accent/20 rounded-md overflow-hidden duration-500 hover:opacity-85 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-md before:bg-gradient-to-b before:from-accent/10 before:blur-xl disabled:cursor-not-allowed ${
        className ?? ""
      }`}
    >
      {icon}
      <p>{label}</p>
    </button>
  );
};

export default Button;
