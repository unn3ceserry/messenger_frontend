"use client";

import { Session } from "@/entities";
import { FC } from "react";
import UserSessionsSettingsDevice from "./UserSessionsSettingsDevice";
import { useTranslations } from "next-intl";

interface IUserSessionsSettingsOtherSessions {
  data: Array<Session>;
}

const UserSessionsSettingsOtherSessions: FC<
  IUserSessionsSettingsOtherSessions
> = ({ data }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-white/60 text-md">
        {t("settings.sessionSettings.activeSessions")}
      </p>
      <div className="flex flex-col items-center justify-center gap-3">
        {data.map((el, i) => (
          <UserSessionsSettingsDevice
            key={i}
            sessionId={el.id}
            browser={el.metadata.device.browser}
            city={el.metadata.location.city}
            country={el.metadata.location.country}
            os={el.metadata.device.os}
          />
        ))}
      </div>
    </div>
  );
};

export default UserSessionsSettingsOtherSessions;
