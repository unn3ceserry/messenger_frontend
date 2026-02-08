import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/chatsTypes";

interface ICurrentChat {
  chat: Chat | null;
}

export const initialState: ICurrentChat = {
  chat: null,
};

export const currentChatSlice = createSlice({
  name: "currentSlice",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.chat = action.payload;
    },

    addNewMessage: (state, action: PayloadAction<Message>) => {
      if (!state.chat) return;

      if (!state.chat.messages) {
        state.chat.messages = [];
      }

      state.chat.messages.push(action.payload);
    },

    editMessage: (state, action: PayloadAction<Message>) => {
      if (!state.chat?.messages) return;

      const index = state.chat.messages.findIndex(
        m => m.id === action.payload.id
      );

      if (index !== -1) {
        state.chat.messages[index] = action.payload;
      }
    },

    deleteMessage: (state, action: PayloadAction<string>) => {
      if (!state.chat?.messages) return;

      state.chat.messages = state.chat.messages.filter(
        m => m.id !== action.payload
      );
    },

    closeCurrentChat: (state) => {
      state.chat = null;
    },
  },
});


export const currentChatReducer = currentChatSlice.reducer;
export const { closeCurrentChat, setCurrentChat, addNewMessage, editMessage, deleteMessage } =
  currentChatSlice.actions;
export const getCurrentChat = (state: RootState) => state.currentChat.chat;
