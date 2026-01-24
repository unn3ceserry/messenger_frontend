"use client";

import {motion} from 'framer-motion'
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  avatars?: string[];
  currentImage: number,
  setCurrentImage: Dispatch<SetStateAction<number>>
}

const SwapUsersAvatarsLines: FC<Props> = ({currentImage, setCurrentImage, avatars}) => {
  return (
    <motion.div
      className="flex w-full items-center justify-center gap-1 absolute p-2 top-0 z-1233"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {avatars &&
        avatars.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`w-full h-0.5 ${currentImage === i ? "bg-white" : "bg-white/30"} duration-300 rounded-full cursor-pointer hover:opacity-70`}
          ></div>
        ))}
    </motion.div>
  );
};

export default SwapUsersAvatarsLines;
