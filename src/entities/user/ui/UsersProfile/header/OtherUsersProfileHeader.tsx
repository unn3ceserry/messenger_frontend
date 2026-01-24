"use client";

import { useAppDispatch } from "@/app";
import { UserRoundPen, UserRoundPlus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { closeOtherProfile, userApi } from "@/entities";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  username: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const OtherUsersProfileHeader: FC<Props> = ({ username, setIsOpen }) => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();
  const { data, isLoading } = userApi.useIsMyContactQuery(username);
  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading) {
    return null;
  }

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
        {/* contact actions */}
        <div
          onClick={() => data ? setIsOpen(true) : setIsOpen(true)}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
        >
          {data ? <UserRoundPen size={22} /> : <UserRoundPlus size={22} />}
        </div>
      </div>
    </header>
  );
};
export default OtherUsersProfileHeader;
