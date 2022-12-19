import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserById } from "../backend/helperFirebase";

const TeamAndScore = ({ p1, p2, score }) => {
  const [t1p1, sett1p1] = useState("");
  const [t1p2, sett1p2] = useState("");

  useEffect(() => {
    getUserById(p1, sett1p1);
    getUserById(p2, sett1p2);
  }, [p1, p2]);

  const variant = score === 21 ? "success" : "danger";

  return (
    <Alert variant={variant}>
      <p>
        {/* NOTIZ AN MARIUS: Ich habe aus dem <Link> das user={t1p1} entfernt,
                             weil das keine Funktion hatte, oder? :D */}
        <Link to={`/UserPage/${t1p1.uid}`}>{t1p1.username}</Link> und{" "}
        <Link to={`/UserPage/${t1p2.uid}`}>{t1p2.username}</Link>
      </p>
      <p>{score}</p>
    </Alert>
  );
};

export default TeamAndScore;
