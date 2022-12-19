import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase-config";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { Container, Spinner, Col } from "react-bootstrap";

import { getGames, getUserByIdOff, getUsers } from "./backend/helperFirebase";

import NavigationBar from "./components/NavigationBar";
import AuthPage from "./components/AuthPage";
import HomePage from "./components/HomePage";
import AddGamePage from "./components/AddGamePage";
import LeaguePage from "./components/LeaguePage";
import UserPage from "./components/UserPage";
import UserEdit from "./components/UserEdit";
import AuthNotVerifiedForm from "./components/AuthNotVerifiedForm";
import ResetPasswordPage from "./components/ResetPasswordPage";

function App() {
  const [authUser, setauthUser] = useState({});
  const [loggedInUser, setloggedInUser] = useState({});
  const [users, setusers] = useState([]);
  const [games, setgames] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setauthUser(currentUser);
  });

  useEffect(() => {
    if (authUser && authUser.emailVerified) {
      //2 abfragen sind online (nur hier in der app js)
      setX(getGames(), setgames);
      setX(getUsers(), setusers);
      //
    }
  }, [authUser]);

  const setX = (promise, func) => {
    promise.then((res) => {
      func(res);
    });
  };

  const checkAuth = (page) => {
    if (authUser) {
      if (authUser.emailVerified) {
        return page;
      } else {
        return <AuthNotVerifiedForm authUser={authUser} />;
      }
    } else {
      return <AuthPage />;
    }
  };

  const isEmpty = users.length === 0 || games.length === 0;

  console.log(users.length, games.length);

  return (
    <BrowserRouter>
      <nav>
        <NavigationBar loggedIn={authUser} />
      </nav>
      {isEmpty && authUser ? (
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <Spinner animation="border" role="status" className="mt-1 mb-1" />
        </Container>
      ) : (
        <Routes>
          <Route path="/" element={checkAuth(<HomePage games={games} />)} />
          <Route
            path="/leaguepage"
            element={checkAuth(<LeaguePage games={games} users={users} />)}
          />
          <Route
            path="/addgamepage"
            element={checkAuth(<AddGamePage authUser={authUser} />)}
          />
          <Route
            path="/UserPage/:uid"
            element={checkAuth(
              <UserPage
                loggedInUser={loggedInUser}
                authUser={authUser}
                games={games}
                users={users}
              />
            )}
          />
          <Route
            path="/UserEdit/:uid"
            element={checkAuth(
              <UserEdit
                loggedInUser={loggedInUser}
                authUser={authUser}
                games={games}
                users={users}
              />
            )}
          />
          <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
