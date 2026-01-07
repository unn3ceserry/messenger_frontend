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
  setIsNightMode,
  setIsOpenMyProfile,
  setIsOpenUserContacts,
  setIsOpenUserSettings,
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
    onClick: () =>
      dispatch(
        setIsOpenMyProfile({ isOpenMyProfile: true })
      ),
  },
  {
    icon: <Settings size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.settings",
    onClick: () =>
      dispatch(
        setIsOpenUserSettings({ isOpenUserSettings: true })
      ),
  },
  {
    icon: <FileUser size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.contacts",
    onClick: () =>
      dispatch(
        setIsOpenUserContacts({ isOpenUserContacts: true })
      ),
  },
  {
    icon: <CloudMoonRain size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.nightMode",
    onClick: () =>
      dispatch(
        setIsNightMode({ isNightMode: true })
      ),
  },
  {
    icon: <CirclePlus size={20} className="text-[#818181]" />,
    title: "chat.actionsPopup.installApp",
    onClick: () => window.open(configApp.APP_LINK()),
  },
];
