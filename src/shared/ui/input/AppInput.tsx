"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IAppInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  classNameDiv?: string;
}
const AppInput: FC<IAppInput> = ({
  className,
  classNameDiv,
  icon,
  ...props
}) => {
  return (
    <div
      className={`${
        classNameDiv ? classNameDiv : ""
      } flex items-center justify-center gap-2.5 p-3 rounded-xl ring-2 ring-white/7 focus-within:ring-accent duration-500 w-full text-white`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-white outline-none flex-1 placeholder:text-white/50 w-full text-[.9rem]`}
      />
    </div>
  );
};

export default AppInput;