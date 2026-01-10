"use client";

import { useAppDispatch } from "@/app";
import { setIsOpenEditProfile, setIsOpenUserSettings } from "@/entities";
import { handleLogout } from "@/features";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, EllipsisVertical, LogOut, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";

const UserSettingsHeader = () => {
  // actions
  const dispatch = useAppDispatch();
  const closeSettings = () =>
    dispatch(setIsOpenUserSettings({ isOpenUserSettings: false }));
  const setOpenEditProfile = () =>
    dispatch(setIsOpenEditProfile({ isOpenEditProfile: true }));

  const t = useTranslations();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const locale = useLocale()
  const handleClick = async () => {
    await handleLogout();
    await router.replace(`/${locale}`)
  } 

  return (
    <header className="flex w-full justify-between items-center text-[#919191] sticky top-0 bg-[#212121] z-123123123 p-1.5">
      <div className="flex items-center justify-center gap-3">
        {/* back */}
        <div
          onClick={closeSettings}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-white font-medium text-xl">
          {t("chat.actionsPopup.settings")}
        </h1>
      </div>

      <div className="flex gap-1 items-center justify-center relative">
        {/* edit-profile */}
        <div
          onClick={setOpenEditProfile}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <Pencil size={22} />
        </div>
        {/* settings */}
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="cursor-pointer flex p-2.5 items-center justify-center hover:bg-white/6 bg-transparent rounded-full duration-300"
        >
          <EllipsisVertical size={22} />
        </div>
      </div>
      {/* popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-start absolute p-0.5 backdrop-blur-lg rounded-xl max-w-50 text-white w-full shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)] top-15 right-0 cursor-pointer"
          >
            <div onClick={handleClick} className="flex items-center justify-start hover:bg-black/30 p-2 px-3 rounded-[10px] duration-500 w-full gap-2">
              <LogOut className="text-[#818181]" size={19} />
              <p>{t('settings.logout')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default UserSettingsHeader;
