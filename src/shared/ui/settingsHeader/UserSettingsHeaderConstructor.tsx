"use client";

import { useAppDispatch } from "@/app";
import { handleLogout } from "@/features";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, EllipsisVertical, LogOut, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useLocale } from "next-intl";
import { closeAll, openComponent, IIsOpenUIComponent } from "@/entities";
import ShadowWrapper from "../wrappers/ShadowWrapper";

interface IUserSettingsHeaderConstructor {
  title: string;
  backUI: IIsOpenUIComponent;
  typeHeader: "settings" | "profile" | "default";
}

const UserSettingsHeaderConstructor: FC<IUserSettingsHeaderConstructor> = ({
  backUI,
  title,
  typeHeader,
}) => {
  // actions
  const dispatch = useAppDispatch();

  const t = useTranslations();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale();

  const handleClick = async () => {
    await handleLogout();
    await router.replace(`/${locale}`);
  };

  return (
    <header className="flex w-full justify-between items-center text-icons-color sticky top-0 bg-chatui-bg p-2 px-3">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() =>
            dispatch(backUI === null ? closeAll() : openComponent(backUI))
          }
          className="iconHoverEffect"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-default-text-color font-medium text-xl">
          {t(title)}
        </h1>
      </div>

      {(() => {
        switch (typeHeader) {
          case "settings":
            return (
              <div className="flex gap-1 items-center justify-center relative">
                {/* editprofile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="iconHoverEffect"
                >
                  <Pencil size={22} />
                </div>
                {/* logout */}
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="iconHoverEffect"
                >
                  <EllipsisVertical size={22} />
                </div>
              </div>
            );
          case "profile":
            return (
              <div className="flex gap-1 items-center justify-center relative">
                {/* editprofile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="iconHoverEffect"
                >
                  <Pencil size={22} />
                </div>
              </div>
            );
          case "default":
          default:
            break;
        }
      })()}
      {/* popup */}
      <AnimatePresence>
        {isOpen && (
          <ShadowWrapper
            children={
              <div
                onClick={handleClick}
                className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
              >
                <LogOut className="text-icons-color" size={19} />
                <p className="text-[.95rem]">{t("settings.logout")}</p>
              </div>
            }
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserSettingsHeaderConstructor;
