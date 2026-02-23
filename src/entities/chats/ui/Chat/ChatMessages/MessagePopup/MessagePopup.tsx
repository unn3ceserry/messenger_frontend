"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import { Message } from "@/entities/chats/model";
import { getMyData } from "@/entities/user";
import { ActionsElement, useSocketConnection } from "@/shared";
import { Dispatch, FC, SetStateAction } from "react";
import { motion } from "framer-motion";
import { messagePopupElements } from "@/entities/chats/config";

interface Props {
  position: { x: number; y: number };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: Message;
}

const MessagePopup: FC<Props> = ({ position, message, setIsOpen }) => {
  const userId = useAppSelector(getMyData);
  const socket = useSocketConnection(userId);

  const dispatch = useAppDispatch();
  const elements = messagePopupElements(dispatch, message, setIsOpen, socket);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      style={{ left: position.x, top: position.y }}
      className="absolute z-50 flex flex-col items-center justify-center p-1.5 font-medium max-w-50 shadow-wrapper right-3 top-15 paddingPopup"
    >
      {elements
        .filter((el) => el.isMain)
        .map((el, i) => (
          <ActionsElement key={i} {...el} />
        ))}
      <hr className="w-full border border-black/5" />
      {elements
        .filter((el) => !el.isMain)
        .map((el, i) => (
          <ActionsElement key={i} {...el} />
        ))}
    </motion.div>
  );
};

export default MessagePopup;
