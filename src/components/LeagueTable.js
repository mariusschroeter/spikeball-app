import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { getPointsAndWinsLossesOff } from "../backend/getUserStats";
import LeagueTableDropdown from "./LeagueTableDropdown";

const LeagueTable = ({ games, users }) => {
  const [season, setSeason] = useState({ table: [] });
  const [sortBy, setSortBy] = useState(sortType.winrate);

  useEffect(() => {
    createLeagueTable();
  }, [games, users]);

  const createLeagueTable = () => {
    var newLeagueTable = season["table"];
    users.forEach((user) => {
      var profilePic = user.url;
      var stats = getPointsAndWinsLossesOff(user.uid, games);
      var wins = stats[0];
      var losses = stats[1];
      var pointsScored = stats[2];
      var pointsGotten = stats[3];
      var total = wins + losses;
      var winrate = (wins / total).toFixed(2);
      // console.log(pointsScored);
      newLeagueTable.push(
        new LeagueTableRowData(
          profilePic,
          user.username,
          winrate,
          wins,
          losses,
          total,
          pointsScored,
          pointsGotten
        )
      );
    });

    sortLeagueTable(newLeagueTable, sortType.winrate);
  };

  const sortLeagueTable = (table, type) => {
    table.sort((a, b) => {
      switch (type) {
        case sortType.winrate:
          return b.winrate - a.winrate;
        case sortType.wins:
          return b.wins - a.wins;
        case sortType.losses:
          return b.losses - a.losses;
        case sortType.total:
          return b.total - a.total;
        case sortType.username:
          return b.name - a.name;
        default:
          return b.winrate - a.winrate;
      }
    });
    setSortBy(type);
    setSeason({ table: table });
  };

  // const changeSeason = () => {
  //   const val = document.getElementById("season-select").value;
  //   const table = val === "1" ? fakeTableData : fakeTableData2;
  //   sortLeagueTable(table["table"], sortBy);
  // };

  const ths = [
    { head: "" },
    { head: "username", sort: sortType.name },
    { head: "winrate", sort: sortType.winrate },
    { head: "wins", sort: sortType.wins },
    { head: "losses", sort: sortType.losses },
    { head: "total", sort: sortType.total },
    { head: "Points Scored", sort: sortType.total },
    { head: "Points Gotton", sort: sortType.total },
  ];
  return (
    <>
      <LeagueTableDropdown onChange={() => {}} />
      <Table striped bordered hover responsive variant="light">
        <thead>
          <tr>
            <th>#</th>
            {ths.map((th, index) => {
              var isSortedBy = sortBy === th.sort ? "#999" : "#fff";
              return (
                <th
                  key={index}
                  style={{ background: isSortedBy }}
                  onClick={() => sortLeagueTable(season["table"], th.sort)}
                >
                  {th.head}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {season["table"].map((element, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{ width: 25, height: 25 }}
                    alt="pic"
                    src={element.profilePic}
                  />
                </td>
                <td>{element.name}</td>
                <td>{element.winrate}</td>
                <td>{element.wins}</td>
                <td>{element.losses}</td>
                <td>{element.total}</td>
                <td>{element.pointsS}</td>
                <td>{element.pointsG}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default LeagueTable;

export const sortType = Object.freeze({
  winrate: 0,
  wins: 1,
  losses: 2,
  total: 3,
  name: 4,
});

class LeagueTableRowData {
  constructor(
    profilePic,
    name,
    winrate,
    wins,
    losses,
    total,
    pointsS,
    pointsG
  ) {
    this.profilePic = profilePic;
    this.name = name;
    this.winrate = winrate;
    this.wins = wins;
    this.losses = losses;
    this.total = total;
    this.pointsS = pointsS;
    this.pointsG = pointsG;
  }
}
