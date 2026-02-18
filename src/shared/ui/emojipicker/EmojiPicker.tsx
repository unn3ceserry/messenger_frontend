"use client";

import { Dispatch, SetStateAction } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { motion } from "framer-motion";

interface Props {
  setValue: Dispatch<SetStateAction<string>>;
}

const MyEmojiPicker = ({ setValue }: Props) => {
  return (
    <motion.div
      exit={{ opacity: 0, y: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-15 left-0"
    >
      <EmojiPicker
        onEmojiClick={(emojiObject) =>
          setValue((prev) => prev + emojiObject.emoji)
        }
        theme={Theme.DARK}
      />
    </motion.div>
  );
};

export default MyEmojiPicker;
