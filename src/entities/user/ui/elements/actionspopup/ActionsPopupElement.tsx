"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

interface IActionsPopupElement {
  icon: ReactNode;
  title: string;
  onClick: () => void
}

const ActionsPopupElement: FC<IActionsPopupElement> = ({ icon, title, onClick }) => {

  const t = useTranslations()

  return (
    <div onClick={onClick} className="flex items-center w-full gap-2.5 cursor-pointer hover:bg-black/30 p-2 rounded-[10px] duration-300">
      {icon}
      <p className="text-[.9rem]">{t(title)}</p>
    </div>
  );
};

export default ActionsPopupElement;
