"use client";

import { SearchInput } from "@/shared";
import { Equal, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface ILeftSideBarSearch {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LeftSideBarSearch: FC<ILeftSideBarSearch> = ({setIsOpen}) => {
  const t = useTranslations();

  return (
    <div className="flex w-full items-center justify-between p-3 gap-3">
      <div onClick={() => setIsOpen(prev => !prev)} className="flex p-1.5 items-center justify-center cursor-pointer hover:bg-checkbox-hover bg-transparent rounded-full">
        <Equal className="text-icons-color" />
      </div>
      <SearchInput
        icon={<Search className="text-input-icons-color" size={22} />}
        placeholder={t("chat.searchPlaceholder")}
      />
    </div>
  );
};

export default LeftSideBarSearch;
