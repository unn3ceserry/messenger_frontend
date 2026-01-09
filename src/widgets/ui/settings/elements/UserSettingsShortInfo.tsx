"use client";

import { AtSign, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface IUserSettingsShortInfo {
  number: string;
  username: string;
  email: string | null;
}

const UserSettingsShortInfo: FC<IUserSettingsShortInfo> = ({
  number,
  username,
  email,
}) => {
  const t = useTranslations();

  const elements = [
    {
      title: "number",
      icon: <Phone className="text-[#818181]" />,
      data: number,
    },
    {
      title: "username",
      icon: <AtSign className="text-[#818181]" />,
      data: username,
    },
    { title: "email", icon: <Mail className="text-[#818181]" />, data: email },
  ];

  return (
    <div className="flex flex-col p-1 w-full">
      {elements
        .filter((el) => el.data)
        .map((el, i) => (
          <div key={i} className="hover:bg-white/3 rounded-2xl px-5 py-2 flex items-center justify-start gap-5 cursor-pointer">
            {el.icon}
            <div className="flex flex-col items-start justify-center">
              <p>{el.title === 'number' ? '+' : el.title === 'username' ? '@' : ''}{el.data}</p>
              <p className="text-[.95rem] text-white/50">
                {t(`profile.${el.title}`)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserSettingsShortInfo;
