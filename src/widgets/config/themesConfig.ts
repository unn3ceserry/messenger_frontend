import { AppDispatch } from "@/app";
import { changeTheme, TUserTheme } from "@/entities";

export const THEME_CONFIG = (dispatch: AppDispatch): Array<{ tag: TUserTheme; title: string; onClick: () => void }> => [
  {
    tag: { theme: 'dark' },
    title: "settings.generalSettings.themeDark",
    onClick: () => dispatch(changeTheme({ theme: 'dark' })),
  },
  {
    tag: { theme: 'light' },
    title: "settings.generalSettings.themeLight",
    onClick: () => dispatch(changeTheme({ theme: 'light' })),
  },
];
