"use client";

import Image from "next/image";
import { userApi } from "../api";
import ActionsPopupElement from "./elements/ActionsPopupElement";
import { motion } from "framer-motion";
import { userActionsElements } from "../config";
import { configApp } from "@/app";

const ActionsPopup = () => {
  const { data, isLoading } = userApi.useGetMeQuery();

  // сделать лоадер
  if (isLoading || !data) {
    return null;
  }

  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center p-1.5 backdrop-blur-lg rounded-xl text-white w-full gap-0.5 shadow-[0_0px_30px_-8px_rgba(0,0,0,0.8)]"
    >
      {/* user short info */}
      <div className="flex items-center w-full gap-2.5 cursor-pointer hover:bg-black/30 p-2 rounded-[10px] duration-300">
        {data.avatars ? (
          <Image
            src={data.avatars[0]}
            alt={data.username}
            width={6}
            height={6}
          />
        ) : (
          <div className="w-6 aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"></div>
        )}

        <p className="text-)[.9rem]">
          {data.firstName} {data.lastName}
        </p>
      </div>

      {userActionsElements.map((el, i) => (
        <ActionsPopupElement key={i} onClick={el.onClick} icon={el.icon} title={el.title} />
      ))}

      <p className="text-[.8rem] text-white/50">Fluent Web {configApp.VERSION()}</p>

    </motion.div>
  );
};

export default ActionsPopup;
