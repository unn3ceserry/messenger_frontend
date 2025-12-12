"use client";

import { FC, InputHTMLAttributes, ReactNode } from "react";

interface IDefaultInput extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}
const DefaultInput: FC<IDefaultInput> = ({ className, icon, ...props }) => {
  return (
    <div className="flex items-start justify-center p-3.5 bg-rect-bg backdrop-blur-xl rounded-xl ring-2 ring-accent/10 w-full">
      {icon}
      <input
        {...props}
        className={`${
          className ? className : ""
        }  text-[.85rem] text-text outline-0 flex items-center justify-center placeholder:text-text/50 w-full`}
      />
    </div>
  );
};

export default DefaultInput;
