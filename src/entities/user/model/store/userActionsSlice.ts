import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserActionsPopupState {
  isOpenMyProfile: boolean;
  isOpenUserSettings: boolean;
  isNightMode: boolean;
  isOpenActionPopup: boolean;
  isOpenUserContacts: boolean;
  isOpenEditProfile: boolean;
}

const initialState: IUserActionsPopupState = {
  isNightMode: false,
  isOpenMyProfile: false,
  isOpenUserSettings: false,
  isOpenActionPopup: false,
  isOpenUserContacts: false,
  isOpenEditProfile: false,
};

export const userActionsSlice = createSlice({
  name: "userActions",
  initialState,
  selectors: {
    selectIsNightMode: (state) => state.isNightMode,
    selectIsOpenMyProfile: (state) => state.isOpenMyProfile,
    selectIsOpenUserSettings: (state) => state.isOpenUserSettings,
    selectIsOpenActionPopup: (state) => state.isOpenActionPopup,
    selectIsOpenEditProfile: (state) => state.isOpenEditProfile,
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
      state.isOpenUserContacts = false;
    },
    setIsOpenUserSettings: (
      state,
      payload: PayloadAction<{ isOpenUserSettings: boolean }>
    ) => {
      state.isOpenUserSettings = payload.payload.isOpenUserSettings;
      state.isOpenMyProfile = false;
      state.isOpenActionPopup = false;
      state.isOpenUserContacts = false;
    },
    setIsOpenActionPopup: (
      state,
      payload: PayloadAction<{ isOpenActionPopup: boolean }>
    ) => {
      state.isOpenActionPopup = payload.payload.isOpenActionPopup;
      state.isOpenMyProfile = false;
      state.isOpenUserSettings = false;
      state.isOpenUserContacts = false;
    },
    setIsOpenUserContacts: (
      state,
      payload: PayloadAction<{ isOpenUserContacts: boolean }>
    ) => {
      state.isOpenUserContacts = payload.payload.isOpenUserContacts;
      state.isOpenActionPopup = false;
      state.isOpenMyProfile = false;
      state.isOpenUserSettings = false;
    },
    setIsOpenEditProfile: (
      state,
      payload: PayloadAction<{ isOpenEditProfile: boolean }>
    ) => {
      state.isOpenEditProfile = payload.payload.isOpenEditProfile;
      state.isOpenUserSettings = false;
      state.isOpenActionPopup = false;
      state.isOpenMyProfile = false;
      state.isOpenUserContacts = false;
    },
  },
});

export const userActionsReducer = userActionsSlice.reducer;
export const { setIsNightMode, setIsOpenMyProfile, setIsOpenUserSettings, setIsOpenActionPopup, setIsOpenUserContacts, setIsOpenEditProfile } =
  userActionsSlice.actions;

export const selectIsOpenMyProfile = (state: RootState) =>
  state.userActions.isOpenMyProfile;
export const selectIsNightMode = (state: RootState) =>
  state.userActions.isNightMode;
export const selectIsOpenActionPopup = (state: RootState) =>
  state.userActions.isOpenActionPopup;
export const selectIsOpenUserSettings = (state: RootState) =>
  state.userActions.isOpenUserSettings;
export const selectIsOpenUserContacts = (state: RootState) =>
  state.userActions.isOpenUserContacts;
export const selectIsOpenEditProfile = (state: RootState) =>
  state.userActions.isOpenEditProfile;