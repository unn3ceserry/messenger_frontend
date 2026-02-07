import { describe, expect, it } from "vitest";
import { initialState, myDmsReducer, setNewDm } from "../myDmsSlice";
import { UserType } from "@/entities";
import { Chat } from "../../types/chatsTypes";

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

describe("myDmsSlice", () => {
  it("should return initialState", () => {
    expect(myDmsReducer(undefined, { type: "unknown" })).toEqual(initialState);
    expect(myDmsReducer(undefined, { type: "unknown" })).not.toBeNull();
    expect(myDmsReducer(undefined, { type: "unknown" })).not.toBeUndefined();
  });

  it("should return chatMock", () => {
    const action = setNewDm(chatMock);
    const nextState = myDmsReducer(undefined, action);

    expect(nextState.myDms[0]).toEqual(chatMock);
    expect(nextState.myDms).not.toBeNullable();
  });
});
