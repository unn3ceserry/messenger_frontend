"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleMinus } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { userApi } from "../../api";

interface IUserProfileLastAvatars {
  avataras: string[] | [];
}

const UserProfileLastAvatars: FC<IUserProfileLastAvatars> = ({ avataras }) => {
  const t = useTranslations();

  const [openedAvatar, setOpenedAvatar] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [removeAvatar] = userApi.useRemoveAvatarMutation();
  const [index, setIndex] = useState<number>(0);
  const handleClick = async () => {
    setIsOpen(false);
    await removeAvatar(index);
  };

  return (
    <div className="flex flex-col items-start justify-center gap-3 w-full p-2">
      <p className="text-[.9rem] text-icons-color">
        {t("profile.lastAvatars")}:
      </p>
      <div className="grid gap-1.5 grid-cols-[repeat(auto-fill,minmax(80px,1fr))]">
        {avataras.slice(0, 15).map((el, i) =>
          el ? (
            <div
              key={i}
              onContextMenu={(e) => {
                e.preventDefault();
                setIndex(i);
                setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
                setIsOpen((prev) => !prev);
              }}
              onClick={() => setOpenedAvatar(el)}
              className="flex items-center justify-center "
            >
              <img
                src={el}
                alt={`avatar-${i}`}
                className="w-full h-auto object-cover aspect-square rounded-lg cursor-pointer"
              />
            </div>
          ) : null,
        )}

        <AnimatePresence>
          {openedAvatar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpenedAvatar(null)}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-[12312312313]"
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
          {isOpen && (
            <motion.div
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              style={{ top: position.y, left: position.x }}
              className="fixed p-0.5 backdrop-blur-lg rounded-xl w-max shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)] z-50 cursor-pointer"
            >
              <div
                onClick={handleClick}
                className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
              >
                <CircleMinus size={19} />
                <p>{t("profile.removeAvatar")}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfileLastAvatars;
