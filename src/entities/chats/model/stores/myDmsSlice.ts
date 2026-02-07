import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat } from "../types/chatsTypes";
import { RootState } from "@/app";

interface IMyDmsState {
  myDms: Array<Chat>;
}

const initialState: IMyDmsState = {
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
  },
});

export const myDmsReducer = myDmsSlice.reducer;
export const { setNewDm } = myDmsSlice.actions;
export const getMyDms = (state: RootState) => state.myDms.myDms;
