"use client";

import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import { ModalConstructor } from "@/shared";
import {
  closeAll,
  openComponent,
  selectOpenComponent,
  UserProfileModal,
} from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";
import UserSettings from "../settings/UserSettings";
import UserLanguageSettings from "../settings/UserLanguageSettings";
import UserOtherSettings from "../settings/UserOtherSettings";
import UserSessionsSettings from "../settings/UserSessionsSettings";
import UserGeneralSettings from "../settings/UserGeneralSettings";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const ChatUI = () => {
  // getters
  const whoIsOpenWithUiComponents = useAppSelector(selectOpenComponent);
  const width = useAppSelector(useResizingSlice.selectors.selectWidth);

  // setters
  const dispatch = useAppDispatch();

  const setResizeValue = (v: number) => dispatch(setWidth({ width: v }));
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseUp = () => {
      isResizing.current = false;
    };
    const handleMouseMoveWrapper = (e: MouseEvent) => {
      handleMouseMove(e, isResizing, MIN_WIDTH, MAX_WIDTH, setResizeValue);
    };
    window.addEventListener("mousemove", handleMouseMoveWrapper);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMoveWrapper);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <div
        style={{ width }}
        className="flex items-center justify-center w-full h-screen bg-[#212121]"
      >
        <AnimatePresence>
          {(() => {
            switch (whoIsOpenWithUiComponents) {
              case "userSettingsOther":
                return <UserOtherSettings />;
              case "userSettingsLanguage":
                return <UserLanguageSettings />;
              case "userSettingsSessions":
                return <UserSessionsSettings />;
              case "userSettingsGeneral":
                return <UserGeneralSettings />;
              case "userSettingsPrivacy":
              case "userSettings":
                return <UserSettings />;

              default:
                return (
                  <LeftSideBar
                    setIsOpen={() =>
                      dispatch(
                        openComponent(
                          whoIsOpenWithUiComponents === "actionPopup"
                            ? null
                            : "actionPopup"
                        )
                      )
                    }
                    isOpen={whoIsOpenWithUiComponents === "actionPopup"}
                  />
                );
            }
          })()}
        </AnimatePresence>
        <div
          onMouseDown={() => (isResizing.current = true)}
          className="w-0.5 bg-[#313131]/90 self-stretch cursor-e-resize"
        ></div>
      </div>

      {/* modals */}
      <AnimatePresence>
        {whoIsOpenWithUiComponents === "myProfile" && (
          <ModalConstructor
            setIsOpen={() => dispatch(closeAll())}
            content={<UserProfileModal />}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatUI;
