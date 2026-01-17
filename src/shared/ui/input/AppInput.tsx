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
      } flex items-center justify-center gap-2.5 p-3 px-5 rounded-xl ring-2 ring-inputs-ring-color focus-within:ring-accent duration-500 w-full text-default-text-color`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-default-text-color outline-none flex-1 placeholder:text-app-inputs-placeholder w-full text-[.9rem]`}
      />
    </div>
  );
};

export default AppInput;