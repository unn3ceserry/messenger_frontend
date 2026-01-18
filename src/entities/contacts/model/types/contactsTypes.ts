export type ContactType = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  usernameContact: string;
  firstNameContact: string;
  lastNameContact: string;
  avatarsContact: string | null;
};

export type ContactsType = ContactType[];

export type CreatedContactType = {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  usernameContact: string;
  firstNameContact: string;
  lastNameContact: string;
  avatarsContact: string | null;
};
