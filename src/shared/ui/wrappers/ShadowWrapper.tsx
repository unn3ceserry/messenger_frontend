"use client";

import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  position?: { x: number; y: number };
  className?: string;
}

const ShadowWrapper: FC<Props> = ({ children, position, className }) => {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={!!position ? { top: position.y, left: position.x } : {}}
      onContextMenu={(e) => e.preventDefault()}
      className={`${className ? className : ''} flex flex-col items-center justify-start absolute p-0.5 backdrop-blur-lg bg-checkbox-hover rounded-xl max-w-50 text-default-text-color w-full shadow-[0_0px_20px_-8px_rgba(0,0,0,0.8)] top-15 right-3 cursor-pointer z-123123`}
    >
      {children}
    </motion.div>
  );
};

export default ShadowWrapper;
