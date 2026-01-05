"use client";

import { useState } from "react";
import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import { ModalConstructor } from "@/shared";
import { UserProfileModal } from "@/entities";

const ChatUI = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

  return (
    <>
      <div className="flex items-center justify-start w-full">
        <LeftSideBar />
      </div>

      {/* modals */}
      <AnimatePresence>
        {
          isOpenModal && (
            <ModalConstructor setIsOpen={setIsOpenModal} content={<UserProfileModal/>} />
          )
        }
      </AnimatePresence>
    </>
  );
};

export default ChatUI;
