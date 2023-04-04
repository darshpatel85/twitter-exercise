import { useState } from "react";
import { MAX_COMMENT_LEVEL } from "../constant";
import Comments from "./Comments";

const TweetUI = ({ id, text, tweetedBy, createdAt, currentCommentLevel }) => {
  const [displayComments, setDisplayComments] = useState(false);
  currentCommentLevel = (currentCommentLevel || 1) + 1;
  const handleComments = () => setDisplayComments(!displayComments);

  return (
    <div className="card" key={id}>
      <div className="card-body">
        <div className="row">
          <div className="col-1">
            <img
              src="https://static.foxbusiness.com/foxbusiness.com/content/uploads/2022/04/thumbnail_elon-musk-twitter-.jpg"
              className="rounded-circle"
              width={50}
              height={50}
              alt="Profile"
            />
          </div>
          <div className="col-11">
            <h5 className="card-title">
              {tweetedBy.firstname} {tweetedBy.lastname}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              @{tweetedBy.email.split("@")[0]}
            </h6>
            <p className="card-text">{text}</p>
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">{createdAt}</small>
            </div>
            {MAX_COMMENT_LEVEL >= currentCommentLevel && (
              <div className="d-flex justify-content-between align-items-center">
                <button onClick={handleComments} className="btn btn-link">
                  {displayComments ? "Hide comments" : "reply"}
                </button>
              </div>
            )}
          </div>
        </div>
        {displayComments && (
          <div className="ml-2">
            <Comments currentCommentLevel={currentCommentLevel} tweetId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetUI;
