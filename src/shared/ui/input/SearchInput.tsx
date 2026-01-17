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
      } flex items-center justify-center gap-2.5 px-2.5 py-2 bg-checkbox-hover backdrop-blur-xl rounded-full ring-2 ring-inputs-ring-color focus-within:ring-accent duration-500 w-full text-default-text-color`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-default-text-color outline-none flex-1 placeholder:text-app-inputs-placeholder w-full`}
      />
    </div>
  );
};

export default SearchInput;