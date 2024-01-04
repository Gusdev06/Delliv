import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootReducer } from "..";

interface User {
  access_token: string | null;
  role: string | null;
}

const initialState: User = {
  access_token: Cookies.get("token") || null,
  role: Cookies.get("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        access_token: string;
        role: string;
      }>
    ) => {
      const { access_token, role } = action.payload;
      state.access_token = access_token;
      state.role = role;
      Cookies.set("token", access_token, {
        expires: 365,
        secure: true,
        httpOnly: true,
      });
      Cookies.set("role", role, { expires: 365 });
    },
    logOut: (state) => {
      state.access_token = null;
      state.role = null;
      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
});

export const selectCurrentToken = (state: RootReducer) =>
  state.auth.access_token;

export const selectUserRole = (state: RootReducer) => state.auth.role;

export const selectCurrentUser = (state: RootReducer) => state.auth;

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
