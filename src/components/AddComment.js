import { useState } from "react";
import { useSelector } from "react-redux";
import { postTweet } from "../database/tweetsOperations";

const AddComment = ({ fetchComments, tweetId: parentTweetId }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state?.user?.userId);

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await postTweet(userId, comment, parentTweetId);
    setIsLoading(false);
    setComment("");
    fetchComments();
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="3"
              name="comment"
              onChange={handleChange}
              value={comment}
              placeholder="Reply...."
            ></textarea>
          </div>
          <div className="p-2">
            <button
              disabled={isLoading || comment.length == 0}
              type="submit"
              className="btn btn-primary"
            >
              {isLoading ? "Processing..." : "Add Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
