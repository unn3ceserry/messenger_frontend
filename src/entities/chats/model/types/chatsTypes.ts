import { UserType } from "@/entities";

export type Message = {
  id: string;
  text: string;
  chatId: string;
  senderId: string;
  isRead: boolean;
  isBlocked: boolean;
  editedAt?: Date | null;
  deletedAt?: Date | null;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;

  chat?: Chat;
  sender?: UserType;
};

export type ChatMember = {
  id: string;
  chatId: string;
  userId: string;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  chat: Chat;
  user: UserType;
};

export type Chat = {
  id: string;
  chatName?: string | null;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;

  members: ChatMember[];
  messages: Message[];
};

export type Attachment = {
  id: string;
  messageId: string;
  uuidURI: string;
  fileName: string;
  fileSize: number;
  fileExt: string;
  createdAt: Date;
  updatedAt: Date;

  chat?: Chat;
  sender?: UserType;
};
