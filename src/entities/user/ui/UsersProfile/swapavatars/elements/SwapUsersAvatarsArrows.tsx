"use client";

import { Dispatch, FC, SetStateAction } from "react";
import {motion} from 'framer-motion'
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  avatars?: string[];
  currentImage: number,
  setCurrentImage: Dispatch<SetStateAction<number>>

}

const SwapUsersAvatarsArrows: FC<Props> = ({avatars, currentImage, setCurrentImage}) => {
  const handleLeft = () => {
    setCurrentImage(
      currentImage === 0
        ? avatars
          ? avatars.length - 1
          : 0
        : currentImage - 1,
    );
  };

  const handleRight = () => {
    setCurrentImage(
      currentImage === avatars!.length - 1 ? 0 : currentImage + 1,
    );
  };

  return (
    <>
      <motion.div
        className="absolute flex justify-center items-center left-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ChevronLeft
          onClick={handleLeft}
          size={55}
          className="opacity-15 hover:opacity-100 duration-500 cursor-pointer"
        />
      </motion.div>
      <motion.div
        className="absolute flex justify-center items-center right-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ChevronRight
          size={55}
          onClick={handleRight}
          className="opacity-15 hover:opacity-100 duration-500 cursor-pointer"
        />
      </motion.div>
    </>
  );
};

export default SwapUsersAvatarsArrows;
