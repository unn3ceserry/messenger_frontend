"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useAppSelector } from "@/app";
import { getCurrentTheme } from "@/entities";

interface Props {
  setValue: Dispatch<SetStateAction<string>>;
}

const MyEmojiPicker = ({ setValue }: Props) => {
  const currentTheme = useAppSelector(getCurrentTheme);

  return (
    <motion.div
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-15 left-0"
    >
      <EmojiPicker
        onEmojiClick={(emojiObject) => setValue((prev) => prev + emojiObject.emoji)}
        autoFocusSearch={false}
        theme={currentTheme === "dark" ? Theme.DARK : Theme.LIGHT}
        lazyLoadEmojis={false}
        style={{scrollbarWidth: 0}}
      />
    </motion.div>
  );
};

export default MyEmojiPicker;
