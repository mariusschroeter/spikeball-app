import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { BsFillGearFill } from "react-icons/bs";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { getUserByIdOff } from "../backend/helperFirebase";
import { getUserStatsOff } from "../backend/getUserStats";
import { getRankBorder } from "../backend/getRankBorder";

const UserHeader = ({ users, authUser, games }) => {
  const siteParams = useParams();
  const [currentViewedUser, setcurrentViewedUser] = useState({});
  const [wins, setwins] = useState(0);
  const [losses, setlosses] = useState(0);
  const [rank, setrank] = useState(0);
  const [division, setdivision] = useState(0);
  const [rankBorder, setrankBorder] = useState("");

  useEffect(() => {
    if (siteParams && users.length !== 0 && games.length !== 0) {
      getUserByIdOff(siteParams.uid, users, setcurrentViewedUser);
      getUserStatsOff(
        siteParams.uid,
        games,
        setwins,
        setlosses,
        setrank,
        setdivision
      );
      getRankBorder(rank, division, setrankBorder);
    }
  }, [siteParams, users, games, rank, division]);

  return (
    <Container className="mt-3 border">
      <h2>UserHeader.js</h2>
      <Link to={`/UserEdit/${authUser.uid}`}>
        Edit Profile <BsFillGearFill />{" "}
      </Link>{" "}
      <Row>
        <Col className="border">
          {/* LEFT */}
          {/* User Pic */}
          <div
            style={{
              position: "relative",
              top: 0,
              left: 0,
            }}
          >
            <img
              src={currentViewedUser.url}
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: 100,
                height: 100,
              }}
              alt="Profile Pic"
            />
            <img
              src={rankBorder}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 100,
                height: 100,
              }}
              alt="Rank Pic"
            />
          </div>
          {/* Username */}
          UserName: {currentViewedUser.username} <br />
        </Col>
        <Col className="border">
          {/* RIGHT */}
          <Row className="border">
            {" "}
            {/* WR - W/L - T */}
            WR: {(wins / (wins + losses)).toFixed(2)} {""}
            W-L: {wins} - {losses} {""}
            T: {wins + losses} {""}
          </Row>
          <Row className="border"> {/* Last 5 Matches */}W - W - L - W - L</Row>
        </Col>
      </Row>
    </Container>
  );
};
export default UserHeader;
