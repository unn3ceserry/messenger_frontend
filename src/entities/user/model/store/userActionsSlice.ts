import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserActionsPopupState {
  isOpenMyProfile: boolean;
  isOpenUserSettings: boolean;
  isNightMode: boolean;
}

const initialState: IUserActionsPopupState = {
  isNightMode: false,
  isOpenMyProfile: false,
  isOpenUserSettings: false,
};

export const userActionsSlice = createSlice({
  name: "useractions",
  initialState,
  selectors: {
    selectIsNightMode: (state) => state.isNightMode,
    selectIsOpenMyProfile: (state) => state.isOpenMyProfile,
    selectIsOpenUserSettings: (state) => state.isOpenUserSettings,
  },
  reducers: {
    setIsNightMode: (state, payload: PayloadAction<{isNightMode: boolean}>) => {
      state.isNightMode = payload.payload.isNightMode;
      state.isOpenMyProfile = false;
      state.isOpenUserSettings = false;
    },
    setIsOpenMyProfile: (state, payload: PayloadAction<{isOpenMyProfile: boolean}>) => {
      state.isOpenMyProfile = payload.payload.isOpenMyProfile;
      state.isOpenUserSettings = false
    },
    setIsOpenUserSettings: (state, payload: PayloadAction<{isOpenUserSettings: boolean}>) => {
      state.isOpenUserSettings = payload.payload.isOpenUserSettings;
      state.isOpenMyProfile = false;
    },
  },
});

export const userActionsReducer = userActionsSlice.reducer;
export const { setIsNightMode, setIsOpenMyProfile, setIsOpenUserSettings } = userActionsSlice.actions;
