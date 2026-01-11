import { RootState } from "@/app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserTheme = {
  theme: "dark" | "light"
};
const initialState: TUserTheme = {
  theme: "dark"
}

export const userThemeSlice = createSlice({
  name: 'userTheme',
  initialState,
  reducers: {
    changeTheme: (state, actions: PayloadAction<TUserTheme>) => {
     state.theme = actions.payload.theme
    }
  },
})


export const userThemeReducer = userThemeSlice.reducer;
export const { changeTheme } = userThemeSlice.actions;

export const getCurrentTheme = (state: RootState) => state.userTheme.theme;