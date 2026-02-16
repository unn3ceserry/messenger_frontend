import { Paperclip, Smile } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/app";
import { getMyData } from "@/entities/user";
import { Spinner, useSocketConnection } from "@/shared";
import { getCurrentChat, handleSendMessage } from "@/entities/chats/model";
import { useTranslations } from "next-intl";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const InputReference: FC<Props> = ({ setValue, value }) => {
  const t = useTranslations();

  const userId = useAppSelector(getMyData);
  const socket = useSocketConnection(userId);

  const currentChat = useAppSelector(getCurrentChat);
  if (!currentChat) return <Spinner />;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(socket, value.trim(), setValue, currentChat.id ?? "");
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-3">
      <Smile className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />

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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="outline-0 w-full bg-transparent"
        />
      </div>

      <Paperclip className="text-input-icons-color cursor-pointer hover:text-accent duration-300" />
    </div>
  );
};

export default InputReference;
