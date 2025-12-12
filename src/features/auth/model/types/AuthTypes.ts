export type SignInType = {
  number: string;
  cloudPassword?: string;
  code?: string;
}

export type SignUpType = {
  number: string;
  username: string;
  firstName: string;
  lastName: string;
  code?: string;
}