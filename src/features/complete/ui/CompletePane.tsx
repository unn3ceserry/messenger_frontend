"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface ICompletePane {
  icon: ReactNode;
  title: string;
  desc: string;
  setWhoVisible: Dispatch<
    SetStateAction<"email" | "birthday" | "password" | null>
  >;
  tag: "email" | "birthday" | "password";
}

const CompletePane: FC<ICompletePane> = ({
  desc,
  icon,
  setWhoVisible,
  title,
  tag,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-row items-center5 justify-between w-full">
      {/* left */}
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="flex items-center justify-center p-2.5 bg-linear-to-b from-accent/60 to-accent/15 rounded-2xl">
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white">{t(title)}</h3>
          <p className="text-[0.85rem] text-text/50 line-clamp-1">{t(desc)}</p>
        </div>
      </div>

      {/* right */}
      <button
        onClick={() => setWhoVisible(tag)}
        className="bg-rect-bg ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl flex p-2.5 items-center justify-center rounded-2xl"
      >
        <Image
          src={"/arrow-right.svg"}
          alt="arrow-right"
          width={27}
          height={27}
        />
      </button>
    </div>
  );
};

export default CompletePane;
