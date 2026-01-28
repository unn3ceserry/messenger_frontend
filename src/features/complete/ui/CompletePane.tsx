"use client";

import { Redo } from "lucide-react";
import { useTranslations } from "next-intl";
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
        <div className="flex items-center justify-center p-[13px] bg-linear-to-b from-accent/60 to-accent/15 rounded-2xl">
          {icon}
        </div>
        <div className="flex flex-col items-start justify-center">
          <h3 className="text-white">{t(title)}</h3>
          <p className="text-[0.85rem] text-button-text-color/50 line-clamp-1">{t(desc)}</p>
        </div>
      </div>

      {/* right */}
      <button
        onClick={() => setWhoVisible(tag)}
        className="bg-button-main-bg text-button-text-color ring-2 ring-rect-boder cursor-pointer opacity-40 duration-500 hover:opacity-100 backdrop-blur-xl flex p-[13px] items-center justify-center rounded-2xl"
      >
        <Redo size={22} />
      </button>
    </div>
  );
};

export default CompletePane;
