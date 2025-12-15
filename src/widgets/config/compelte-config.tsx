import { Calendar1, KeyRound, Mail } from "lucide-react";
import { ReactNode } from "react";

export const COMPLETE_CONFIG: Array<{
  title: string;
  desc: string;
  icon: ReactNode;
  tag: "email" | "password" | "birthday";
}> = [
  {
    title: "profileComplete.emailTitle",
    desc: "profileComplete.emailDesc",
    icon: <Mail size={22} color="white" />,
    tag: "email",
  },
  {
    title: "profileComplete.birthdayTitle",
    desc: "profileComplete.birthdayDesc",
    icon: <Calendar1 size={22} color="white" />,
    tag: "birthday",
  },
  {
    title: "profileComplete.passwordTitle",
    desc: "profileComplete.passwordDesc",
    icon: <KeyRound size={22} color="white" />,
    tag: "password",
  },
];
