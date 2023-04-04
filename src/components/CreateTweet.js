import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTweet } from "../database/tweetsOperations";
import { getTweets } from "../store/tweetSlice";

const CreateNewTweet = () => {
  const [tweet, setTweet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.user?.userId);

  const handleChange = (e) => setTweet(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await postTweet(userId, tweet);
    setIsLoading(false);
    setTweet("");
    dispatch(getTweets());
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              name="tweet"
              onChange={handleChange}
              value={tweet}
              placeholder="What's happening?"
            ></textarea>
          </div>
          <div className="p-2">
            <button
              disabled={isLoading || tweet.length == 0}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? "Processing..." : "Tweet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTweet;
