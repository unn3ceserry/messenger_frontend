"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IDefaultInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  classNameDiv?: string;
}
const DefaultInput: FC<IDefaultInput> = ({
  className,
  classNameDiv,
  icon,
  ...props
}) => {
  return (
    <div
      className={`${
        classNameDiv ? classNameDiv : ""
      } flex items-start justify-center gap-2 p-3.5 bg-rect-bg backdrop-blur-xl rounded-xl ring-2 ring-accent/5 w-full`}
    >
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        } text-text outline-none flex-1 placeholder:text-text/50 w-full`}
      />
    </div>
  );
};

export default DefaultInput;
