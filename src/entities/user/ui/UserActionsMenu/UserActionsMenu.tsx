"use client";

import { motion } from "framer-motion";
import { userActionsMenuElements } from "../../config";
import { useAppDispatch, useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats";
import { ActionsElement, Spinner } from "@/shared";
import { userApi } from "../../api";
import { getListIgnoredUsers } from "../../model";

const UserActionsMenu = () => {
  const { data, isLoading } = userApi.useGetMeQuery();
  const currentChat = useAppSelector(getCurrentChat);
  if (isLoading || !data || !currentChat) return <Spinner />;

  const opponent = currentChat.members.find((m) => m.user.id !== data.id);
  const userId = opponent?.user.id ?? "";
  const isBlocked = data.blockedUsers.includes(userId);
  const isMuted = useAppSelector(getListIgnoredUsers).includes(userId);

  const dispatch = useAppDispatch();
  const elements = userActionsMenuElements(
    dispatch,
    currentChat.id,
    userId,
    isBlocked,
    isMuted
  );
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      style={{ gap: 3 }}
      className="flex flex-col items-center justify-center p-1.5 font-medium max-w-50 shadow-wrapper right-3 top-15 paddingPopup"
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

export default UserActionsMenu;
