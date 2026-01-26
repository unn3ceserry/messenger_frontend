"use client";

import { AppInput } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  firstName: string;
  lastName: string;
  onChange: (v: { firstName?: string; lastName?: string }) => void;
}

const ChangeNames: FC<
  Props
> = ({ firstName, lastName, onChange }) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 gap-5">
      <AppInput
        value={firstName}
        placeholder={t("settings.editProfileSettings.inputFirstNamePlaceholder")}
        onChange={(e) => onChange({ firstName: e.target.value })}
      />
      <AppInput
        value={lastName}
        placeholder={t("settings.editProfileSettings.inputLastNamePlaceholder")}
        onChange={(e) => onChange({ lastName: e.target.value })}
      />
    </div>
  );
};

export default ChangeNames;
