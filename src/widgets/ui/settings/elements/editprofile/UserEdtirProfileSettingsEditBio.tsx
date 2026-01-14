"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

interface IUserEdtirProfileSettingsEditBio {
  bio: string | null;
  onChange: (bio: string) => void;
}

const UserEdtirProfileSettingsEditBio: FC<IUserEdtirProfileSettingsEditBio> = ({
  bio,
  onChange,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-start justify-center w-full px-5 gap-3">
      <p className="text-white/50">{t("profile.bio")}</p>
      <div className="flex flex-col items-center justify-center gap-5">
        <textarea
          className="resize-none outline-0 block p-3 px-5 rounded-xl ring-2 ring-white/7 focus:ring-accent duration-300 w-full h-20 text-white placeholder:text-white/50 text-[.9rem]"
          placeholder={t("settings.editProfileSettings.inputBioPlaceholder")}
          value={bio ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
        <p className="text-white/50 text-[.8rem]">
          {t("settings.editProfileSettings.bioSubtext")}
        </p>
      </div>
    </div>
  );
};

export default UserEdtirProfileSettingsEditBio;
