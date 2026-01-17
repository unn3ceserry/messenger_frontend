"use client";

import { configApp } from "@/app";
import { Chromium, CircleMinus } from "lucide-react";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { sessionApi } from "@/entities";

interface IUserSessionsSettingsDevice {
  browser: string;
  os: string;
  country: string;
  city: string;
  sessionId: string;
  isMySession?: boolean;
}

const UserSessionsSettingsDevice: FC<IUserSessionsSettingsDevice> = ({
  browser,
  city,
  country,
  os,
  sessionId,
  isMySession = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = useTranslations();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [removeSessionById] = sessionApi.useRemoveSessionByIdMutation();

  const handleClick = async () => {
    await removeSessionById(sessionId);
  };

  return (
    <div
      onContextMenu={(e) => {
        if (!isMySession) {
          e.preventDefault();
          setPosition({ x: e.clientX + 5, y: e.clientY + 5 });
          setIsOpen((prev) => !prev);
        }
      }}
      className={`flex items-center justify-start w-full gap-4 px-3 relative ${
        isMySession ? "" : "cursor-pointer hover:bg-checkbox-hover rounded-2xl py-2"
      }`}
    >
      {/* icon */}
      <div className="flex items-center justify-center bg-accent p-1.5 rounded-2xl">
        <Chromium size={27} className="text-white" />
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-center w-full text-[.95rem]">
        <p>{browser}</p>
        <p>
          {configApp.NAME()} {configApp.TYPE_APP()} {configApp.VERSION()}, {os}
        </p>
        <p className="text-icons-color text-[.85rem]">
          {isMySession && "-"} {city}, {country}
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            exit={{ opacity: 0, scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ top: position.y, left: position.x }}
            className="fixed p-0.5 backdrop-blur-lg rounded-xl max-w-[200px] text-myred shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] z-50"
          >
            <div
              onClick={handleClick}
              className="flex items-center justify-start hover:bg-actions-popup-hover p-2 px-3 rounded-[10px] duration-500 w-full gap-2"
            >
              <CircleMinus className="text-myred" size={19} />
              <p>{t("settings.sessionSettings.terminate")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserSessionsSettingsDevice;
