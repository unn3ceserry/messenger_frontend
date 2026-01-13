"use client";

import { Gift } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, FC } from "react";

interface IUserEdtirProfileSettingsSetBirthday {
  birthday: string;
  onChange: (birthday: string) => void;
}

const UserEdtirProfileSettingsSetBirthday: FC<
  IUserEdtirProfileSettingsSetBirthday
> = ({ birthday, onChange }) => {

  const t = useTranslations()

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.showPicker?.();
  };

  return (
    <div className="relative w-full" onClick={handleClick}>
      <div className="relative hover:bg-white/5 rounded-2xl px-5 py-4 flex items-center justify-start gap-5 cursor-pointer w-full">
        <Gift className="text-[#919191]" />
        <p className="pointer-events-none">
          {birthday
            ? new Date(birthday).toLocaleDateString("ru-RU")
            : t('profile.birthday')}
        </p>
        <input
          ref={inputRef}
          type="date"
          value={birthday ? birthday.split("T")[0] : ""}
          onChange={(e) => onChange(e.target.value)}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default UserEdtirProfileSettingsSetBirthday;
