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
    <header className="flex w-full justify-between items-center text-icons-color sticky top-0 bg-chatui-bg z-123123123 p-2 px-3">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={() =>
            dispatch(backUI === null ? closeAll() : openComponent(backUI))
          }
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
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
                {/* edit-profile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
                >
                  <Pencil size={22} />
                </div>
                {/* logout */}
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
                >
                  <EllipsisVertical size={22} />
                </div>
              </div>
            );
          case "profile":
            return (
              <div className="flex gap-1 items-center justify-center relative">
                {/* edit-profile */}
                <div
                  onClick={() => dispatch(openComponent("editProfile"))}
                  className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-checkbox-hover bg-transparent rounded-full duration-300"
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
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-start absolute p-0.5 backdrop-blur-lg bg-checkbox-hover rounded-xl max-w-50 text-default-text-color w-full shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] top-15 right-3 cursor-pointer"
          >
            <div
              onClick={handleClick}
              className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
            >
              <LogOut className="text-icons-color" size={19} />
              <p className="text-[.95rem]">{t("settings.logout")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserSettingsHeaderConstructor;
