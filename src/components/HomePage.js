import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import HomeFeed from "./HomeFeed";

const HomePage = ({games}) => {

  return (
    <Container>
      <HomeFeed games={games} />
    </Container>
  );
};

export default HomePage;
