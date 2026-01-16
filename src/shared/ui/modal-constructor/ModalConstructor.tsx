"use client";

import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import { modalContainerDefault, modalDefault } from "@/shared";

interface IModalConstructor {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  content?: ReactNode;
}

const ModalConstructor: FC<IModalConstructor> = ({ setIsOpen, content }) => {
  return (
    <motion.div
      variants={modalContainerDefault}
      initial="initial"
      animate="animate"
      exit="initial"
      layout
      transition={{ duration: 0.5 }}
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 bg-black/40 z-[1931283123] flex items-center justify-center p-10 backdrop-blur-xs"
    >
      <motion.div
        variants={modalDefault}
        initial="initial"
        animate="animate"
        exit="initial"
        onClick={(e) => e.stopPropagation()}
        className="flex relative flex-col items-center justify-center max-w-150 w-full space-y-4 p-1 rounded-xl"
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

export default ModalConstructor;
