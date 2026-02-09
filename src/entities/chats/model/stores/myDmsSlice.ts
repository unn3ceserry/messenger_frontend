import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/chatsTypes";
import { RootState } from "@/app";

interface IMyDmsState {
  myDms: Array<Chat>;
}

export const initialState: IMyDmsState = {
  myDms: [],
};

export const myDmsSlice = createSlice({
  name: "myDms",
  initialState,
  reducers: {
    setNewDm: (state, action: PayloadAction<Chat | Array<Chat>>) => {
      const chats = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      chats.forEach((newChat) => {
        const index = state.myDms.findIndex((chat) => chat.id === newChat.id);

        if (index !== -1) {
          state.myDms[index] = newChat;
        } else {
          state.myDms.unshift(newChat);
        }
      });
    },
    addNewMessageInDm: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const index = state.myDms.findIndex(
        (chat) => chat.id === action.payload.chatId,
      );
      if (index === -1) return;

      const chat = state.myDms[index];

      if (!chat.messages) chat.messages = [];
      chat.messages.push(action.payload.message);

      state.myDms = [chat, ...state.myDms.filter((_, i) => i !== index)];
    },

    editMessageInDm: (state, action: PayloadAction<Message>) => {
      const chat = state.myDms.find((el) => el.id === action.payload.chatId);
      if (!chat?.messages) return;

      const index = chat.messages.findIndex((m) => m.id === action.payload.id);

      if (index !== -1) {
        chat.messages[index] = action.payload;
      }
    },
    deleteMessageInDm: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>,
    ) => {
      const chat = state.myDms.find((el) => el.id === action.payload.chatId);
      if (!chat?.messages) return;

      chat.messages = chat.messages.filter(
        (m) => m.id !== action.payload.messageId,
      );
    },
  },
});

export const myDmsReducer = myDmsSlice.reducer;
export const {
  setNewDm,
  addNewMessageInDm,
  editMessageInDm,
  deleteMessageInDm,
} = myDmsSlice.actions;
export const getMyDms = (state: RootState) => state.myDms.myDms;
