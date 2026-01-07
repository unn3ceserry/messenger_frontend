"use client";

import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import { ModalConstructor } from "@/shared";
import {
  setIsOpenActionPopup,
  setIsOpenMyProfile,
  userActionsSlice,
  UserProfileModal,
} from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";

const MIN_WIDTH = 240;
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
      <div className="flex items-center justify-start w-full">
        <LeftSideBar setIsOpen={setIsOpen} width={width} isOpen={isOpen} />
        <div
          onMouseDown={() => (isResizing.current = true)}
          className="w-0.5 bg-[#313131]/90 h-screen cursor-e-resize"
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
