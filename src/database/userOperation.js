import { db } from "./firebase";
import {
  getDoc,
  getDocs,
  addDoc,
  where,
  collection,
  query,
} from "firebase/firestore";

export const loginToDB = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchUser = await getDocs(
        query(
          collection(db, "users"),
          where("email", "==", email),
          where("password", "==", password)
        )
      );
      let error = "";
      if (searchUser.size === 0) {
        error = "User Not Found";
      }
      resolve({ userId: searchUser.docs[0]?.id, error });
    } catch (err) {
      reject(err);
    }
  });
};
export const signUpToDB = ({ email, firstname, lastname, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchUser = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );
      let error = "";
      if (searchUser.size > 0) {
        error = "User already exists";
      }
      const addUser = await addDoc(collection(db, "users"), {
        email,
        firstname,
        lastname,
        password,
      });

      resolve({ userId: addUser.id, error });
    } catch (err) {
      reject(err);
    }
  });
};
