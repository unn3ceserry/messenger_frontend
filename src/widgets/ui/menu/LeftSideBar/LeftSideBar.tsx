"use client";

import {
  FC,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
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
  getMyDms,
  setNewDm,
  handleSortChat,
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

  const myDms = useAppSelector(getMyDms);
  const isOpenSearchUsers = useAppSelector(selectOpenComponent);

  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState<string>("");

  const handleCloseSearch = () => {
    setSearchText("");
    dispatch(openComponent(null));
  };

  useChatSocket(data.id);

  const sortedDms = useMemo(() => handleSortChat(dataDms), [dataDms]);

  useEffect(() => {
    if (!dataDms) return;

    dispatch(setNewDm(sortedDms));
  }, [dataDms, sortedDms]);

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
            userId={data.id}
            searchText={searchText}
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
