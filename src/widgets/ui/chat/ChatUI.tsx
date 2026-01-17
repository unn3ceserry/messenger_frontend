"use client";

import LeftSideBar from "./elements/LeftSideBar";
import { AnimatePresence } from "framer-motion";
import {
  openComponent,
  selectOpenComponent,
  userApi,
  UserProfile,
  VisibilityField,
} from "@/entities";
import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/app";
import { useResizingSlice, setWidth, handleMouseMove } from "@/features";
import UserSettings from "../settings/UserSettings";
import UserLanguageSettings from "../settings/UserLanguageSettings";
import UserOtherSettings from "../settings/UserOtherSettings";
import UserSessionsSettings from "../settings/UserSessionsSettings";
import UserGeneralSettings from "../settings/UserGeneralSettings";
import UserEdtirProfileSettings from "../settings/UserEdtirProfileSettings";
import UserPrivacyAndSecuritySettings from "../settings/UserPrivacyAndSecuritySettings";
import UserPrivacyAndSecuritySettingsBlockedUsers from "../settings/elements/privacy/blocked-users/UserPrivacyAndSecuritySettingsBlockedUsers";
import UserPrivacyAndSecuritySettingsSetPassword from "../settings/elements/privacy/cloud-password/UserPrivacyAndSecuritySettingsSetPassword";
import UserPrivacyAndSecuritySettingsPrivacyEmail from "../settings/elements/privacy/email/UserPrivacyAndSecuritySettingsPrivacyEmail";
import UserPrivacyAndSecuritySettingsPrivacyVisibility from "../settings/elements/privacy/visibility/UserPrivacyAndSecuritySettingsPrivacyVisibility";

const MIN_WIDTH = 300;
const MAX_WIDTH = 680;

const ChatUI = () => {
  const { data, isLoading } = userApi.useGetMeQuery();

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

  {
    /* сделать тут лоадер в будущем */
  }
  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <div
        style={{ width }}
        className="flex items-center justify-center w-full h-screen bg-chatui-bg relative"
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
              case "editProfile":
                return <UserEdtirProfileSettings data={data} />;
              case "myProfile":
                return <UserProfile data={data} />;
              case "cloudPassword":
                return <UserPrivacyAndSecuritySettingsSetPassword />;
              case "phoneVisible":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyVisibility
                    data={data}
                    field={VisibilityField.Phone}
                  />
                );
              case "avatarsVisible":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyVisibility
                    data={data}
                    field={VisibilityField.Avatars}
                  />
                );
              case "birthdayVisible":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyVisibility
                    data={data}
                    field={VisibilityField.Birthday}
                  />
                );
              case "emailVisible":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyVisibility
                    data={data}
                    field={VisibilityField.Email}
                  />
                );
              case "bioVisible":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyVisibility
                    data={data}
                    field={VisibilityField.Bio}
                  />
                );
              case "userEmail":
                return (
                  <UserPrivacyAndSecuritySettingsPrivacyEmail data={data} />
                );
              case "userSettingsPrivacy":
                return <UserPrivacyAndSecuritySettings data={data} />;
              case "blockedUsers":
                return (
                  <UserPrivacyAndSecuritySettingsBlockedUsers data={data} />
                );
              case "userSettings":
                return <UserSettings data={data} />;

              default:
                return (
                  <LeftSideBar
                    data={data}
                    setIsOpen={() =>
                      dispatch(
                        openComponent(
                          whoIsOpenWithUiComponents === "actionPopup"
                            ? null
                            : "actionPopup",
                        ),
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
          className="w-0.5 bg-line-color self-stretch cursor-e-resize"
        ></div>
      </div>
    </>
  );
};

export default ChatUI;
