"use client";

import { AnimatePresence } from "framer-motion";
import {
  EditContact,
  getOtherProfileStatus,
  OtherUsersProfile,
  userApi,
} from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";
import { motion } from "framer-motion";
import ChatUICompoonent from "./ChatUICompoonent";
import ChatUIUserProfileComponent from "./ChatUIUserProfileComponent";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const ChatUI = () => {
  const { data, isLoading } = userApi.useGetMeQuery();

  // getters
  const isOpenOtherOsersProfile = useAppSelector(getOtherProfileStatus);
  const width = useAppSelector(useResizingSlice.selectors.selectWidth);

  // setters
  const dispatch = useAppDispatch();

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

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <div className="flex w-full items-center justify-between h-screen relative">
      <div
        style={{ width }}
        className="flex items-center justify-center w-full h-screen bg-chatui-bg relative"
      >
        <AnimatePresence>
          <ChatUICompoonent data={data} />
        </AnimatePresence>
        <div
          onMouseDown={() => (isResizing.current = true)}
          className="w-0.5 bg-line-color self-stretch cursor-e-resize"
        ></div>
      </div>
      <ChatUIUserProfileComponent/>
    </div>
  );
};

export default ChatUI;
