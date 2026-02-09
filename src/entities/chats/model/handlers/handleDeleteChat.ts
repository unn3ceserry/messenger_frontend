import { makeStore } from "@/app";
import { chatsApi } from "../../api";
import { appNotification, isErrorWithMessage, isErrorWithMessageAndType } from "@/shared";

export const handleDeleteChat = async (chatId: string) => {
  try {
    await makeStore
      .dispatch(chatsApi.endpoints.deleteChat.initiate(chatId))
      .unwrap();
  } catch (error) {
    if (isErrorWithMessageAndType(error)) {
      appNotification({text: error.data.message});
    } else if (isErrorWithMessage(error)) {
      const msg = Array.isArray((error as any).data?.message ?? error.message)
        ? ((error as any).data?.message ?? error.message)[0]
        : ((error as any).data?.message ?? error.message);
      appNotification(msg);
    }
  }
};
