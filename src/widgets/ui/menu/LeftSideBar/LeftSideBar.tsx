"use client";

import {
  FC,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app";
import { Spinner } from "@/shared";
import {
  chatsApi,
  Chat,
  UserType,
  openComponent,
  selectOpenComponent,
  ActionsPopup,
} from "@/entities";
import { SearchUsers, useChatSocket, ChatsSideBar } from "@/entities";
import LeftSideBarSearch from "./LeftSideBarSearch";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: UserType;
}

const LeftSideBar: FC<Props> = ({ isOpen, setIsOpen, data }) => {
  const { data: dataDms, isLoading } = chatsApi.useGetMyDmsQuery();

  const [myDms, setMyDms] = useState<Chat[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const isOpenSearchUsers = useAppSelector(selectOpenComponent);
  const dispatch = useAppDispatch();

  const addDm = useCallback((chat: Chat) => {
    setMyDms((prev) =>
      prev.some((c) => c.id === chat.id) ? prev : [chat, ...prev],
    );
  }, []);

  const handleCloseSearch = () => {
    setSearchText("");
    dispatch(openComponent(null));
  };

  useChatSocket(data.id, addDm);
  
  useEffect(() => {
    if (!dataDms) return;

    setMyDms((prev) => {
      const map = new Map<string, Chat>();

      [...prev, ...dataDms].forEach((chat) => {
        map.set(chat.id, chat);
      });

      return Array.from(map.values());
    });
  }, [dataDms]);

  if (isLoading || !dataDms) return <Spinner />;

  return (
    <>
      <div className="flex flex-col items-center gap-1 h-screen w-full overflow-y-auto scrollbar-thin text-white">
        <LeftSideBarSearch
          isOpenSearchUsers={isOpenSearchUsers}
          searchText={searchText}
          setIsOpen={setIsOpen}
          setSearchText={setSearchText}
        />
        {isOpenSearchUsers && searchText ? (
          <SearchUsers
            searchText={searchText}
            setMyDms={addDm}
            handleCloseSearch={handleCloseSearch}
          />
        ) : (
          <ChatsSideBar userId={data.id} myDms={myDms} />
        )}
      </div>

      {/* modal */}
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
