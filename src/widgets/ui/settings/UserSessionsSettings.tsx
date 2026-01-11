"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import UserSessionsSettingsHeader from "./elements/sessions/UserSessionsSettingsHeader";
import { sessionApi } from "@/entities";
import UserSessionsSettingsThisSession from "./elements/sessions/UserSessionsSettingsThisSession";
import UserSessionsSettingsOtherSessions from "./elements/sessions/UserSessionsSettingsOtherSessions";

const UserSessionsSettings = () => {
  const t = useTranslations();
  const { data: dataSessions, isLoading: isLoadingSessions } =
    sessionApi.useGetMyAccountSessionsQuery();
  const { data, isLoading } = sessionApi.useGetMySessionQuery();

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data || !dataSessions || isLoadingSessions) {
    return null;
  }

  return (
    <div className="z-1233 flex flex-col items-center justify-start h-screen overflow-y-auto text-white scrollbar-thin w-full">
      <motion.div
        exit={{ opacity: 0, scale: 0.8, x: -300 }}
        initial={{ opacity: 0, scale: 0.8, x: -300 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col items-center justify-start"
      >
        <UserSessionsSettingsHeader />
        <div className="flex flex-col items-start justify-center w-full p-2 px-3 gap-3">
          {/* this device */}
          <UserSessionsSettingsThisSession data={data} />
          <hr className="w-full border-3 border-black/15" />
          <UserSessionsSettingsOtherSessions data={dataSessions} />
          {/* other devices */}
        </div>
      </motion.div>
    </div>
  );
};
export default UserSessionsSettings;
