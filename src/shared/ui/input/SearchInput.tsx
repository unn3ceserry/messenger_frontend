"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IDefaultInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  classNameDiv?: string;
}
const SearchInput: FC<IDefaultInput> = ({
  className,
  classNameDiv,
  icon,
  ...props
}) => {
  return (
    <div
      className={`${
        classNameDiv ? classNameDiv : ""
      } flex items-center justify-center gap-2.5 p-2.5 bg-white/5 backdrop-blur-xl rounded-full ring-2 ring-white/7 focus-within:ring-accent duration-500 w-full text-white`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-white outline-none flex-1 placeholder:text-white/50 w-full`}
      />
    </div>
  );
};

export default SearchInput;