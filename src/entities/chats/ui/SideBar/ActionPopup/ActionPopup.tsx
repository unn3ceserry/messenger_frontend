"use client";

import { handleDeleteChat } from "@/entities/chats/model";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  position: { x: number; y: number };
  chatId: string;
}

const ActionPopup: FC<Props> = ({ position, chatId }) => {
  const t = useTranslations();

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{ top: position.y, left: position.x }}
      onContextMenu={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-start absolute p-0.5 backdrop-blur-lg bg-checkbox-hover rounded-xl max-w-50 text-default-text-color w-full shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] top-15 right-3 cursor-pointer"
    >
      <div
        onClick={() => handleDeleteChat(chatId)}
        className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
      >
        <Trash size={19} />
        <p className="text-[.95rem]">{t("chat.deleteChat")}</p>
      </div>
    </motion.div>
  );
};

export default ActionPopup;
