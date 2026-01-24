"use client";

import { useAppDispatch } from "@/app";
import { Pencil, X } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  openComponent,
   closeOtherProfile,
} from "@/entities";

const OtherUsersProfileHeader = () => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();

  return (
    <header className="flex w-full justify-between items-center text-icons-color sticky top-0 bg-chatui-bg z-123123123 p-2 px-3">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() => dispatch(closeOtherProfile())}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
        >
          <X size={22} />
        </div>
        <h1 className="text-default-text-color font-medium text-xl">
          {t("otherProfile.title")}
        </h1>
      </div>

      <div className="flex gap-1 items-center justify-center relative">
        {/* edit-profile */}
        <div
          onClick={() => dispatch(openComponent("editProfile"))}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
        >
          <Pencil size={22} />
        </div>
      </div>
    </header>
  );
};
export default OtherUsersProfileHeader;
