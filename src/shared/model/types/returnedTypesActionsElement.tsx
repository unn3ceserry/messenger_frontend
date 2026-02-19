import { ReactNode } from "react";

export type ReturnedTypesActionsElement = {
  icon: ReactNode;
  title: string;
  isMain?: boolean;
  isRed?: boolean;
  isLast?: boolean;
  isFirst?: boolean;
  isFull?: boolean;
  onClick: (v?: string | boolean | number | object) => void;
};
