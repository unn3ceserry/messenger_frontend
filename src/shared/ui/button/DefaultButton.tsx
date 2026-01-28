'use client'

import { useTranslations } from "next-intl";
import { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const DefaultButton: FC<Props> = ({ text, ...props }) => {

  const t = useTranslations();

  return (
    <button
      {...props}
      className="bg-button-main-bg text-button-text-color ring ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl rounded-xl flex p-2.5 items-center justify-center w-full"
    >
      {t(text)}
    </button>
  );
};

export default DefaultButton;
