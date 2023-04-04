import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateNewTweet from "../components/CreateTweet";
import Loader from "../components/Loader";
import TweetUI from "../components/TweetUI";
import { getTweets } from "../store/tweetSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { tweets, isLoading } = useSelector((state) => state?.tweet || []);

  useEffect(() => {
    dispatch(getTweets());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Tweets</h5>
              <CreateNewTweet />
              <hr />
              {isLoading ? (
                <Loader />
              ) : (
                <div className="row">
                  <div className="col-md-12">
                    {tweets.map((item) => (
                      <TweetUI key={item.id} {...item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
