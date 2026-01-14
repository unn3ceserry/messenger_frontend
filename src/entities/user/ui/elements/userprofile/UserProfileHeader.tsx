"use client";

import { useAppDispatch } from "@/app";
import { ArrowLeft, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { closeAll, openComponent } from "@/entities";

const UserProfileHeader = () => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();

  return (
    <header className="flex w-full justify-between items-center text-[#919191] sticky top-0 bg-[#212121] z-1231 p-2">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() => dispatch(closeAll())}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-white font-medium text-xl">
          {t("profile.title")}
        </h1>
      </div>

      <div className="flex gap-1 items-center justify-center relative">
        {/* edit-profile */}
        <div
          onClick={() => dispatch(openComponent("editProfile"))}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <Pencil size={22} />
        </div>
      </div>
    </header>
  );
};

export default UserProfileHeader;
