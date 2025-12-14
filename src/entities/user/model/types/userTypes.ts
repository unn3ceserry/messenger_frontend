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
