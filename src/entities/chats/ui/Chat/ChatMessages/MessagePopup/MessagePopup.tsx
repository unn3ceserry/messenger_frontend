"use client";

import { useAppSelector } from "@/app";
import { getMyData } from "@/entities/user";
import { useSocketConnection } from "@/shared";
import { motion } from "framer-motion";
import { BrushCleaning, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  position: { x: number; y: number };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  messageId: string;
}

const MessagePopup: FC<Props> = ({ position, messageId, setIsOpen }) => {
  const t = useTranslations();

  const userId = useAppSelector(getMyData);
  const socket = useSocketConnection(userId);

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("deleteMessage", { messageId });
  };

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
        onClick={() => {
          handleDeleteMessage(messageId);
          setIsOpen(false);
        }}
        className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
      >
        <BrushCleaning size={19} />
        <p className="text-[.95rem]">{t("chat.deleteMsg")}</p>
      </div>
    </motion.div>
  );
};

export default MessagePopup;
