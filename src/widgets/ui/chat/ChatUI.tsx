"use client";

import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import { ModalConstructor } from "@/shared";
import {
  setIsOpenMyProfile,
  userActionsSlice,
  UserProfileModal,
} from "@/entities";
import { useAppDispatch, useAppSelector } from "@/app";
import UserSettings from "../settings/UserSettings";

const ChatUI = () => {
  const isOpenMyProfile = useAppSelector(
    userActionsSlice.selectors.selectIsOpenMyProfile
  );
  
  const dispatch = useAppDispatch();
  const setIsOpenMyProfileModal = (_: boolean) => dispatch(setIsOpenMyProfile({isOpenMyProfile: false}));

  return (
    <>
      <div className="flex items-center justify-start w-full">
        {/* <UserSettings/> */}
        <LeftSideBar />
      </div>

      {/* modals */}
      <AnimatePresence>
        {isOpenMyProfile && (
          <ModalConstructor
            setIsOpen={setIsOpenMyProfileModal}
            content={<UserProfileModal />}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatUI;
