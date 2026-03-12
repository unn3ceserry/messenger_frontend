import { Smile } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app";
import { getMyData } from "@/entities/user";
import { MyEmojiPicker, Spinner, useSocketConnection } from "@/shared";
import {
  getCurrentChat,
  handleSendMessage,
  handleUploadFile,
  setFilesModalOpen,
} from "@/entities/chats/model";
import { useTranslations } from "next-intl";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  files: Array<File>;
}

const FilesReference: FC<Props> = ({ setValue, value, files }) => {
  const t = useTranslations();

  const dispatch = useAppDispatch();

  const userId = useAppSelector(getMyData);
  const socket = useSocketConnection(userId);
  const currentChat = useAppSelector(getCurrentChat);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!currentChat) return <Spinner />;

  const handleUploadFiles = async (files: Array<File>) => {
    return Promise.all(files.map((file) => handleUploadFile(file)));
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsOpen(false);
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const urls = await handleUploadFiles(files);
      handleSendMessage(
        socket,
        value.trim(),
        setValue,
        currentChat.id ?? "",
        urls,
      );
      dispatch(setFilesModalOpen(false));
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <Smile
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-input-icons-color cursor-pointer hover:text-accent duration-300"
      />

      <div className="w-full relative">
        <AnimatePresence>
          {!value && (
            <motion.label
              htmlFor="inputForMessage"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 30, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-0 origin-left pointer-events-none text-app-inputs-placeholder"
            >
              {t("chat.messagePlaceholder")}
            </motion.label>
          )}
        </AnimatePresence>

        <input
          id="inputForMessage"
          type="text"
          maxLength={1000}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="outline-0 w-full bg-transparent"
        />
      </div>

      <AnimatePresence>
        {isOpen && <MyEmojiPicker setValue={setValue} />}
      </AnimatePresence>
    </div>
  );
};

export default FilesReference;
