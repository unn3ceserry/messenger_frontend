"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  handleDeleteMessage,
  Message,
  setEditMessage,
} from "@/entities/chats/model";
import { getMyData } from "@/entities/user";
import { ShadowWrapper, useSocketConnection } from "@/shared";
import { motion } from "framer-motion";
import { BrushCleaning, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  position: { x: number; y: number };
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  message: Message;
}

const MessagePopup: FC<Props> = ({ position, message, setIsOpen }) => {
  const t = useTranslations();

  const userId = useAppSelector(getMyData);
  const socket = useSocketConnection(userId);

  const dispatch = useAppDispatch();

  return (
    <ShadowWrapper
      position={position}
      children={
        <>
          <div
            onClick={() => {
              dispatch(setEditMessage(message));
              setIsOpen(false);
            }}
            className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
          >
            <Pencil size={19} />
            <p className="text-[.95rem]">{t("chat.editMsg")}</p>
          </div>
          <div
            onClick={() => {
              handleDeleteMessage(socket, message.id);
              setIsOpen(false);
            }}
            className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2 text-myred"
          >
            <BrushCleaning size={19} />
            <p className="text-[.95rem]">{t("chat.deleteMsg")}</p>
          </div>
        </>
      }
    />
  );
};

export default MessagePopup;
