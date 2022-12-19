import React from "react";
import { useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "firebase/compat/firestore";

import { checkIfUsernameExists } from "../backend/helperFirebase.js";

const AuthForm = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");

  const [isLoginPage, setisLoginPage] = useState(true);

  const register = async () => {
    try {
      var userExists = await checkIfUsernameExists(registerUsername);
      console.log(userExists);
      if (!userExists) {
        // If username not already exists.
        const user = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        maybeCreateUser(user.user);
      } else {
        console.log("Username already exists!");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const maybeCreateUser = async (user) => {
    const docRefUser = doc(db, "users", user.uid);
    const docSnapUser = await getDoc(docRefUser);

    if (docSnapUser.data()) {
      // Check if, userDoc already exists
      console.log("UserDoc already exists!");
      return;
    } else {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username: registerUsername,
        email: user.email,
        age: 0,
        games: [],
        url: `https://avatars.dicebear.com/api/personas/${user.uid}.svg`,
      });
      sendVerificationEmail(user);
    }
  };

  const sendVerificationEmail = async (user) => {
    await sendEmailVerification(user)
      .then(() => {
        console.log("The verification email was successfully sent.");
      })
      .catch((error) => {
        console.log("Error-Code:", error.code, "Error-Message:", error.message);
      });
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //console.log(user)
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
    }
  };

  const loginOrRegisterText = isLoginPage
    ? "No account yet? Click here to register!"
    : "Already register? Click to Login.";

  return (
    <Container className="mt-4">
      <Card bg="light">
        <Card.Body>
          <div className="App">
            {isLoginPage ? (
              <div>
                <div>
                  <h1>Login</h1>
                  <input
                    className="mt-1 mb-1"
                    placeholder="Email..."
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                  />
                  <br />
                  <input
                    className="mt-1 mb-1"
                    placeholder="Password..."
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                </div>
                <button className="btn btn-primary mt-1 mb-1" onClick={login}>
                  {" "}
                  Login
                </button>
                <Link to={`/ResetPasswordPage/`}>Reset Password </Link>{" "}
              </div>
            ) : (
              <div>
                <div>
                  <h1>Register</h1>
                  <input
                    className="mt-1 mb-1"
                    placeholder="Email..."
                    onChange={(event) => {
                      setRegisterEmail(event.target.value);
                    }}
                  />
                  <br />
                  <input
                    className="mt-1 mb-1"
                    placeholder="Username..."
                    onChange={(event) => {
                      setRegisterUsername(event.target.value);
                    }}
                  />
                  <br />
                  <input
                    className="mt-1 mb-1"
                    placeholder="Password..."
                    onChange={(event) => {
                      setRegisterPassword(event.target.value);
                    }}
                  />
                </div>
                <button
                  className="btn btn-primary mt-1 mb-1"
                  onClick={register}
                >
                  {" "}
                  Register
                </button>
              </div>
            )}
            <button
              className="btn-sm btn-secondary mt-1 mb-1"
              onClick={() => setisLoginPage(!isLoginPage)}
            >
              {loginOrRegisterText}
            </button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
