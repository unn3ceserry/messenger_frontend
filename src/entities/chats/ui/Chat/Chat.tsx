"use client";

import { useAppSelector } from "@/app";
import { getCurrentChat } from "@/entities/chats/model";
import { setOpenComponentOtherUsersProfile, userApi } from "@/entities/user";
import { RenderAvatarElement, Spinner } from "@/shared";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { useDispatch } from "react-redux";
import ChatInput from "./ChatInput/ChatInput";
import ChatMessages from "./ChatMessages/ChatMessages";

interface Props {
  userId: string;
}

const Chat: FC<Props> = ({ userId }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const currentChat = useAppSelector(getCurrentChat);

  const user = currentChat?.members?.find((m) => m.userId !== userId)?.user;
  const {data, isLoading} = userApi.useGetUserDataQuery({id: user?.id ?? ''})
  const avatar = data?.avatars ? data?.avatars[data?.avatars.length - 1] : '';

  if(!currentChat || isLoading) return <Spinner/>

  return (
    <div className="flex flex-col items-center justify-between h-screen w-full text-default-text-color gap-5">
      <div
        onClick={() =>
          dispatch(
            setOpenComponentOtherUsersProfile({
              openComponent: "userProfile",
              username: data?.username ?? "",
            }),
          )
        }
        className="flex w-full items-center justify-start bg-chatui-bg p-2 px-5 gap-3 cursor-pointer"
      >
        <RenderAvatarElement
          hasAvatar={!!data?.avatars?.length}
          size={40}
          avatar={avatar}
        />
        <div className="flex flex-col items-start justify-center w-full">
          <h2 className="">
            {data?.firstName} {data?.lastName}
          </h2>
          <p className="text-icons-color text-[.85rem]">
            {t("settings.online")}
          </p>
        </div>
      </div>

      <ChatMessages userId={data?.id ?? ''} />

      {/* input */}
      <div className="flex w-full items-center justify-center px-5 max-w-175">
        <ChatInput userId={data?.id ?? ''} />
      </div>
    </div>
  );
};

export default Chat;
