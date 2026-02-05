"use client";

import { useAppSelector } from "@/app";
import {
  ActionsPopup,
  chatsApi,
  LeftSideBarSearch,
  UserType,
} from "@/entities";
import { SearchUsers, selectOpenComponent } from "@/entities/user";
import { AnimatePresence } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ChatItem from "../ChatItem/ChatItem";
import { Spinner } from "@/shared";

interface ILeftSideBar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: UserType;
}

const LeftSideBar: FC<ILeftSideBar> = ({ isOpen, setIsOpen, data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const isOpenSearchUsers = useAppSelector(selectOpenComponent);

  const { data: dataDms, isLoading } = chatsApi.useGetMyDmsQuery();

  if (isLoading || !dataDms) return <Spinner />;

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-1 h-screen text-white w-full overflow-y-auto scrollbar-thin">
        <LeftSideBarSearch
          setIsOpen={setIsOpen}
          searchText={searchText}
          setSearchText={setSearchText}
          isOpenSearchUsers={isOpenSearchUsers}
        />
        {isOpenSearchUsers && searchText && (
          <SearchUsers searchText={searchText} setSearchText={setSearchText} />
        )}
        <div className="flex flex-col w-full p-2">
          {dataDms.map((el) => {
            const user = el.members?.filter((el) => el.userId !== data.id)[0]
              .user;
            return (
              <ChatItem
                firstName={user?.firstName}
                lastName={user?.lastName}
                hasAvatar={!!user?.avatars.length}
                avatar={
                  user?.avatars ? user.avatars[user.avatars.length - 1] : ""
                }
                size={50}
                key={el.id}
                message={
                  el.messages ? el.messages[el.messages.length - 1].text : ""
                }
              />
            );
          })}
        </div>
      </div>

      {/* actions modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-18 left-3 w-full max-w-65 z-123123123">
            <ActionsPopup data={data} />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeftSideBar;
