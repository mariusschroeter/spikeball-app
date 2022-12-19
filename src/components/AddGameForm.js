import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import {
  Row,
  Col,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import cgnlist from '../static/cgn_ borough_list'
import "react-datepicker/dist/react-datepicker.css";


const AddGameForm = ({ authUser }) => {

  const [t1p1, sett1p1] = useState({});
  const [t1p2, sett1p2] = useState({});
  const [t2p1, sett2p1] = useState({});
  const [t2p2, sett2p2] = useState({});
  const [t1points, setp1points] = useState({});
  const [t2points, sett2points] = useState({});
  const [validation, setValidation] = useState({ txt: "", isValid: false });
  const [loading, setloading] = useState(false);
  const [optionUsers, setoptionUsers] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [location, setlocation] = useState({});
  const [optionLocation, setoptionLocation] = useState([]);

  const fetchUsers = async () => {

    const response = collection(db, "users");
    const data = await getDocs(response);
    data.docs.forEach((authUser) => {
      const uid = authUser.data().uid;
      const name = authUser.data().email;
      setoptionUsers((optionUsers) => [
        ...optionUsers,
        { value: uid, label: name },
      ]);
    });
  };

  useEffect(() => {
    fetchUsers();
    setLocationList();
  }, []);

  let optionPoints = [];
  for (let i = 21; i > -1; i--) {
    optionPoints.push({ value: i, label: i });
  }

  const addGame = async () => {
    const elements = [t1p1, t1p2, t2p1, t2p2, t1points, t2points];
    const isEmpty = checkEmpty(elements);
    const isDuplicate = checkForDuplicates(elements);
    if (!isEmpty && !isDuplicate) {
      setloading(true);
      try {
        const gamesCollectionRef = collection(db, "games");
        await addDoc(gamesCollectionRef, {
          date: startDate,
          location: location["value"],
          created_by: authUser.email,
          team_1: [t1p1["value"], t1p2["value"]],
          team_2: [t2p1["value"], t2p2["value"]],
          team_1_points: Number(t1points["value"]),
          team_2_points: Number(t2points["value"]),
          season: Number(1),
        });
        setValidation({ txt: "Success", isValid: true });
      } catch {
        setValidation({ txt: "Something went wrong!", isValid: false });
      } finally {
        setloading(false);
      }
    } else {
      setValidation({
        txt: "No duplicate or empty values allowed!",
        isValid: false,
      });
    }
  };

  const checkEmpty = (array) => {
    const empty = (o) => Object.keys(o).length === 0;
    return array.some(empty);
  };

  const checkForDuplicates = (array) => {
    return new Set(array).size !== array.length;
  };

  const setLocationList = () => {
    const list = cgnlist.map((el) => {
      return { value: el, label: el };
    })
    setoptionLocation(list)
  }

  const validationVariant = validation["isValid"] ? "success" : "danger";

  return (
    <Card bg="light">
      <Card.Body>
        <h3>Info</h3>
        Game Date
        <Row>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat={"dd/MM/yyyy"}
              className="mb-3"
            />
          </Col>
        </Row>
        Location
        <Row>
          <Col>
            <Select
              options={optionLocation}
              onChange={setlocation}
              className="mb-3"
              placeholder="Location"
              isSearchable
            />
          </Col>
          <Col />
        </Row>
        <hr />
        <h3>Match</h3>
        Team1
        <Row>
          <Col>
            <Select
              options={optionUsers}
              onChange={sett1p1}
              className="mb-3"
              placeholder="Player 1"
              isSearchable
            />
          </Col>
          <Col>
            <Select
              options={optionUsers}
              onChange={sett1p2}
              className="mb-3"
              placeholder="Player 2"
              isSearchable
            />
          </Col>
        </Row>
        Points
        <Row>
          <Col>
            <Select
              options={optionPoints}
              onChange={setp1points}
              className="mb-3"
              placeholder="Points"
            />
          </Col>
          <Col />
        </Row>
        <hr />
        Team2
        <Row>
          <Col>
            <Select
              options={optionUsers}
              onChange={sett2p1}
              className="mb-3"
              placeholder="Player 1"
              isSearchable
            />
          </Col>
          <Col>
            <Select
              options={optionUsers}
              onChange={sett2p2}
              className="mb-3"
              placeholder="Player 2"
              isSearchable
            />
          </Col>
        </Row>
        Points
        <Row>
          <Col>
            <Select
              options={optionPoints}
              onChange={sett2points}
              className="mb-3"
              placeholder="Points"
            />
          </Col>
          <Col />
        </Row>
        <hr />
        {validation["txt"] === "" ? (
          <></>
        ) : (
          <Alert variant={validationVariant}>{validation["txt"]}</Alert>
        )}
        <Button onClick={() => addGame()} disabled={loading}>
          Add Game
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddGameForm;