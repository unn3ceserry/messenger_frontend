import { AppDispatch } from "@/app";
import { openComponent, VisibilityField } from "@/entities";

export const userPrivacySettingsCategoriesConfig = (dispatch: AppDispatch) => [
  {
    title: "settings.privacyAndSecurity.privacyWhoCanSee.phoneVisible",
    onClick: () => dispatch(openComponent("phoneVisible")),
    type: VisibilityField.Phone
  },
  {
    title: "settings.privacyAndSecurity.privacyWhoCanSee.emailVisible",
    onClick: () => dispatch(openComponent("emailVisible")),
    type: VisibilityField.Email
  },
  {
    title: "settings.privacyAndSecurity.privacyWhoCanSee.bioVisible",
    onClick: () => dispatch(openComponent("bioVisible")),
    type: VisibilityField.Bio
  },
  {
    title: "settings.privacyAndSecurity.privacyWhoCanSee.avatarsVisible",
    onClick: () => dispatch(openComponent("avatarsVisible")),
    type: VisibilityField.Avatars
  },
  {
    title: "settings.privacyAndSecurity.privacyWhoCanSee.birthdayVisible",
    onClick: () => dispatch(openComponent("birthdayVisible")),
    type: VisibilityField.Birthday
  },
];
