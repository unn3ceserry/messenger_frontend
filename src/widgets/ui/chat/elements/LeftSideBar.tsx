"use client";

import { useResizingStore } from "@/features";
import { useEffect, useRef } from "react";

const MIN_WIDTH = 240;
const MAX_WIDTH = 680;

const LeftSideBar = () => {
  const width = useResizingStore((state) => state.width);
  const setResizeValue = useResizingStore((state) => state.setWidth);
  const isResizing = useRef(false);

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
        style={{
          width,
        }}
        className="flex flex-col items-start justify-center gap-5 bg-[#212121] h-screen"
      ></div>
      <div
        onMouseDown={() => (isResizing.current = true)}
        className="w-[1px] bg-[#313131] h-screen cursor-e-resize"
      ></div>
    </>
  );
};

export default LeftSideBar;
