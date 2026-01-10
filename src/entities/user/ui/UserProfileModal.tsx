"use client";

import { userApi } from "../api";
import { openComponent, UserType } from "../model";
import { ReactNode } from "react";
import { Calendar1, Mail, Phone, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { RenderAvatarElement } from "@/shared";

type TypeShortInfo = {
  icon: ReactNode;
  title: string;
  tag: keyof UserType;
};

const shortInfo: Array<TypeShortInfo> = [
  { icon: <Phone size={20} />, title: "profile.number", tag: "number" },
  { icon: <Mail size={20} />, title: "profile.email", tag: "email" },
  { icon: <Calendar1 size={20} />, title: "profile.birthday", tag: "birthday" },
];

const UserProfileModal = () => {
  const { data, isLoading } = userApi.useGetMeQuery();
  const t = useTranslations();

  const dispatch = useDispatch();
  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center p-1 backdrop-blur-2xl w-full gap-1 text-white">
      {/* avatar & names */}
      <div className="flex items-center w-full gap-2.5 cursor-pointer bg-black/30 p-3 rounded-t-[10px] rounded-b-[5px]">
        <RenderAvatarElement hasAvatar={!!data.avatars} size={60} avatar={data.avatars[data.avatars.length -1]} />
        <div className="flex flex-col items-start justify-center">
          <p className="">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-white/50">@{data.username}</p>
        </div>
      </div>

      {/* phone & email */}
      <div className="flex flex-col items-start justify-center w-full gap-1 bg-black/30 p-3 rounded-[5px] text-[.95rem]">
        {shortInfo.map((el, i) => (
          <div className="flex items-center justify-center gap-3" key={i}>
            <div className="bg-rect-boder/40 p-3 rounded-lg">{el.icon}</div>
            <div className="flex flex-col items-start justify-center">
              <p className="text-white/50">{t(el.title)}:</p>
              <p>
                {el.tag === "number"
                  ? `+${String(data[el.tag])}`
                  : el.tag === "birthday"
                  ? data[el.tag]
                    ? new Date(
                        data[el.tag] as string | Date
                      ).toLocaleDateString()
                    : t("profile.notSpecifid")
                  : String(data[el.tag])}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* bio */}
      <div className="flex flex-col items-start justify-center w-full gap-1">
        <h1 className="ml-2 text-[1.2rem]">{t("profile.bio")}:</h1>
        <div className="flex flex-col items-start justify-center w-full gap-1 bg-black/30 p-3 rounded-[5px] text-[.95rem]">
          <p className="text-white/70 break-all text-[.85rem]">
            {data.bio ? data.bio : t("profile.noBioYet")}
          </p>
        </div>
      </div>

      {/* settings */}
      <div
        onClick={() =>
          dispatch(openComponent('userSettings'))
        }
        className="flex items-center justify-start w-full gap-3 bg-black/30 p-3 rounded-t-[5px] rounded-b-[10px] text-[.95rem] hover:bg-accent/10 duration-300 cursor-pointer"
      >
        <Settings />
        <p>{t("chat.actionsPopup.settings")}</p>
      </div>
    </div>
  );
};

export default UserProfileModal;
