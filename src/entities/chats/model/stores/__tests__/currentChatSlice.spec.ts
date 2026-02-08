import { describe, expect, it } from "vitest";
import {
  closeCurrentChat,
  currentChatReducer,
  initialState,
  setCurrentChat,
} from "../currentChatSlice";
import { Chat } from "../../types/chatsTypes";
import { UserType } from "@/entities";

const date = new Date("2024-01-01");

const chatMock: Chat = {
  id: "chat-1",
  chatName: "Test Chat",
  isGroup: true,
  createdAt: date,
  updatedAt: date,

  members: [
    {
      id: "member-1",
      chatId: "chat-1",
      userId: "user-1",
      joinedAt: date,
      createdAt: date,
      updatedAt: date,

      user: {
        id: "user-1",
        username: "John",
      } as UserType,
    },
  ],

  messages: [
    {
      id: "msg-1",
      text: "Hello 👋",
      chatId: "chat-1",
      senderId: "user-1",
      createdAt: date,
      updatedAt: date,

      sender: {
        id: "user-1",
        username: "John",
      } as UserType,
    },
  ],
};

describe("currentChatSlice", () => {
  it("should return initialState", () => {
    expect(currentChatReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
    expect(currentChatReducer(undefined, { type: "unknown" })).not.toBeNull();
    expect(
      currentChatReducer(undefined, { type: "unknown" }),
    ).not.toBeUndefined();
  });
  it("should set chatMock", () => {
    const action = setCurrentChat(chatMock);
    const nextState = currentChatReducer(undefined, action);

    expect(nextState.chat).toEqual(chatMock);
    expect(nextState.chat).not.toBeNullable();
  });
  it("should return null", () => {
    const action = closeCurrentChat();
    const nextState = currentChatReducer(undefined, action);

    expect(nextState.chat).toBeNull();
    expect(nextState.chat).not.toBeUndefined();
  });
});
