import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
}

interface initialStateInterface {
  userInfo: IUserInfo | null;
  isLoading: Boolean;
}

const initialState: initialStateInterface = {
  userInfo: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { logout, setCredentials, setLoading } = authSlice.actions;
export default authSlice.reducer;
