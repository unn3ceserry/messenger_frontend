"use client";

import Image from "next/image";
import { FC } from "react";

interface IRenderAvatarElement {
  hasAvatar: boolean;
  avatar?: string;
  size: number;
}

const RenderAvatarElement: FC<IRenderAvatarElement> = ({hasAvatar, size, avatar}) => {
  return (
    <>
      {hasAvatar ? (
        <Image
          src={avatar ?? ''}
          alt={'avatar'}
          width={size}
          height={size}
          className="rounded-full select-none object-cover aspect-square"
        />
      ) : (
        <div style={{width: size}} className="relative flex flex-col items-center justify-center">
          <div style={{width: size}} className="absolute aspect-square bg-black/50 to-accent/20 rounded-full"></div>
          <div style={{width: size}} className="absolute aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"></div>
        </div>
      )}
    </>
  );
};

export default RenderAvatarElement;
