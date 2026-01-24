"use client";

import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SwapUsersAvatarsArrows from "./elements/SwapUsersAvatarsArrows";
import SwapUsersAvatarsCurrentAvatar from "./elements/SwapUsersAvatarsCurrentAvatar";
import SwapUsersAvatarsLines from "./elements/SwapUsersAvatarsLines";

interface Props {
  hasAvatar: boolean;
  avatars?: string[];
  size: number;
  firstName: string;
  lastName: string;
  status: string;
}

const SwapUsersAvatars: FC<Props> = ({
  hasAvatar,
  avatars,
  size,
  firstName,
  lastName,
  status,
}) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  const t = useTranslations();
  const [currentImage, setCurrentImage] = useState<number>(
    avatars ? avatars.length - 1 : 0,
  );
  return (
    <div className={`flex w-full flex-col ${isFull ? "" : "pt-4"}`}>
      {hasAvatar ? (
        <motion.div
          className="w-full flex flex-col justify-center relative gap-3"
          style={{
            alignItems: isFull ? "flex-start" : "center",
            paddingTop: isFull ? 0 : "16px",
          }}
        >
          {/* avatar switcher */}
          <AnimatePresence>
            {isFull && (
              <>
                <SwapUsersAvatarsLines
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  avatars={avatars}
                />

                <SwapUsersAvatarsArrows
                  currentImage={currentImage}
                  setCurrentImage={setCurrentImage}
                  avatars={avatars}
                />
              </>
            )}
          </AnimatePresence>

          {/* current avatar */}
          <SwapUsersAvatarsCurrentAvatar
            currentImage={currentImage}
            isFull={isFull}
            setIsFull={setIsFull}
            size={size}
            avatars={avatars}
          />
          {/* names & status */}
          <motion.div
            layout
            className={`flex flex-col justify-center px-3 relative`}
            style={{
              alignItems: isFull ? "flex-start" : "center",
            }}
            transition={{ layout: { duration: 0.2 } }}
          >
            <p className="text-xl">
              {firstName} {lastName}
            </p>
            <p className="text-icons-color text-[.85rem]">{t(status)}</p>
          </motion.div>
        </motion.div>
      ) : (
        <div
          style={{ width: size }}
          className="relative flex flex-col items-center justify-center mx-auto pt-4"
        >
          <div
            style={{ width: size }}
            className="aspect-square bg-linear-190 from-accent to-accent/20 rounded-full"
          ></div>
        </div>
      )}
    </div>
  );
};

export default SwapUsersAvatars;
