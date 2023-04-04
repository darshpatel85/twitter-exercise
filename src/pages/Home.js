import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TweetUI from "../components/TweetUI";
import { getAllTweets } from "../database/tweetsOperations";
import { fetchTweets } from "../store/tweetSlice";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state?.tweet?.tweets || []);
  console.log(tweets);

  const getTweets = async () => {
    setIsLoading(true);
    const data = await getAllTweets();
    dispatch(fetchTweets(data || []));
    setIsLoading(false);
  };
  useEffect(() => {
    getTweets();
  }, []);
  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Latest Tweets</h5>
              <hr />
              <div className="row">
                <div className="col-md-12">
                  {tweets.map((item) => (
                    <TweetUI {...item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
