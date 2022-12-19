import React, { useEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { app } from "../firebase-config";
import { updatePassword, updateEmail } from "firebase/auth";
import "firebase/compat/storage";

import {
  checkIfUsernameExists,
  getUserByIdOff,
  getUsers,
} from "../backend/helperFirebase.js";

const db = app.firestore();
const storage = app.storage();

const UserEdit = ({ users, authUser }) => {
  const [file, setFile] = useState(null);
  const [newUsername, setnewUsername] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [newEmail, setnewEmail] = useState("");
  const [loggedInUser, setloggedInUser] = useState({});

  useEffect(() => {
    getUserByIdOff(authUser.uid, users, setloggedInUser);
  }, [users, loggedInUser]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const changeUserPic = async () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    db.collection("users")
      .doc(loggedInUser.uid)
      .update({
        url: await fileRef.getDownloadURL(),
      });
  };

  const changeUsername = async () => {
    // const userExists = await checkIfUsernameExists(newUsername);
    // console.log(userExists)
    await getUsers().then((res) => {
      const userExists = res.some((user) => user.username === newUsername);
      if (!userExists) {
        db.collection("users")
          .doc(loggedInUser.uid)
          .update({ username: newUsername });
      } else {
        console.log("Username already exists.");
      }
    });
  };

  const changePassword = async () => {
    updatePassword(authUser, newPassword)
      .then(() => {
        // Update successful
        console.log("Password was changed!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  const changeEmail = async () => {
    updateEmail(authUser, newEmail)
      .then(() => {
        // Update successful
        console.log("Email was changed!");
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <Container className="mt-3">
      <h2>UserEdit.js</h2>
      <img style={{ width: 50, height: 50 }} alt="pic" src={loggedInUser.url} />
      <br />
      <input type="file" onChange={onFileChange} />
      <button onClick={changeUserPic}>Upload image</button>
      <br />
      <br />
      <input
        type="text"
        placeholder={loggedInUser.username}
        onChange={(event) => {
          setnewUsername(event.target.value);
        }}
      />
      <button onClick={changeUsername}>Change Username</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="*********"
        onChange={(event) => {
          setnewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}>Change Password</button>
      <br />
      <br />
      <input
        type="text"
        placeholder={loggedInUser.email}
        onChange={(event) => {
          setnewEmail(event.target.value);
        }}
      />
      <button onClick={changeEmail}>Change Email</button>
    </Container>
  );
};

export default UserEdit;
