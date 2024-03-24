import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isLoggedIn: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, payload) => {
      return {
        ...state,
        isLoggedIn: true,
        user: payload.payload.user,
        token: payload.payload.user.token,
      };
    },
    logout: (state, payload) => {
      state = { ...initialState };
      return state;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { updateAccessToken, signIn, logout } = authSlice.actions;
