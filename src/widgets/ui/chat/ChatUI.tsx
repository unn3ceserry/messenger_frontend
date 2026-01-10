"use client";

import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import { ModalConstructor } from "@/shared";
import {
  selectIsOpenEditProfile,
  selectIsOpenUserSettings,
  setIsOpenActionPopup,
  setIsOpenMyProfile,
  userActionsSlice,
  UserProfileModal,
} from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import {
  useResizingSlice,
  setWidth,
  handleMouseMove,
} from "@/features";
import UserSettings from "../settings/UserSettings";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const ChatUI = () => {
  // getters
  const isOpen = useAppSelector(
    userActionsSlice.selectors.selectIsOpenActionPopup
  );
  const isOpenMyProfile = useAppSelector(
    userActionsSlice.selectors.selectIsOpenMyProfile
  );

  const width = useAppSelector(useResizingSlice.selectors.selectWidth);

const isOpenSettings = useAppSelector(selectIsOpenUserSettings);
const isOpenEditProfile = useAppSelector(selectIsOpenEditProfile);


  // setters
  const dispatch = useAppDispatch();
  const setIsOpen = () =>
    dispatch(setIsOpenActionPopup({ isOpenActionPopup: !isOpen }));

  const setIsOpenMyProfileModal = (_: boolean) =>
    dispatch(setIsOpenMyProfile({ isOpenMyProfile: false }));

  const setResizeValue = (v: number) => dispatch(setWidth({ width: v }));

  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseUp = () => {
      isResizing.current = false;
    };
    const handleMouseMoveWrapper = (e: MouseEvent) => {
      handleMouseMove(e, isResizing, MIN_WIDTH, MAX_WIDTH, setResizeValue);
    };
    window.addEventListener("mousemove", handleMouseMoveWrapper);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className="flex items-center justify-start w-full h-screen">
        <AnimatePresence>
          {isOpenSettings && !isOpenEditProfile && (
            <UserSettings width={width} />
          )}
          {!isOpenSettings ? (
            <LeftSideBar setIsOpen={setIsOpen} width={width} isOpen={isOpen} />
          ) : null}
        </AnimatePresence>
        <div
          onMouseDown={() => (isResizing.current = true)}
          className="w-0.5 bg-[#313131]/90 self-stretch cursor-e-resize"
        ></div>
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
