import { createSlice } from "@reduxjs/toolkit";
import { addComment, createTweet } from "../helper/tweetHelper";
import store from "./store";

const initialState = {
  tweets: []
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    fetchTweets: (state, action) => {
      state.tweets = [...action.payload];
    },
    addNewTweet: (state, { text }) => {
      state.tweets = [
        ...state.tweets,
        createTweet(text, store.getState().user.userId)
      ];
    },
    likeDislikeTweet: (state, { id }) => {
      const tweetIndex = state.tweets.findIndex((item) => item.id === id);
      state.tweets[tweetIndex].likedBy = [
        ...state.tweets[tweetIndex].likedBy,
        store.getState().user.userId
      ];
    },
    addCommentOnTweet: (state, { tweetId, text }) => {
      state.tweets = addComment(state.tweets, tweetId, {
        text,
        userId: store.getState().user.userId
      });
    }
  }
});

export const {
  likeDislikeTweet,
  fetchTweets,
  addNewTweet,
  addCommentOnTweet
} = tweetSlice.actions;

export default tweetSlice.reducer;
