"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  getEditingMessage,
  removeEditingMessage,
} from "@/entities/chats/model";
import { Pencil, X } from "lucide-react";

const EditingMessage = () => {
  const editingMessage = useAppSelector(getEditingMessage);
  const disptach = useAppDispatch();

  return (
    <div className="flex w-full p-1 items-center justify-between gap-3">
      <Pencil size={21} className="text-blue-400" />
      <div className="flex flex-col items-start justify-center w-full bg-blue-400/10 rounded-sm p-0.5 px-2 border-l-[3px] border-l-blue-400">
        <p className="text-[.85rem] text-blue-400">Редактирование</p>
        <p className="text-[.75rem]">
          {!!editingMessage && editingMessage.text}
        </p>
      </div>
      <X
        onClick={() => disptach(removeEditingMessage())}
        size={24}
        className="text-blue-400 cursor-pointer hover:opacity-100 opacity-70 duration-300"
      />
    </div>
  );
};

export default EditingMessage;
