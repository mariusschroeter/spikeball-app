import {
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const getUsers = async () => {
  var users = [];
  try {
    const response = collection(db, "users");
    const data = await getDocs(response);
    data.docs.forEach((game) => {
      const gameInstance = game.data();
      users.push(gameInstance);
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    return users;
  }
};

export const getGames = async () => {
  var games = [];
  try {
    // const response = collection(db, "games");
    const myQuery = query(
      collection(db, "games"),
      orderBy("date", "desc")
      // where(season, "equals", season)
    );
    const data = await getDocs(myQuery);
    data.docs.forEach((game) => {
      const gameInstance = game.data();
      games.push(gameInstance);
      //console.log(gameInstance);
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    return games;
  }
};

export const getUserById = async (uid, func) => {
  if (uid) {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const userObj = docSnap.data();
      func(userObj);
    } catch (error) {
      console.log(error.message);
    }
  }
};

export const getUserByIdOff = (uid, users, func) => {
  const user = users.find((user) => user.uid === uid);
  //console.log(user);
  func(user);
};

export const getAllUsersForSelect = async (func) => {
  const users = await getUsers();

  users.forEach((user) => {
    const uid = user.data().uid;
    const name = user.data().email;

    func((optionUsers) => [...optionUsers, { value: uid, label: name }]);
  });
};

export const checkIfUsernameExists = async (username) => {
  await getUsers().then((res) => {
    const any = res.some((user) => user.username === username);
    console.log(any);
    return any;
  });
};
