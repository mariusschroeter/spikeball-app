import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase-config";

export const getUserStatsOff = (
  uid,
  games,
  setwins,
  setlosses,
  setrank,
  setdivision
) => {
  var stats = getPointsAndWinsLossesOff(uid, games);
  // console.log("wins", stats[0], "losses", stats[1]);

  setwins(stats[0]);
  setlosses(stats[1]);

  var wins = stats[0];
  var losses = stats[1];

  var winRate = (wins / (wins + losses)).toFixed(2);
  var totalGames = wins + losses;

  var rank = 0;
  if (winRate >= 0.9) {
    rank = 5;
  } else if (winRate >= 0.8) {
    rank = 4;
  } else if (winRate >= 0.7) {
    rank = 3;
  } else if (winRate >= 0.6) {
    rank = 2;
  } else if (winRate >= 0.5) {
    rank = 1;
  } else {
    rank = 0;
  }

  var division = 0;
  if (totalGames > 50) {
    division = 5;
  } else if (totalGames > 40) {
    division = 4;
  } else if (totalGames > 30) {
    division = 3;
    // TODO: SET IT BACK TO 20 !
  } else if (totalGames > 2) {
    division = 2;
  } else {
    division = 1; // Set divison to 1, because there is no divison 0
    rank = 0; // Set rank to 0, because the user has less than 20 games
  }

  setrank(rank);
  setdivision(division);

  // console.log(
  //   "W:",
  //   wins,
  //   "L:",
  //   losses,
  //   "T:",
  //   wins + losses,
  //   "WR:",
  //   wins / (wins + losses),
  //   "rank",
  //   rank,
  //   "division",
  //   division
  // );
};

export const getUserTotalWinsAndLosses = async (uid) => {
  const teams = ["team_1", "team_2"];
  var totalWins = 0;
  var totalLosses = 0;
  await Promise.all(
    teams.map(async (team) => {
      const isTeam1 = team === "team_1";
      const myQuery = query(
        collection(db, "games"),
        where(team, "array-contains", uid)
        // where(season, "equals", season)
      );
      try {
        const snapshot = await getDocs(myQuery);
        snapshot.forEach(async (doc) => {
          const gameDoc = doc.data();
          const team_1_won = gameDoc.team_1_points > gameDoc.team_2_points;
          const win = (team_1_won && isTeam1) || (!team_1_won && !isTeam1);
          if (win) {
            totalWins += 1;
          } else {
            totalLosses += 1;
          }
        });
      } catch (error) {
        totalWins = 0;
        totalLosses = 0;
        console.log(error.message);
      }
    })
  );
  return [totalWins, totalLosses];
};

export const getPointsAndWinsLossesOff = (uid, games) => {
  var totalWins = 0;
  var totalLosses = 0;
  var totalPointsScored = 0;
  var totalPointsGotten = 0;
  games.forEach((game) => {
    const userIsTeam1 = game.team_1.includes(uid);
    const userIsTeam2 = game.team_2.includes(uid);
    if (userIsTeam1 || userIsTeam2) {
      const team1win = game.team_1_points > game.team_2_points;
      const userWon = (userIsTeam1 && team1win) || (!userIsTeam1 && !team1win);
      if (userWon) {
        totalWins += 1;
      } else {
        totalLosses += 1;
      }
      if (userIsTeam1) {
        totalPointsScored += game.team_1_points;
        totalPointsGotten += game.team_2_points;
      } else {
        totalPointsScored += game.team_2_points;
        totalPointsGotten += game.team_1_points;
      }
    }
  });
  return [totalWins, totalLosses, totalPointsScored, totalPointsGotten];
};
