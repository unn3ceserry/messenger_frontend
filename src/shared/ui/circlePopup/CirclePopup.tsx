"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { FC } from "react";

interface Props {
  isDirty: boolean;
  onClick: () => void;
}

const CirclePopup: FC<Props> = ({ isDirty, onClick }) => {
  return (
    <AnimatePresence>
      {isDirty && (
        <div className="sticky bottom-5 w-full flex justify-end">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className="p-3 bg-accent flex items-center justify-center rounded-full cursor-pointer"
          >
            <Check size={25} className="text-white" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
};
export default CirclePopup;
