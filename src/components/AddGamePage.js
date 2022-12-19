import React from "react";
import { Container } from "react-bootstrap";
import AddGameForm from "./AddGameForm";

const AddGamePage = ({ authUser }) => {
  return (
    <Container fluid="md">
      AddGamePage
      <AddGameForm authUser={authUser} />
    </Container>
  );
};

export default AddGamePage;
