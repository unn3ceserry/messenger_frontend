import { AppDispatch } from "@/app";
import { setActiveSection } from "@/entities";
import {
  BrickWallShield,
  Languages,
  MonitorSmartphone,
  Settings,
  Workflow,
} from "lucide-react";

export const userSettingsCategoriesConfig = (dispatch: AppDispatch) => [
  {
    icon: <Settings className="text-[#818181]" />,
    title: "settings.generalSettings.title",
    onClick: () => dispatch(setActiveSection("general")),
  },
  {
    icon: <MonitorSmartphone className="text-[#818181]" />,
    title: "settings.sessionSettings.title",
    onClick: () => dispatch(setActiveSection("sessions")),
  },
  {
    icon: <BrickWallShield className="text-[#818181]" />,
    title: "settings.privacyAndSecurity.title",
    onClick: () => dispatch(setActiveSection("privacy")),
  },
  {
    icon: <Languages className="text-[#818181]" />,
    title: "settings.languageSettings.title",
    onClick: () => dispatch(setActiveSection("language")),
    isLanguage: true,
  },
  {
    icon: <Workflow className="text-[#818181]" />,
    title: "settings.otherSettings.title",
    onClick: () => dispatch(setActiveSection("other")),
  },
];
