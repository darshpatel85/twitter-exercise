import { db } from "./firebase";
import {
  getDocs,
  doc,
  getDoc,
  addDoc,
  where,
  collection,
  query,
  Timestamp,
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
          tweet.createdAt = moment(tweet.createdAt.seconds * 1000).format(
            "HH:mm a DD-MM-yyyy"
          );
          return tweet;
        })
      );

      resolve(tweets.reverse());
    } catch (error) {
      reject(error);
    }
  });
};

export const getComments = (tweetId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tweets = [];
      const mainTweet = doc(db, "tweets", tweetId);
      const querySnapshot = await getDocs(
        query(collection(db, "tweets"), where("commentOf", "==", mainTweet))
      );
      tweets = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          let tweet = doc.data();
          tweet.tweetedBy = (await getDoc(tweet.tweetedBy)).data();
          tweet.id = doc.id;
          tweet.createdAt = moment(tweet.createdAt.seconds * 1000).format(
            "HH:mm a DD-MM-yyyy"
          );
          return tweet;
        })
      );
      resolve(tweets);
    } catch (error) {
      reject(error);
    }
  });
};

export const postTweet = (userId, text, commentOf) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userRef = doc(db, "users", userId);
      const tweetObj = {
        text,
        createdAt: Timestamp.fromDate(new Date()),
        isComment: false,
        tweetedBy: userRef,
      };
      if (commentOf) {
        const tweetRef = doc(db, "tweets", commentOf);
        tweetObj.isComment = true;
        tweetObj.commentOf = tweetRef;
      }
      await addDoc(collection(db, "tweets"), tweetObj);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
