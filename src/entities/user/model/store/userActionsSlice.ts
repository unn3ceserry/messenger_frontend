import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserActionsPopupState {
  isOpenMyProfile: boolean;
  isOpenUserSettings: boolean;
  isNightMode: boolean;
  isOpenActionPopup: boolean;
}

const initialState: IUserActionsPopupState = {
  isNightMode: false,
  isOpenMyProfile: false,
  isOpenUserSettings: false,
  isOpenActionPopup: false,
};

export const userActionsSlice = createSlice({
  name: "userActions",
  initialState,
  selectors: {
    selectIsNightMode: (state) => state.isNightMode,
    selectIsOpenMyProfile: (state) => state.isOpenMyProfile,
    selectIsOpenUserSettings: (state) => state.isOpenUserSettings,
    selectIsOpenActionPopup: (state) => state.isOpenActionPopup,
  },
  reducers: {
    setIsNightMode: (
      state,
      payload: PayloadAction<{ isNightMode: boolean }>
    ) => {
      state.isNightMode = payload.payload.isNightMode;
    },
    setIsOpenMyProfile: (
      state,
      payload: PayloadAction<{ isOpenMyProfile: boolean }>
    ) => {
      state.isOpenMyProfile = payload.payload.isOpenMyProfile;
      state.isOpenUserSettings = false;
      state.isOpenActionPopup = false;
    },
    setIsOpenUserSettings: (
      state,
      payload: PayloadAction<{ isOpenUserSettings: boolean }>
    ) => {
      state.isOpenUserSettings = payload.payload.isOpenUserSettings;
      state.isOpenMyProfile = false;
      state.isOpenActionPopup = false;
    },
    setIsOpenActionPopup: (
      state,
      payload: PayloadAction<{ isOpenActionPopup: boolean }>
    ) => {
      state.isOpenActionPopup = payload.payload.isOpenActionPopup;
      state.isOpenMyProfile = false;
      state.isOpenUserSettings = false;
    },
  },
});

export const userActionsReducer = userActionsSlice.reducer;
export const { setIsNightMode, setIsOpenMyProfile, setIsOpenUserSettings, setIsOpenActionPopup } =
  userActionsSlice.actions;

export const selectIsOpenMyProfile = (state: RootState) =>
  state.userActions.isOpenMyProfile;
export const selectIsNightMode = (state: RootState) =>
  state.userActions.isNightMode;
export const selectIsOpenActionPopup = (state: RootState) =>
  state.userActions.isOpenActionPopup;
export const selectIsOpenUserSettings = (state: RootState) =>
  state.userActions.isOpenUserSettings;