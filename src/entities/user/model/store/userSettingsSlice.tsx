import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserSettingsSection =
  | "general"
  | "language"
  | "other"
  | "privacy"
  | "sessions"
  | null;

interface IUserSettingsSlice {
  activeSection: UserSettingsSection;
}

const initialState: IUserSettingsSlice = {
  activeSection: null,
};

export const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setActiveSection: (
      state,
      action: PayloadAction<UserSettingsSection>
    ) => {
      state.activeSection = action.payload;
    },
    resetActiveSection: (state) => {
      state.activeSection = null;
    },
  },
});

export const {
  setActiveSection,
  resetActiveSection,
} = userSettingsSlice.actions;

export const userSettingsReducer = userSettingsSlice.reducer;
export const selectWhoCategoryIsOpen = (state: RootState) =>
  state.userSettings.activeSection;