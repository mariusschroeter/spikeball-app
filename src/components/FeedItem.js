import moment from "moment";
import { Card } from "react-bootstrap";
import TeamAndScore from "./TeamAndScore";

const FeedItem = ({ game }) => {
  //get match date
  var date = new Date(game.date.toDate());
  var formattedDate = moment(date).format("Do MMMM YYYY");

  return (
    <Card
      className="text-center"
      style={{ marginBottom: "20px", border: "1px solid black" }}
    >
      <Card.Header>
        <p>{formattedDate}</p>
        <p>{game.location}</p>
        <p>created by: {game.created_by}</p>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <TeamAndScore
            p1={game.team_1[0]}
            p2={game.team_1[1]}
            score={game.team_1_points}
          />
          <TeamAndScore
            p1={game.team_2[0]}
            p2={game.team_2[1]}
            score={game.team_2_points}
          />
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default FeedItem;
