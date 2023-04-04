const TweetUI = ({ id, text, tweetedBy, createdAt }) => {
  return (
    <div className="card" key={id}>
      <div className="card-body">
        <div className="row">
          <div className="col-2">
            <img
              src="https://placehold.it/50x50"
              className="rounded-circle"
              alt="Profile"
            />
          </div>
          <div className="col-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetUI;
