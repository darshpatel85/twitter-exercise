import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
  userId: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.isLoggedIn = true;
      state.userId = payload;
    },
    logout: (state) => {
      state = { ...initialState };
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
