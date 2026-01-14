"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FC, Fragment, useState } from "react";

interface IUserProfileLastAvatars {
  avataras: string[] | [];
}

const UserProfileLastAvatars: FC<IUserProfileLastAvatars> = ({ avataras }) => {
  const t = useTranslations();

  const [openedAvatar, setOpenedAvatar] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-start justify-center gap-3 w-full p-2">
      <p className="text-[.9rem] text-white/50">{t("profile.lastAvatars")}:</p>
      <div className="grid gap-1.5 grid-cols-[repeat(auto-fill,minmax(80px,1fr))]">
        {avataras.slice(0, 15).map((el, i) => (
          <Fragment key={i}>
            <div
              onClick={() => setOpenedAvatar(el)}
              className="flex items-center justify-center "
            >
              <img
                src={el}
                alt={`avatar-${i}`}
                className="w-full h-auto object-cover aspect-square rounded-lg cursor-pointer"
              />
            </div>
          </Fragment>
        ))}
        <AnimatePresence>
          {openedAvatar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenedAvatar(null)}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-5  z-12311"
            >
              <motion.img
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                transition={{ duration: 0.2 }}
                src={openedAvatar}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-150 aspect-square object-cover rounded-xl cursor-pointer"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfileLastAvatars;
