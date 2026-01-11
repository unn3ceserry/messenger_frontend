export type SignInType = {
  number: string;
  cloudPassword?: string;
  code?: string;
}
export type SignUpType = {
  number: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  code?: string;
}


export type Session = {
  id: string;
  userId: string;
  createdAt: string;
  cookie: SessionCookie;
  metadata: SessionMetadata;
};

export type SessionCookie = {
  originalMaxAge: number;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  domain: string;
  path: string;
  sameSite: "lax" | "strict" | "none";
};

export type SessionMetadata = {
  ip: string;
  location: SessionLocation;
  device: SessionDevice;
};

export type SessionLocation = {
  country: string;
  city: string;
  latitude: number;
  longitude: number;
};

export type SessionDevice = {
  browser: string;
  os: string;
  type: "desktop" | "mobile" | "tablet";
};