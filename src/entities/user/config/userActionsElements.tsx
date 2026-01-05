import {
  CirclePlus,
  CircleUser,
  CloudMoonRain,
  Plus,
  Settings,
} from "lucide-react";
import {
  setIsNightMode,
  setIsOpenMyProfile,
  setIsOpenUserSettings,
} from "../model";
import { configApp, makeStore } from "@/app";

export const userActionsElements = [
  {
    icon: <Plus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.addAccount",
    onClick: () => window.open("/add"),
  },
  {
    icon: <CircleUser size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.myProfile",
    onClick: () =>
      makeStore.dispatch(
        setIsOpenMyProfile({
          isOpenMyProfile: true,
        })
      ),
  },
  {
    icon: <Settings size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.settings",
    onClick: () =>
      makeStore.dispatch(
        setIsOpenUserSettings({
          isOpenUserSettings: true,
        })
      ),
  },
  {
    icon: <CloudMoonRain size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.nightMode",
    onClick: () =>
      makeStore.dispatch(
        setIsNightMode({
          isNightMode: true,
        })
      ),
  },
  {
    icon: <CirclePlus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.installApp",
    onClick: () => window.open(configApp.APP_LINK()),
  },
];
