import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IIgnoredUsersState {
  users: Array<string>;
}

const initialState: IIgnoredUsersState = {
  users: [],
};

export const ignoredUsersSlice = createSlice({
  name: "ignoredUsers",
  initialState,
  reducers: {
    ignoreUser: (state, action: PayloadAction<string>) => {
      state.users.push(action.payload);
    },
    unignoreUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((el) => el !== action.payload);
    },
  },
});

export const ignoredUsersReducer = ignoredUsersSlice.reducer;
export const { ignoreUser, unignoreUser } = ignoredUsersSlice.actions;
export const getListIgnoredUsers = (state: RootState) => state.ignoredUsers.users;