import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ILoggedUser } from "../../interface/user";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null as ILoggedUser | null },
  reducers: {
    setUser: (state, action: PayloadAction<ILoggedUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
