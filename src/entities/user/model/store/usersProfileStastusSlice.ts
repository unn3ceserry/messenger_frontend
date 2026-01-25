import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type OpenComponent = "userProfile" | "editContact" | null

type OtherUsersProfileType = {
  openComponent: OpenComponent
  username: string,
};

const initialState: OtherUsersProfileType = {
  openComponent: null,
  username: '',
}

export const usersProfileStastusSlice = createSlice({
  name: 'userOtherUsersProfile',
  initialState,
  reducers: {
    setOpenComponentOtherUsersProfile: (state, actions: PayloadAction<{username: string, openComponent: OpenComponent}>) => {
      state.openComponent = actions.payload.openComponent;
      state.username = actions.payload.username;
    },
    closeOtherProfile: (state) => {
      state.openComponent = null;
      state.username = ''
    }
  }
})

export const usersProfileStastusReducer = usersProfileStastusSlice.reducer;
export const {setOpenComponentOtherUsersProfile, closeOtherProfile} = usersProfileStastusSlice.actions;
export const getOtherProfileStatus = (store: RootState) => ({
  status: store.usersProfileStastus.openComponent,
  username: store.usersProfileStastus.username
});