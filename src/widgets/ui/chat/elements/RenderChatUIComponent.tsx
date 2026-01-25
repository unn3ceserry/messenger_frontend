"use client";

import { useAppDispatch, useAppSelector } from "@/app";
import {
  openComponent,
  selectOpenComponent,
  UserProfile,
  UserType,
  VisibilityField,
} from "@/entities";
import UserLanguageSettings from "../../settings/UserLanguageSettings";
import UserOtherSettings from "../../settings/UserOtherSettings";
import UserContacts from "../../contacts/UserContacts";
import UserSessionsSettings from "../../settings/UserSessionsSettings";
import UserGeneralSettings from "../../settings/UserGeneralSettings";
import UserEdtirProfileSettings from "../../settings/UserEdtirProfileSettings";
import UserPrivacyAndSecuritySettingsSetPassword from "../../settings/elements/privacy/cloud-password/UserPrivacyAndSecuritySettingsSetPassword";
import UserPrivacyAndSecuritySettingsPrivacyVisibility from "../../settings/elements/privacy/visibility/UserPrivacyAndSecuritySettingsPrivacyVisibility";
import UserPrivacyAndSecuritySettingsPrivacyEmail from "../../settings/elements/privacy/email/UserPrivacyAndSecuritySettingsPrivacyEmail";
import UserPrivacyAndSecuritySettings from "../../settings/UserPrivacyAndSecuritySettings";
import UserPrivacyAndSecuritySettingsBlockedUsers from "../../settings/elements/privacy/blocked-users/UserPrivacyAndSecuritySettingsBlockedUsers";
import UserSettings from "../../settings/UserSettings";
import LeftSideBar from "./LeftSideBar";
import { FC } from "react";

interface Props {
  data: UserType;
}

const RenderChatUIComponent: FC<Props> = ({ data }) => {
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
        return <UserPrivacyAndSecuritySettingsPrivacyEmail data={data} />;
      case "userSettingsPrivacy":
        return <UserPrivacyAndSecuritySettings data={data} />;
      case "blockedUsers":
        return <UserPrivacyAndSecuritySettingsBlockedUsers data={data} />;
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

export default RenderChatUIComponent;
