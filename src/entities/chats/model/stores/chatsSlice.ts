import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types/chatsTypes";
import { RootState } from "@/app";

interface IChatsState {
  myDms: Chat[];
  editMessage: Message | null;
  currentChat: Chat | null;
}

export const initialState: IChatsState = {
  myDms: [],
  editMessage: null,
  currentChat: null,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setNewDm: (state, action: PayloadAction<Chat | Chat[]>) => {
      const chats = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      chats.forEach((chatPayload) => {
        const newChat = {
          ...chatPayload,
          messages: chatPayload.messages?.filter((m) => !m.deletedAt),
        };

        const index = state.myDms.findIndex((chat) => chat.id === newChat.id);

        if (index !== -1) {
          state.myDms[index] = newChat;
        } else {
          state.myDms.unshift(newChat);
        }
      });
    },

    setEditMessage: (state, action: PayloadAction<Message>) => {
      state.editMessage = action.payload;
    },

    removeEditingMessage: (state) => {
      state.editMessage = null;
    },

    updateMessage: (
      state,
      action: PayloadAction<{
        message: Message;
        chatId: string;
      }>,
    ) => {
      const { chatId, message } = action.payload;
      if (!!!message.deletedAt) {
        const index = state.myDms.findIndex((chat) => chat.id === chatId);
        if (index !== -1) {
          const chat = state.myDms[index];
          if (!chat.messages) chat.messages = [];
          let msg = chat.messages.find(msg => msg.id === message.id);
          msg = message;

          state.myDms = [chat, ...state.myDms.filter((_, i) => i !== index)];
        }
      }
    },

    setCurrentChat: (state, action: PayloadAction<Chat>) => {
      state.currentChat = action.payload;
    },

    closeCurrentChat: (state) => {
      state.currentChat = null;
    },

    addNewMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      if (!!!message.deletedAt) {
        const index = state.myDms.findIndex((chat) => chat.id === chatId);
        if (index !== -1) {
          const chat = state.myDms[index];
          if (!chat.messages) chat.messages = [];
          chat.messages.push(message);

          state.myDms = [chat, ...state.myDms.filter((_, i) => i !== index)];
        }

        if (state.currentChat?.id === chatId) {
          if (!state.currentChat.messages) state.currentChat.messages = [];
          state.currentChat.messages.push(message);
        }
      }
    },

    editMessage: (state, action: PayloadAction<Message>) => {
      const chat = state.myDms.find((c) => c.id === action.payload.chatId);
      if (chat?.messages) {
        const idx = chat.messages.findIndex((m) => m.id === action.payload.id);
        if (idx !== -1) chat.messages[idx] = action.payload;
      }

      if (state.currentChat?.messages) {
        const idx = state.currentChat.messages.findIndex(
          (m) => m.id === action.payload.id,
        );
        if (idx !== -1) state.currentChat.messages[idx] = action.payload;
      }
    },

    deleteMessage: (
      state,
      action: PayloadAction<{ chatId: string; messageId: string }>,
    ) => {
      const chat = state.myDms.find((c) => c.id === action.payload.chatId);
      if (chat?.messages) {
        chat.messages = chat.messages.filter(
          (m) => m.id !== action.payload.messageId,
        );
      }

      if (state.currentChat?.messages) {
        state.currentChat.messages = state.currentChat.messages.filter(
          (m) => m.id !== action.payload.messageId,
        );
      }
    },

    deleteChat: (state, action: PayloadAction<string>) => {
      state.myDms = state.myDms.filter((chat) => chat.id !== action.payload);
      if (state.currentChat?.id === action.payload) state.currentChat = null;
    },

    setUserOnline: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.myDms.forEach((chat) =>
        chat.members?.forEach((m) => {
          if (m.userId === userId && m.user) m.user.isOnline = true;
        }),
      );
      if (state.currentChat?.members)
        state.currentChat.members.forEach((m) => {
          if (m.userId === userId && m.user) m.user.isOnline = true;
        });
    },

    setUserOffline: (state, action: PayloadAction<{ userId: string }>) => {
      console.log("setUserOffline");
      state.myDms.forEach((chat) =>
        chat.members?.forEach((m) => {
          const { userId } = action.payload;
          if (m.userId === userId && m.user) {
            m.user.isOnline = false;
            m.user.lastSeen = Date.now();
          }
        }),
      );
      if (state.currentChat?.members)
        state.currentChat.members.forEach((m) => {
          const { userId } = action.payload;
          if (m.userId === userId && m.user) {
            m.user.isOnline = false;
            m.user.lastSeen = Date.now();
          }
        });
    },
  },
});

export const chatsReducer = chatsSlice.reducer;

export const {
  setNewDm,
  setCurrentChat,
  closeCurrentChat,
  addNewMessage,
  editMessage,
  deleteMessage,
  deleteChat,
  setUserOnline,
  setUserOffline,
  removeEditingMessage,
  setEditMessage,
  updateMessage
} = chatsSlice.actions;

export const getMyDms = (state: RootState) => state.chats.myDms;
export const getCurrentChat = (state: RootState) =>
  state.chats.myDms.find((chat) => chat.id === state.chats.currentChat?.id);
export const isUserOnline = (userId: string, state: RootState) =>
  state.chats.myDms
    .find((chat) => chat.id === state.chats.currentChat?.id)
    ?.members?.find((el) => el.userId === userId)?.user?.isOnline;
export const getEditingMessage = (state: RootState) => state.chats.editMessage; 
