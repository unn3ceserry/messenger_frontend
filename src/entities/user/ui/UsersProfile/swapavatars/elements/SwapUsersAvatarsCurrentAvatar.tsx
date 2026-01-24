'use client'

import {motion} from 'framer-motion'
import Image from 'next/image';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  size: number,
  isFull: boolean,
  currentImage: number,
  setIsFull: Dispatch<SetStateAction<boolean>>
  avatars?: string[]
}

const SwapUsersAvatarsCurrentAvatar: FC<Props> = ({size, avatars, currentImage, isFull, setIsFull}) => {
  return (
    <motion.div
      onClick={() => setIsFull((prev) => !prev)}
      className="flex items-center justify-center w-full cursor-pointer overflow-hidden mx-auto"
      initial={false}
      animate={{
        borderRadius: isFull ? "0" : "100%",
        width: isFull ? "100%" : size,
        height: isFull ? "100%" : size,
      }}
      layout
      transition={{ duration: 0.2 }}
    >
      <Image
        src={avatars ? avatars[currentImage] : ""}
        alt="avatar"
        width={size}
        height={size}
        className="aspect-square object-cover w-full h-full"
      />
    </motion.div>
  );
};

export default SwapUsersAvatarsCurrentAvatar;
