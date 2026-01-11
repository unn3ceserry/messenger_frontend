"use client";

import { Session, sessionApi } from "@/entities";
import UserSessionsSettingsDevice from "./UserSessionsSettingsDevice";
import { useTranslations } from "next-intl";
import { createRipple } from "@/shared";
import { CircleMinus } from "lucide-react";
import { FC } from "react";

interface IUserSessionsSettingsThisSession {
  data: Session;
}

const UserSessionsSettingsThisSession: FC<IUserSessionsSettingsThisSession> = ({
  data,
}) => {
  const t = useTranslations();

  const [clearSessions] = sessionApi.useClearAllSessionsWithoutMyMutation();

  const handleClearAllSessionsWithoutMy = async () => {
    await clearSessions();
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-white/70 text-lg">
        {t("settings.sessionSettings.thisDevice").toUpperCase()}
      </p>
      <UserSessionsSettingsDevice
        sessionId={data.id}
        browser={data.metadata.device.browser}
        city={data.metadata.location.city}
        country={data.metadata.location.country}
        os={data.metadata.device.os}
        isMySession
      />
      <div
        onClick={async (e) => {
          createRipple(e);
          await handleClearAllSessionsWithoutMy();
        }}
        className="relative overflow-hidden hover:bg-white/5 rounded-2xl px-5 py-3 flex items-center justify-start gap-5 cursor-pointer w-full text-myred"
      >
        <CircleMinus />
        <p>{t("settings.sessionSettings.terminateAllOther")}</p>
      </div>
    </div>
  );
};

export default UserSessionsSettingsThisSession;
