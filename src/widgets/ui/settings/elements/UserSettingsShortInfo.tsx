"use client";

import { AtSign, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC, MouseEvent, useRef } from "react";

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

  const handleCopy = async (result: string) => {
    try {
      await navigator.clipboard.writeText(result.toString());
    } catch (err) {
      console.error("Clipboard error:", err);
    }
  };

  const createRipple = (e: MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.className =
      "absolute bg-white/30 rounded-full pointer-events-none ripple";

    button.appendChild(circle);

    circle.addEventListener("animationend", () => {
      circle.remove();
    });
  };

  const elements = [
    { title: "number", icon: <Phone className="text-[#818181]" />, data: number },
    { title: "username", icon: <AtSign className="text-[#818181]" />, data: username },
    { title: "email", icon: <Mail className="text-[#818181]" />, data: email },
  ];

  return (
    <div className="flex flex-col p-1 w-full">
      {elements
        .filter((el) => el.data)
        .map((el, i) => (
          <div
            key={i}
            onClick={(e) => {
              handleCopy(el.data ?? "");
              createRipple(e);
            }}
            className="relative overflow-hidden hover:bg-white/5 rounded-2xl px-5 py-2 flex items-center justify-start gap-5 cursor-pointer"
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
