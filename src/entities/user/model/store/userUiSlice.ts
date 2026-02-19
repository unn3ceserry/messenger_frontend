import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IIsOpenUIComponent =
  | "myProfile"
  | "searchUsers"
  | "userSettingsGeneral"
  | "userSettingsLanguage"
  | "userSettingsOther"
  | "userSettingsPrivacy"
  | "userSettingsSessions"
  | "userSettings"
  | "actionPopup"
  | "userActionsMenu"
  | "userContacts"
  | "editProfile"
  | "blockedUsers"
  | "cloudPassword"
  | "userEmail"
  | "phoneVisible"
  | "emailVisible"
  | "bioVisible"
  | "avatarsVisible"
  | "birthdayVisible"
  | null;

interface IUIState {
  openComponent: IIsOpenUIComponent;
}

export const initialState: IUIState = {
  openComponent: null,
};

export const userUiSlice = createSlice({
  name: "userUiOpenComponent",
  initialState,
  reducers: {
    openComponent: (state, action: PayloadAction<IIsOpenUIComponent>) => {
      state.openComponent = action.payload;
    },

    closeAll: (state) => {
      state.openComponent = null;
    },
  },
});

export const userUiReducer = userUiSlice.reducer;
export const { openComponent, closeAll } = userUiSlice.actions;

export const selectOpenComponent = (state: RootState) => state.userUiOpenComponent.openComponent;
