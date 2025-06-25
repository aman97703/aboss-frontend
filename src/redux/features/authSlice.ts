import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
}

interface initialStateInterface {
  userInfo: IUserInfo | null;
}

const initialState: initialStateInterface = {
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload;
    },
   
    logout: (state) => {
      state.userInfo = null;
    },
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
