import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserCompleteData {
  email?: string;
  birthday?: string;
  password?: string;
}

interface IUserCompleteDataState {
  data: IUserCompleteData;
}

export const initialState: IUserCompleteDataState = {
  data: {
    email: undefined,
    birthday: undefined,
    password: undefined,
  },
};

export const userCompleteDataSlice = createSlice({
  name: "userCompleteData",
  initialState,
  reducers: {
    setCompleteData: (
      state,
      actions: PayloadAction<{ data: string; field: keyof IUserCompleteData }>
    ) => {
      state.data[actions.payload.field] = actions.payload.data;
    },
  },
});

export const userCompleteDataReducer = userCompleteDataSlice.reducer;
export const {setCompleteData} = userCompleteDataSlice.actions