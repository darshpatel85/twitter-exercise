import { createSlice } from "@reduxjs/toolkit";
import { loginToDB, signUpToDB } from "../database/userOperation";

const initialState = {
  isLoggedIn: false,
  userId: "",
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userId = payload;
    },
    clearUser: () => {
      state = { ...initialState };
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setUser, clearUser, setError, setIsLoading } = userSlice.actions;

export const login = (email, password) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const { userId, error } = await loginToDB(email, password);
  dispatch(setIsLoading(false));
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(setUser(userId));
  }
};

export const signup = (userData) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const { userId, error } = await signUpToDB(userData);
  dispatch(setIsLoading(false));
  if (error) {
    dispatch(setError(error));
  } else {
    dispatch(setUser(userId));
  }
};
export default userSlice.reducer;
