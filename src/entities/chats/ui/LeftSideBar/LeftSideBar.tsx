"use client";

import { useAppSelector } from "@/app";
import { ActionsPopup, LeftSideBarSearch, UserType } from "@/entities";
import { SearchUsers, selectOpenComponent } from "@/entities/user";
import { AnimatePresence } from "framer-motion";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface ILeftSideBar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  data: UserType;
}

const LeftSideBar: FC<ILeftSideBar> = ({ isOpen, setIsOpen, data }) => {
  const [searchText, setSearchText] = useState<string>("");
  const isOpenSearchUsers = useAppSelector(selectOpenComponent);

  return (
    <>
      <div className="flex flex-col items-center justify-start gap-1 h-screen text-white w-full">
        <LeftSideBarSearch
          setIsOpen={setIsOpen}
          searchText={searchText}
          setSearchText={setSearchText}
          isOpenSearchUsers={isOpenSearchUsers}
        />
        {isOpenSearchUsers && searchText && (
          <SearchUsers searchText={searchText} setSearchText={setSearchText} />
        )}
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
