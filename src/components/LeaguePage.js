import React, { useState, useEffect } from "react";
import LeagueTable from "./LeagueTable";
import { Container, Table } from "react-bootstrap";
import LeagueTableDropdown from "./LeagueTableDropdown";

const LeaguePage = ({ games, users }) => {
  
  return (
    <Container fluid="md">
      <LeagueTable games={games} users={users}/>
    </Container>
  );
};

export default LeaguePage;


