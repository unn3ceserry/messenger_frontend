import { RefObject } from "react";

type SetResizeValueFn = (v: number) => void;

export const handleMouseMove = (
  e: MouseEvent,
  isResizing: RefObject<boolean>,
  MIN_WIDTH: number,
  MAX_WIDTH: number,
  setResizeValue: SetResizeValueFn
) => {
  if (!isResizing.current) return;

  const newWidth = e.clientX;
  let nextWidth = newWidth;

  if (newWidth < MIN_WIDTH) nextWidth = MIN_WIDTH;
  else if (newWidth > MAX_WIDTH) nextWidth = MAX_WIDTH;

  setResizeValue(nextWidth);
};
