export type { Chat, ChatMember, Message } from "./types/chatsTypes";
export { useChatSocket } from "./hooks/useChatSocket";
export { useMessageSocket } from "./hooks/useMessageSocket";
// export {
//   currentChatReducer,
//   closeCurrentChat,
//   currentChatSlice,
//   getCurrentChat,
//   setCurrentChat,
//   addNewMessage,
// } from "./stores/currentChatSlice";
// export {
//   getMyDms,
//   addNewMessageInDm,
//   myDmsReducer,
//   myDmsSlice,
//   setNewDm,
//   deleteChat,
//   deleteMessageInDm,
//   editMessageInDm,
//   initialState,
// } from "./stores/myDmsSlice";
export {
  addNewMessage,
  chatsReducer,
  chatsSlice,
  closeCurrentChat,
  deleteChat,
  deleteMessage,
  editMessage,
  getCurrentChat,
  getMyDms,
  setCurrentChat,
  setNewDm,
  setUserOffline,
  setUserOnline,
} from "./stores/chtasSlice";

export { handleSortChat } from "./handlers/handleSortChat";
export { handleDeleteChat } from "./handlers/handleDeleteChat";
