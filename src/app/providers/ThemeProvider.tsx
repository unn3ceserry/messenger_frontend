"use client";

import { getCurrentTheme } from "@/entities";
import { useAppSelector } from "../store";
import { FC, ReactNode, useEffect } from "react";

interface IThemeProvider {
  children: ReactNode;
}

const ThemeProvider: FC<IThemeProvider> = ({ children }) => {
  const theme = useAppSelector(getCurrentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
