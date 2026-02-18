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
      className={`${className ? className : ''} items-center justify-start absolute max-w-50 top-15 right-3 shadow-wrapper`}
    >
      {children}
    </motion.div>
  );
};

export default ShadowWrapper;
