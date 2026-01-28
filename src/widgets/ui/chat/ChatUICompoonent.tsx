"use client";

import { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app";

import {
  openComponent,
  selectOpenComponent,
  UserProfile,
  UserType,
  VisibilityField,
} from "@/entities";
import { LeftSideBar } from "@/entities";

import UserContacts from "../contacts/UserContacts";
import {
  UserEditorProfileSettings,
  UserGeneralSettings,
  UserLanguageSettings,
  UserOtherSettings,
  UserSessionsSettings,
  UserSettings,
  BlockedUsers,
  SetCloudPassword,
  UserPrivacyAndSecuritySettings,
  PrivacyEmail,
} from "../settings";
import { VisibilitySettings } from "../settings/PrivacyAndSecurity";

interface Props {
  data: UserType;
}

const ChatUIComponent: FC<Props> = ({ data }) => {
  const whoIsOpenWithUiComponents = useAppSelector(selectOpenComponent);
  const dispatch = useAppDispatch();

  const [openedAvatar, setOpenedAvatar] = useState<string | null>(null);

  const renderComponent = () => {
    switch (whoIsOpenWithUiComponents) {
      case "userContacts":
        return <UserContacts />;
      case "userSettingsOther":
        return <UserOtherSettings />;
      case "userSettingsLanguage":
        return <UserLanguageSettings />;
      case "userSettingsSessions":
        return <UserSessionsSettings />;
      case "userSettingsGeneral":
        return <UserGeneralSettings />;
      case "editProfile":
        return <UserEditorProfileSettings data={data} />;
      case "myProfile":
        return <UserProfile data={data} setOpenedAvatar={setOpenedAvatar} />;
      case "cloudPassword":
        return <SetCloudPassword />;
      case "phoneVisible":
        return <VisibilitySettings data={data} field={VisibilityField.Phone} />;
      case "avatarsVisible":
        return (
          <VisibilitySettings data={data} field={VisibilityField.Avatars} />
        );
      case "birthdayVisible":
        return (
          <VisibilitySettings data={data} field={VisibilityField.Birthday} />
        );
      case "emailVisible":
        return <VisibilitySettings data={data} field={VisibilityField.Email} />;
      case "bioVisible":
        return <VisibilitySettings data={data} field={VisibilityField.Bio} />;
      case "userEmail":
        return <PrivacyEmail data={data} />;
      case "userSettingsPrivacy":
        return <UserPrivacyAndSecuritySettings data={data} />;
      case "blockedUsers":
        return <BlockedUsers data={data} />;
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
  };

  return (
    <>
      {renderComponent()}
      <AnimatePresence mode="wait">
        {openedAvatar && (
          <motion.div
            key="avatar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpenedAvatar(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-10001000 w-full"
          >
            <motion.img
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              transition={{ duration: 0.2 }}
              src={openedAvatar}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[600px] aspect-square object-cover rounded-xl cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatUIComponent;
