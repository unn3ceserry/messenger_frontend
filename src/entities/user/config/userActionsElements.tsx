import { CirclePlus, CircleUser, CloudMoonRain, Plus, Settings } from "lucide-react";
import { userActionsPopupStore } from "../model";
import { configApp } from "@/app";

export const userActionsElements = [
  {
    icon: <Plus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.addAccount",
    onClick: () => window.open('/add'),
  },
  {
    icon: <CircleUser size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.myProfile",
    onClick: () => userActionsPopupStore.getState().setIsOpenMyProfile(true),
  },
  {
    icon: <Settings size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.settings",
    onClick: () => userActionsPopupStore.getState().setIsOpenUserSettings(true),
  },
  {
    icon: <CloudMoonRain size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.nightMode",
    onClick: () => {
      const { isNightMode, setIsNightMode } = userActionsPopupStore.getState();
      setIsNightMode(!isNightMode);
    },
  },
  {
    icon: <CirclePlus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.installApp",
    onClick: () => window.open(configApp.APP_LINK())
  },
];
