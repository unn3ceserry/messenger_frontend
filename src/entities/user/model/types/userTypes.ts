import { ChatMember } from "@/entities/chats";

export type FindUserType = {
  id: string;
  userId: string;
  createdAt: Date;
  cookie?: any;
};

export type UserCompleteData = {
  email?: string;
  birthday?: string;
  cloudPassword?: string;
};

export type UserType = {
  number: string;
  username: string;
  firstName: string;
  lastName: string;
  id: string;
  email: string | null;
  avatars: string[] | [];
  bio: string | null;
  birthday: Date | null;
  blockedUsers: string[];
  phoneVisible: WhoCanSeen;
  emailVisible: WhoCanSeen;
  bioVisible: WhoCanSeen;
  avatarsVisible: WhoCanSeen;
  birthdayVisible: WhoCanSeen;
  isOnline: boolean;
  lastSeen?: number;
  cloudPassword: string | null;
  members: ChatMember
  createdAt: Date;
  updatedAt: Date;
};

export enum WhoCanSeen {
  ALL = "ALL",
  CONTACTS = "CONTACTS",
  I = "I",
}

export const WhoCanSeeLabels: Record<WhoCanSeen, string> = {
  [WhoCanSeen.ALL]: "settings.privacyAndSecurity.privacyWhoCanSee.types.all",
  [WhoCanSeen.CONTACTS]: "settings.privacyAndSecurity.privacyWhoCanSee.types.contacts",
  [WhoCanSeen.I]: "settings.privacyAndSecurity.privacyWhoCanSee.types.i",
};

export enum VisibilityField {
  Phone = "phoneVisible",
  Email = "emailVisible",
  Bio = "bioVisible",
  Birthday = "birthdayVisible",
}
