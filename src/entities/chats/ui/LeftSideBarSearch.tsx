"use client";

import { SearchInput } from "@/shared";
import { Equal, Search } from "lucide-react";
import { useTranslations } from "next-intl";

const LeftSideBarSearch = () => {
  const t = useTranslations();

  return (
    <div className="flex w-full items-center justify-between p-3 gap-3">
      <div className="flex p-1.5 items-center justify-center cursor-pointer hover:bg-white/6 bg-transparent rounded-full">
        <Equal className="text-white/70" />
      </div>
      <SearchInput
        icon={<Search className="text-[#717171]" />}
        placeholder={t("chat.searchPlaceholder")}
      />
    </div>
  );
};

export default LeftSideBarSearch;
