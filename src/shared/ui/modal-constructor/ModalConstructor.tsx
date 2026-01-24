"use client";

import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { motion } from "framer-motion";
import { modalContainerDefault } from "@/shared";

interface IModalConstructor {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  content?: ReactNode;
}

const ModalConstructor: FC<IModalConstructor> = ({ setIsOpen, content }) => {
  return (
    <>
      <motion.div
        variants={modalContainerDefault}
        initial="initial"
        animate="animate"
        exit="initial"
        layout
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black/40 z-[1931283123] flex items-center justify-center p-10"
      ></motion.div>
      <div
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 flex flex-col items-center justify-center space-y-4 rounded-xl z-12312312123"
      >
        {content}
      </div>
    </>
  );
};

export default ModalConstructor;
