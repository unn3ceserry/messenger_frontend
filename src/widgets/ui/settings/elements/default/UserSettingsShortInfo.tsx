"use client";

import { createRipple } from "@/shared";
import { AtSign, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, MouseEvent, useRef, useState } from "react";

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

  // сделать в будущем уведомление на то что скопировано
  const handleCopy = async (result: string) => {
    try {
      await navigator.clipboard.writeText(result.toString());
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  const [whoCopied, setWhoCopied] = useState<
    null | "number" | "email" | "username"
  >(null);

  const elements = [
    {
      title: "number",
      icon: <Phone className="text-icons-color" />,
      data: number,
    },
    {
      title: "username",
      icon: <AtSign className="text-icons-color" />,
      data: username,
    },
    { title: "email", icon: <Mail className="text-icons-color" />, data: email },
  ];

  return (
    <div className="flex flex-col p-1 w-full">
      {elements
        .filter((el) => el.data)
        .map((el, i) => (
          <div
            key={i}
            onClick={async (e) => {
              handleCopy(el.data ?? "");
              createRipple(e);
            }}
            className={`relative overflow-hidden hover:bg-checkbox-hover rounded-2xl px-5 py-2 flex items-center justify-start gap-5 cursor-pointer ${
              whoCopied === el.title ? "bg-accent" : ""
            }`}
          >
            {el.icon}
            <div className="flex flex-col items-start justify-center">
              <p>
                {el.title === "number"
                  ? "+"
                  : el.title === "username"
                  ? "@"
                  : ""}
                {el.data}
              </p>
              <p className="text-[.95rem] text-icons-color">
                {t(`profile.${el.title}`)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserSettingsShortInfo;
