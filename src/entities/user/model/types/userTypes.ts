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
  cloudPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export enum WhoCanSeen {
  ALL,
  CONTACTS,
  I
}

export enum VisibilityField {
  Phone = 'phoneVisible',
  Email = 'emailVisible',
  Bio = 'bioVisible',
  Avatars = 'avatarsVisible',
  Birthday = 'birthdayVisible',
}

