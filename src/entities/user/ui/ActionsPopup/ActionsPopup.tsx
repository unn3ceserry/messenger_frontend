"use client";

import { motion } from "framer-motion";
import { useAppDispatch } from "@/app";
import { configApp } from "@/app";
import { RenderAvatarElement } from "@/shared";
import { FC } from "react";
import { userActionsElements } from "../../config";
import { openComponent, UserType } from "../../model";
import ActionsPopupElement from "./ActionsPopupElement";

interface IActionsPopup {
  data: UserType
}

const ActionsPopup: FC<IActionsPopup> = ({data}) => {
  const dispatch = useAppDispatch();

  const actions = userActionsElements(dispatch);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col items-center justify-center p-1.5 backdrop-blur-lg rounded-[16px] text-default-text-color w-full gap-0.5 shadow-[0_0px_20px_-8px_rgba(0,0,0,0.7)] font-medium"
    >
      {/* user short info */}
      <div
        onClick={() => dispatch(openComponent('myProfile'))}
        className="flex items-center w-full gap-3 cursor-pointer hover:bg-actions-popup-hover p-2 rounded-[10px] duration-300"
      >
        <RenderAvatarElement
          hasAvatar={!!data.avatars.length}
          size={24}
          avatar={data.avatars[data.avatars.length -1]}
        />

        <p className="text-[.9rem]">
          {data.firstName} {data.lastName}
        </p>
      </div>

      {actions.map((el, i) => (
        <ActionsPopupElement key={i} {...el} />
      ))}

      <p className="text-[.8rem] text-icons-color">
        {configApp.NAME()} {configApp.TYPE_APP()} {configApp.VERSION()}
      </p>
    </motion.div>
  );
};

export default ActionsPopup;
