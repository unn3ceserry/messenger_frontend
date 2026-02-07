import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../types/chatsTypes";

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
    closeCurrentChat: (state) => {
      state.chat = null;
    },
  },
});

export const currentChatReducer = currentChatSlice.reducer;
export const { closeCurrentChat, setCurrentChat } = currentChatSlice.actions;
export const getCurrentChat = (state: RootState) => state.currentChat.chat;
