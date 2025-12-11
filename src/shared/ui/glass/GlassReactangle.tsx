"use client";

import { GlassCard } from "@developer-hub/liquid-glass";
import { FC } from "react";

type GlassCardProps = {
  children: React.ReactNode;
  displacementScale?: number;
  blurAmount?: number;
  cornerRadius?: number;
  mouseOffset?: {
    x: number;
    y: number;
  };
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  className?: string;
  padding?: string;
  style?: React.CSSProperties;
  shadowMode?: boolean;
  onClick?: () => void;
};

const GlassReactangle: FC<GlassCardProps> = ({ children, ...props }) => {
  return <GlassCard {...props}>{children}</GlassCard>;
};

export default GlassReactangle;
