import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tweetReducer from "./tweetSlice";

console.log(tweetReducer, userReducer);

const store = configureStore({
  reducer: { user: userReducer, tweet: tweetReducer }
});

export default store;
