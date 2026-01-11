"use client";

import { ActionsPopup, LeftSideBarSearch } from "@/entities";
import { AnimatePresence } from "framer-motion";
import { Dispatch, FC, SetStateAction } from "react";


interface ILeftSideBar {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const LeftSideBar: FC<ILeftSideBar> = ({isOpen, setIsOpen}) => {
  return (
    <>
      <div
        className="flex flex-col items-center justify-start gap-5 h-screen text-white w-full"
      >
        <LeftSideBarSearch setIsOpen={setIsOpen} />
      </div>

      {/* actions modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-18 left-3 w-full max-w-65 ">
            <ActionsPopup />
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeftSideBar;
