import { createSlice } from "@reduxjs/toolkit";
import { getAllTweets } from "../database/tweetsOperations";
import { addComment, createTweet } from "../helper/tweetHelper";

const initialState = {
  tweets: [],
  isLoading: false,
};

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    fetchTweets: (state, action) => {
      state.tweets = [...action.payload];
    },
    addNewTweet: (state, action) => {
      const { text, userId } = action.payload;
      state.tweets = [...state.tweets, createTweet(text, userId)];
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addCommentOnTweet: (state, { tweetId, text, userId }) => {
      state.tweets = addComment(state.tweets, tweetId, {
        text,
        userId,
      });
    },
  },
});

export const {
  likeDislikeTweet,
  fetchTweets,
  addNewTweet,
  addCommentOnTweet,
  setIsLoading,
} = tweetSlice.actions;

export const getTweets = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  const data = await getAllTweets();
  dispatch(fetchTweets(data || []));
  dispatch(setIsLoading(false));
};
export default tweetSlice.reducer;
