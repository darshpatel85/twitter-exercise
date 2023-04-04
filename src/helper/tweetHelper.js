export const addComment = (tweets, tweetId, commentData) => {
  for (let i = 0; i < tweets.length; i++) {
    const element = tweets[i];
    if (element.id === tweetId) {
      element.comments = [...element.comments, createTweet(commentData)];
      return tweets;
    }
    if (element.comments.length > 0) {
      addComment(element.comments, tweetId, commentData);
    }
  }
  return tweets;
};

export const createTweet = (userId, text) => ({
  userId,
  text,
  id: Date.now(),
  createdAt: new Date(),
  comments: []
});
