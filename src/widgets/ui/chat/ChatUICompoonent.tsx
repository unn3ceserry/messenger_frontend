"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  openComponent,
  selectOpenComponent,
  UserProfile,
  UserType,
  VisibilityField,
} from "@/entities";
import { LeftSideBar } from "@/entities";
import { FC } from "react";
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

const ChatUICompoonent: FC<Props> = ({ data }) => {
  const whoIsOpenWithUiComponents = useAppSelector(selectOpenComponent);
  const dispatch = useAppDispatch();

  return (() => {
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
        return <UserProfile data={data} />;
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
  })();
};

export default ChatUICompoonent;
