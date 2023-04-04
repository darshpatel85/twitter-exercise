import { useEffect, useState } from "react";
import { getComments } from "../database/tweetsOperations";
import AddComment from "./AddComment";
import Loader from "./Loader";
import TweetUI from "./TweetUI";

const Comments = ({ tweetId, currentCommentLevel }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    const data = await getComments(tweetId);
    console.log(data);
    setComments(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {comments.map((comment) => (
        <TweetUI
          currentCommentLevel={currentCommentLevel}
          {...comment}
          key={comment.id}
        />
      ))}
      <AddComment fetchComments={fetchComments} tweetId={tweetId} />
    </>
  );
};

export default Comments;
