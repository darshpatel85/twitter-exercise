import { db } from "./firebase";
import {
  getDocs,
  doc,
  getDoc,
  where,
  collection,
  query
} from "firebase/firestore";
import moment from "moment";

export const getAllTweets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let tweets = [];
      const querySnapshot = await getDocs(
        query(collection(db, "tweets"), where("isComment", "==", false))
      );
      tweets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          let tweet = doc.data();
          tweet.id = doc.id;
          tweet.tweetedBy = (await getDoc(tweet.tweetedBy)).data();
          let x = await Promise.all(
            tweet.likedBy.map(async (item) => (await getDoc(item)).data())
          );
          tweet.createdAt = moment(tweet.createdAt.seconds * 1000).format(
            "HH:mm a DD-MM-yyyy"
          );
          tweet.likedBy = { ...x };
          return tweet;
        })
      );

      resolve(tweets);
    } catch (error) {
      reject(error);
    }
  });
};

export const getComments = (tweetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tweets = [];
      const mainTweet = await doc(db, "tweets", tweetId);
      console.log(mainTweet);
      const querySnapshot = await getDocs(
        query(collection(db, "tweets"), where("commentOf", "==", mainTweet))
      );
      tweets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          let tweet = doc.data();
          tweet.id = doc.id;
          let x = await Promise.all(
            tweet.likedBy.map(async (item) => (await getDoc(item)).data())
          );
          tweet.likedBy = { ...x };
          return tweet;
        })
      );
      resolve(tweets);
    } catch (error) {
      reject(error);
    }
  });
};
