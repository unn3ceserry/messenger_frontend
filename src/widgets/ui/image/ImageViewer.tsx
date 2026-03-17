"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import { getChatImages, setIsImagesPreview } from "@/entities";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const variants = {
  initial: (dir: number) => ({
    x: dir * 1300,
  }),
  animate: {
    x: 0,
  },
  exit: (dir: number) => ({
    x: dir * -1300,
  }),
};

const ImageViewer = () => {
  const dispatch = useAppDispatch();
  const chatImages = useAppSelector(getChatImages);

  const [currentIdx, setCurrentIdx] = useState<number>(chatImages.startIndex);
  const [direction, setDirection] = useState<number>(0);

  const handleNextImage = () => {
    setDirection(1);

    if (currentIdx === chatImages.images.length - 1) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePreviousImage = () => {
    setDirection(-1);

    if (currentIdx === 0) {
      setCurrentIdx(chatImages.images.length - 1);
    } else {
      setCurrentIdx((prev) => prev - 1);
    }
    console.log(currentIdx);
  };

  return (
    <motion.div
      key="avatar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => {
        dispatch(setIsImagesPreview(false));
      }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-10001000 w-full"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          handlePreviousImage();
        }}
        className=" h-screen cursor-pointer absolute left-0 px-5 opacity-0 hover:opacity-100 duration-100 flex items-center justify-center"
      >
        <ChevronLeft size={50} />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.img
            key={currentIdx}
            custom={direction}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
            src={chatImages.images[currentIdx]}
            className="w-full max-w-[700px] aspect-square object-cover"
          />
        </AnimatePresence>
      </motion.div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          handleNextImage();
        }}
        className=" h-screen cursor-pointer absolute right-0 px-5 opacity-0 hover:opacity-100 duration-100 flex items-center justify-center"
      >
        <ChevronRight size={50} />
      </div>
    </motion.div>
  );
};

export default ImageViewer;
