import {
  CirclePlus,
  CircleUser,
  CloudMoonRain,
  FileUser,
  Plus,
  Settings,
} from "lucide-react";
import { configApp } from "@/app";
import {
  openComponent,
} from "../model";
import { AppDispatch } from "@/app/store/store";

export const userActionsElements = (dispatch: AppDispatch) => [
  {
    icon: <Plus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.addAccount",
    onClick: () => window.open("/add"),
  },
  {
    icon: <CircleUser size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.myProfile",
    onClick: () => dispatch(openComponent("myProfile")),
  },
  {
    icon: <Settings size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.settings",
    onClick: () => dispatch(openComponent("userSettings")),
  },
  {
    icon: <FileUser size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.contacts",
    onClick: () => dispatch(openComponent("userContacts")),
  },
  {
    icon: <CirclePlus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.installApp",
    onClick: () => window.open(configApp.APP_LINK()),
  },
];
