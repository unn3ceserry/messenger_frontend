"use client";

import { File } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dispatch, DragEvent, FC, SetStateAction, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  setIsDrag: Dispatch<SetStateAction<boolean>>;
  setFiles: Dispatch<SetStateAction<Array<File>>>;
}

const DrogOnDrop: FC<Props> = ({ setFiles, setIsDrag }) => {
  const t = useTranslations();
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsHover(false);
    }
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDrag(false);
    Array.from(e.dataTransfer.files).map((file) => {
      setFiles((prev) => [...prev, file]);
    });
    // console.log(files);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onDragOver={(e) => handleOnDragOver(e)}
      onDragLeave={(e) => handleOnDragLeave(e)}
      onDrop={(e) => handleOnDrop(e)}
      className="absolute inset-5 max-w-200 bg-chatui-bg rounded-2xl flex items-center justify-center flex-col mx-auto p-5"
    >
      <div
        className={`w-full h-full marchingAntsNotActive cursor-pointer flex items-center justify-center flex-col gap-7 duration-200 ${isHover ? "marchingAntsAnimate marchingAntsIsActive text-accent" : "text-input-icons-color"}`}
      >
        <File size={90} />
        <h1 className="text-xl">{t("chat.dragHere")}</h1>
      </div>
    </motion.div>
  );
};

export default DrogOnDrop;
