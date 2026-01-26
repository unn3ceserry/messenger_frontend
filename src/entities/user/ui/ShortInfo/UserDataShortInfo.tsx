"use client";

import { createRipple } from "@/shared";
import { AtSign, Info, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

interface Props {
  number?: string;
  username?: string;
  bio?: string | null;
  email?: string | null;
}

const UserDataShortInfo: FC<Props> = ({
  number,
  username,
  email,
  bio
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

  const elements = [
    {
      title: "number",
      icon: <Phone className="text-icons-color shrink-0" />,
      data: number,
    },
    {
      title: "username",
      icon: <AtSign className="text-icons-color shrink-0" />,
      data: username,
    },
    { title: "bio", icon: <Info className="text-icons-color shrink-0" />, data: bio },
    { title: "email", icon: <Mail className="text-icons-color shrink-0" />, data: email },
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
            className={`relative overflow-hidden hover:bg-checkbox-hover rounded-2xl px-5 py-2 flex items-center justify-start gap-5 cursor-pointer`}
          >
            {el.icon}
            <div className="flex flex-col items-start justify-center text-[.98rem]">
              <p className="break-all">
                {el.title === "number"
                  ? "+"
                  : el.title === "username"
                  ? "@"
                  : ""}
                {el.data}
              </p>
              <p className="text-[.9rem] text-icons-color">
                {t(`profile.${el.title}`)}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default UserDataShortInfo;
