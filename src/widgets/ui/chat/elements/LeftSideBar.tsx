"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import { ActionsPopup, LeftSideBarSearch, setIsOpenActionPopup, userActionsSlice } from "@/entities";
import { useResizingStore } from "@/features";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const MIN_WIDTH = 240;
const MAX_WIDTH = 680;

const LeftSideBar = () => {
  const width = useResizingStore((state) => state.width);
  const setResizeValue = useResizingStore((state) => state.setWidth);
  const isResizing = useRef(false);
  const isOpen = useAppSelector(userActionsSlice.selectors.selectIsOpenActionPopup);
  const dispatch = useAppDispatch();
  const setIsOpen = () => dispatch(setIsOpenActionPopup({isOpenActionPopup: !isOpen}))

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;

      const newWidth = e.clientX;
      let nextWidth = newWidth;

      if (newWidth < MIN_WIDTH) nextWidth = MIN_WIDTH;
      else if (newWidth > MAX_WIDTH) nextWidth = MAX_WIDTH;

      setResizeValue(nextWidth);
    };

    const handleMouseUp = () => {
      isResizing.current = false;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        style={{ width }}
        className="flex flex-col items-center justify-start gap-5 bg-[#212121] h-screen text-white"
      >
        <LeftSideBarSearch setIsOpen={setIsOpen} />
      </div>

      <div
        onMouseDown={() => (isResizing.current = true)}
        className="w-0.5 bg-[#313131]/90 h-screen cursor-e-resize"
      ></div>

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
