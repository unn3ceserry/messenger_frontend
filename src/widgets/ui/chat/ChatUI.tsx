"use client";

import { AnimatePresence } from "framer-motion";
import { ChatMessages, getCurrentChat, userApi } from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";
import ChatUICompoonent from "./ChatUICompoonent";
import ChatUIUserProfileComponent from "./ChatUIUserProfileComponent";
import { Spinner, getSocket } from "@/shared";
import { Socket } from "socket.io-client";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const ChatUI = () => {
  const { data, isLoading } = userApi.useGetMeQuery();

  // getters
  const width = useAppSelector(useResizingSlice.selectors.selectWidth);
  const currentChat = useAppSelector(getCurrentChat);

  // setters
  const dispatch = useAppDispatch();

  const setResizeValue = (v: number) => dispatch(setWidth({ width: v }));
  const isResizing = useRef(false);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!data?.id) return;
    socketRef.current = getSocket(data.id);
  }, [data?.id]);

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

  if (isLoading || !data) {
    return <Spinner />;
  }

  return (
    <div className="flex w-full items-center justify-start h-screen relative">
      <div
        style={{ width }}
        className="flex items-center justify-center w-full h-screen bg-chatui-bg relative shrink-0"
      >
        <AnimatePresence>
          <ChatUICompoonent data={data} />
        </AnimatePresence>
        <ChatUIUserProfileComponent />

        <div
          onMouseDown={() => (isResizing.current = true)}
          className="w-0.5 bg-line-color self-stretch cursor-e-resize"
        ></div>
      </div>
      {!!currentChat && <ChatMessages userId={data.id} />}
    </div>
  );
};

export default ChatUI;
